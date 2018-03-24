
const express = require('express');
const request = require('request');
const jsforce = require('jsforce');
const redis = require('redis');
const SHA256 = require('crypto-js/sha256');

const clientRedis = redis.createClient();
const router = express.Router();
const { validateToken, loginToSalesforce, createSfObject, validateTokenAfterLogin } = require('../class/salesforce');

/* GET home page. */
router.get('/', (req, res) => {
    res.send({ message: 'Forbidden', error: true }).status(403);
});


router.get('/salesforce-token', (req, res) => {
    clientRedis.get('sfToken', (err, value) => {
        if (err) {
            return res.status(503).send(err);
        }
        if (value === null) {
            loginToSalesforce(req, res);
        } else {
            res.status(200).send(JSON.parse(value));
        }
        return null;
    });
});


router.get('/get-site-token', async (req, res, next) => {
    if (req.headers['g-recaptcha-response'] === undefined || req.headers['g-recaptcha-response'] === '' || req.headers['g-recaptcha-response'] === null) {
        return res.status(403).json({ responseCode: 1, responseDesc: 'Your captcha is not valid' });
    }
    const secretKey = '6LcdyUwUAAAAAGP3NtCgsmGbP6BDkLOHi9uOi4b_';
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.headers['g-recaptcha-response']}`;
    request(verificationUrl, (error, response, body) => {
        const bodyResponses = JSON.parse(body);
        // Success will be true or false depending upon captcha validation.
        if (bodyResponses.success !== undefined && !bodyResponses.success) {
            return res.status(403).json({ responseCode: 1, responseDesc: 'Failed captcha verification', bodyResponses });
        }
        const hash = SHA256(bodyResponses + req.headers['g-recaptcha-response']);
        clientRedis.set(hash.toString(), JSON.stringify({ content: bodyResponses, response: req.headers['g-recaptcha-response'] }));
        clientRedis.expire(hash.toString(), 60 * 60 * 2);
        return res.status(200).send({ hash: hash.toString(), expiredAt: new Date().getTime() + (60 * 60 * 1000) });
    });
});


router.post('/validate-site-token', (req, res) => {
    clientRedis.get(req.headers['hash-token'], (err, reply) => {
        if (err) res.status(503).send({ err, tokenValid: false });
        if (reply === null) res.status(403).send({ tokenValid: false, reply, message: 'Token is not valid, please refresh the page to get new token.' });
        else res.status(200).send({ tokenValid: true, reply: JSON.parse(reply) });
    });
});

router.post('/login', validateToken, createSfObject, (req, res) => {
    if (req.body.username && req.body.password) {
        const query = `Select Id, Name, Email, Partner_Authority__c, AccountId, Account.Id, Account.Name, Account.Partner_Type__c, Active__c from Contact 
            where Active__c = true and 
            Account.Active__c = true and 
            Portal_Login_Name__c='${req.body.username}' and 
            Password__c='${SHA256(req.body.password).toString()}'`;
        return req.sfConn.query(query, (error, results) => {
            if (error) return res.status(500).send({ error: true, status: 500, results });
            if (results.records.length > 0) {
                const { siteTokenContent } = req;
                siteTokenContent.userInfo = results.records[0];
                clientRedis.set(req.headers['hash-token'], JSON.stringify(siteTokenContent));
                clientRedis.expire(req.headers['hash-token'], 60 * 60 * 6);
                return res.send({ status: 200, user: results.records[0] }).status(200);
            }
            
            return res.send({ status: 404, message: 'User not found' }).status(404);
        });
    }
    return res.send({ status: 404, message: 'User not found' }).status(404);
});

router.post('/applications-list', validateToken, createSfObject, (req, res) => {
    const { query } = req.body;
    req.sfConn.query(query, (error, results) => {
        if (error) return res.status(500).send({ error: true, status: 500, results });
        if (results.records.length > 0) {
            return res.send({ status: 200, records: results.records }).status(200);
        }
        return res.send({ status: 404, message: 'Not Found' }).status(404);
    });
});

router.post('/application-detail', validateToken, loginToSalesforce, (req, res) => {
    clientRedis.get('sfToken', (err, reply) => {
        if (err) return res.status(500).send({ error: true, status: 503 });
        const sfToken = JSON.parse(reply);
        const conn = new jsforce.Connection({
            instanceUrl: sfToken.instanceUrl,
            accessToken: sfToken.accessToken,
        });
        const { query } = req.body;
        conn.query(query, (error, results) => {
            if (error) return res.status(500).send({ error: true, status: 500, results });
            if (results.records.length > 0) {
                return res.send({ status: 200, records: results.records }).status(200);
            }
            return res.send({ status: 404, message: 'Empty' }).status(404);
        });
    });
});

router.post('/beneficiary-list', validateToken, createSfObject, (req, res) => {
    const { query } = req.body;
    req.sfConn.query(query, (error, results) => {
        if (error) return res.status(500).send({ error: true, status: 500, results });
        return res.send({ status: 200, records: results.records }).status(200);
    });
});

router.post('/query-data', validateToken, createSfObject, (req, res) => {
    req.sfConn.query(req.body.query, (error, results) => {
        if (error) return res.status(500).send({ error, status: 500, results });
        return res.send({ status: 200, records: results.records }).status(200);
    });
});

router.post('/attachment', validateToken, createSfObject, (req, res) => {
    // const query = req.body.query;
    const atcId = req.body.attachmentId;
    const attachment = req.sfConn.sobject('Document').record(atcId).blob('Body');
    const buf = [];
    attachment.on('data', (data, enc) => {
        buf.push(data.toString(enc));
    });
    attachment.on('end', () => {
        const contentStr = buf.join('');
        return res.send({ status: 200, contentStr }).status(200);
        // handle contentStr
    });
});

router.post('/update-bene-status', validateToken, createSfObject, (req, res) => {
    const { data } = req.body;
    return req.sfConn.sobject('Person__c').update(
        data,
        (error, result) => {
            if (error) {
                return res.send({ status: 404, message: error.toString() }).status(404);
            }
            return res.send({ status: 200, message: 'Update Success', result }).status(200);
        }
    );
});


router.post('/update-receipt', validateToken, createSfObject, (req, res) => {
    const { data, selectedReceipt } = req.body;
    const updatedData = [];
    for (let i = 0; i < selectedReceipt.length; i++) {
        updatedData.push(Object.assign({}, {
            Id: selectedReceipt[i],
        }, data));
    }
    return req.sfConn.sobject('Receipt__c').update(updatedData, (error, result) => {
        if (error) return res.status(500).send({ error, status: 503, message: 'Failed to update receipt' });
        return res.send({ status: 200, message: 'Receipt updated successfully', result });
    });
});

router.get('/sobject/:sobjectName/:id', validateToken, createSfObject, (req, res) => {
    req.sfConn.sobject(req.params.sobjectName).retrieve(req.params.id, (error, result) => {
        if (error) return res.send({ error, message: 'Error found when getting data from salesforce' }).status(404);
        return res.send({ result, status: 200 }).status(200);
    });
});
router.put('/sobject/:sobjectName', validateToken, createSfObject, (req, res) => {
    req.sfConn.sobject(req.params.sobjectName).update(req.body, (error, result) => {
        if (error) return res.send({ error, message: `Error found when updating ${req.params.sobjectName} to salesforce` }).status(500);
        return res.send({ result, status: 200, message: `Update succesfully ${req.params.sobjectName}` }).status(200);
    });
});

router.get('/attachment/:id', validateToken, validateTokenAfterLogin, createSfObject, (req, res) => {
    const reqDefault = request.defaults({ encoding: null });
    reqDefault({
        url: `${req.sfSession.instanceUrl}/services/data/v39.0/sobjects/Attachment/${req.params.id}/Body`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${req.sfSession.accessToken}`,
        },
    }, (error, response, body) => {
        res.header({ 'content-type': response.headers['content-type'] }).send(body);
    });
});

