
const express = require('express');
const request = require('request');
const jsforce = require('jsforce');
const redis = require('redis');
const SHA256 = require('crypto-js/sha256');

const clientRedis = redis.createClient();
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
    res.send({ message: 'Forbidden', error: true }).status(403);
});

const env = 'sandbox';
const sfLogin = {
    username: process.env.SPMF_SF_USERNAME || 'spmf@interaktiv.sg.sb',
    password: process.env.SPMF_SF_PASSWORD_TOKEN || 'interaktiv.2JdQ3TrZm0cC5m0pGQj8eHRYi',
};

const loginToSalesforce = (req, res, next) => {
    const conn = new jsforce.Connection({
        loginUrl: env !== 'sandbox' ? 'https://login.salesforce.com' : 'https://test.salesforce.com',
    });
    conn.login(sfLogin.username, sfLogin.password, (err, result) => {
        if (err) {
            res.status(500).send(JSON.stringify(err));
        } else {
            const sfSession = {
                env,
                accessToken: conn.accessToken,
                instanceUrl: conn.instanceUrl,
                id: result.id,
                orgId: result.organizationId,
                issued_at: new Date().getTime(),
            };
            clientRedis.set('sfToken', JSON.stringify(sfSession));
            clientRedis.expire('sfToken', 60 * 60);
            // admin.database().ref(`/salesforce-session/${sfSession.env}`).set(sfSession);
            if (next === undefined) res.status(200).send(sfSession);
            else next();
        }
    });
};


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
        clientRedis.expire(hash.toString(), 60 * 60);
        return res.status(200).send({ hash: hash.toString(), expiredAt: new Date().getTime() + (60 * 60 * 1000) });
    });
});

const validateToken = (req, res, next) => {
    clientRedis.get(req.headers['hash-token'], (err, reply) => {
        if (err) return res.status(403).send({ err });
        if (reply === null) return res.status(404).send({ status: 404, message: 'Site token is not valid, please refresh the page to get new token' });
        return next();
    });
};

router.post('/validate-site-token', (req, res) => {
    clientRedis.get(req.headers['hash-token'], (err, reply) => {
        if (err) res.status(503).send({ err, tokenValid: false });
        if (reply === null) res.status(403).send({ tokenValid: false, reply, message: 'Token is not valid, please refresh the page to get new token.' });
        else res.status(200).send({ tokenValid: true, reply: JSON.parse(reply) });
    });
});

router.post('/login', validateToken, loginToSalesforce, (req, res) => {
    if (req.body.username && req.body.password) {
        clientRedis.get('sfToken', (err, reply) => {
            if (err) return res.status(500).send({ error: true, status: 503 });
            const sfToken = JSON.parse(reply);
            const conn = new jsforce.Connection({
                instanceUrl: sfToken.instanceUrl,
                accessToken: sfToken.accessToken,
            });
            const query = `Select Id, Name, Email, Partner_Authority__c, Account.Id, Account.Name from Contact 
                where Portal_Login_Name__c='${req.body.username}' and Password__c='${SHA256(req.body.password).toString()}'`;
            conn.query(query, (error, results) => {
                if (error) return res.status(500).send({ error: true, status: 500, results });
                if (results.records.length > 0) {
                    return res.send({ status: 200, user: results.records[0] }).status(200);
                }
                return res.send({ status: 404, message: 'User not found' }).status(404);
            });
        });
    } else {
        return res.send({ status: 404, message: 'User not found' }).status(404);
    }
});

router.post('/applications-list', validateToken, loginToSalesforce, (req, res) => {
    clientRedis.get('sfToken', (err, reply) => {
        if (err) return res.status(500).send({ error: true, status: 503 });
        const sfToken = JSON.parse(reply);
        const conn = new jsforce.Connection({
            instanceUrl: sfToken.instanceUrl,
            accessToken: sfToken.accessToken,
        });
        const query = req.body.query;
        const accountId = req.body.accountId;

        conn.query(query, (error, results) => {
            console.log(error, results)
            if (error) return res.status(500).send({ error: true, status: 500, results });
            if (results.records.length > 0) {
                return res.send({ status: 200, records: results.records }).status(200);
            }
            return res.send({ status: 404, message: 'User not found' }).status(404);
        });
    });
});

router.post('/beneficiary-list', validateToken, loginToSalesforce, (req, res) => {
    clientRedis.get('sfToken', (err, reply) => {
        if (err) return res.status(500).send({ error: true, status: 503 });
        const sfToken = JSON.parse(reply);
        const conn = new jsforce.Connection({
            instanceUrl: sfToken.instanceUrl,
            accessToken: sfToken.accessToken,
        });
        const query = req.body.query;
        const accountId = req.body.accountId;

        conn.query(query, (error, results) => {
            console.log(error, results)
            if (error) return res.status(500).send({ error: true, status: 500, results });
            if (results.records.length > 0) {
                return res.send({ status: 200, records: results.records }).status(200);
            }
            return res.send({ status: 404, message: 'User not found' }).status(404);
        });
    });
});

module.exports = router;
