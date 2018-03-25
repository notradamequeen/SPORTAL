const redis = require('redis');
const jsforce = require('jsforce');

const clientRedis = redis.createClient();

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
            if (req) {
                req.sfSession = sfSession;
                req.sfConn = conn;
            }
            
            clientRedis.set('sfToken', JSON.stringify(sfSession));
            clientRedis.expire('sfToken', 60 * 60);
            // admin.database().ref(`/salesforce-session/${sfSession.env}`).set(sfSession);
            if (next === undefined) res.status(200).send(sfSession);
            else next();
        }
    });
};


const validateToken = (req, res, next) => {
    const token = req.headers['hash-token'] || req.query.token;
    clientRedis.get(token, (err, reply) => {
        if (err) return res.status(403).send({ err });
        if (reply === null) return res.status(404).send({ status: 404, message: 'Token is not valid, please refresh the page to get new token' });
        req.siteTokenContent = JSON.parse(reply);
        return next();
    });
};

const createSfObject = (req, res, next) => {
    clientRedis.get('sfToken', (err, reply) => {
        if (err) return res.status(500).send({ error: true, status: 503 });
        if (reply === null) loginToSalesforce(req, res, next);
        else {
            const sfToken = JSON.parse(reply);
            const conn = new jsforce.Connection({
                instanceUrl: sfToken.instanceUrl,
                accessToken: sfToken.accessToken,
            });
            req.sfConn = conn;
            req.sfSession = sfToken;
            return next();
        }
    });
};

const validateTokenAfterLogin = (req, res, next) => {
    const token = req.headers['hash-token'] || req.query.token;
    clientRedis.get(token, (err, reply) => {
        if (err) return res.status(403).send({ err });
        if (reply === null) return res.status(404).send({ status: 404, message: 'Token is not valid, please refresh the page to get new token' });
        const jsonReply = JSON.parse(reply);
        if (jsonReply.userInfo === undefined) return res.send({ status: 403, message: "Forbidden, you're not allowed to visit this page" });
        req.userInfo = jsonReply.userInfo;
        next();
    });
};

module.exports = {
    loginToSalesforce,
    validateToken,
    createSfObject,
    validateTokenAfterLogin,
};