router.get('/dashboard', validateTokenAfterLogin, createSfObject, (req, res) => {
    const { userInfo } = req;
    const qBeneficariesCount = `Select count(Id) from Contact 
        WHERE RecordType.Name = 'Beneficiary' and Active__c = true
        AND Updated_by_Application_Person__r.Applying_To__c = '${userInfo.AccountId}'`;
    const qTotalFunded = `Select SUM(Given_Amount__c) from Receipt__c
        WHERE Status__c = 'Received by Beneficiary' and Issued_By__c = '${userInfo.AccountId}'`;
    const qApplication = `Select count(Id) from Person__c Where Applying_To__c = '${userInfo.AccountId}'`;

    clientRedis.get(`dashboard${userInfo.AccountId}`, async (error, reply) => {
        try {
            if (error) return res.send({ error, message: 'An error when establish connection to db.' });
            let objDashboard = {};
            if (reply === null) {
                const beneficariesCount = await req.sfConn.query(qBeneficariesCount);
                const totalFunded = await req.sfConn.query(qTotalFunded);
                const totalApplication = await req.sfConn.query(qApplication);
                objDashboard = ({
                    beneficariesCount: beneficariesCount.records[0].expr0 || 0,
                    totalFunded: totalFunded.records[0].expr0 === null ? 0 : totalFunded.records[0].expr0,
                    totalApplication: totalApplication.records[0].expr0 || 0,
                    timeIssued: new Date().getTime(),
                });
                clientRedis.set(`dashboard${userInfo.AccountId}`, JSON.stringify(objDashboard), (err, reply) => {
                    if (err) return;
                    clientRedis.expire(`dashboard${userInfo.AccountId}`, 60 * 60);
                });
            } else {
                objDashboard = JSON.parse(reply);
            }
            return res.send(objDashboard);
        } catch (errorCatch) {
            return res.send({ error: errorCatch }).status(500);
        }
    });
});

router.get('/logout', validateToken, (req, res) => {
    delete req.siteTokenContent.userInfo;
    clientRedis.set(req.query.token, JSON.stringify(req.siteTokenContent));
    res.send({ success: true, message: 'Logout successfully' });
});

module.exports = router;
