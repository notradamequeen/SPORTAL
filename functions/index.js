const functions = require('firebase-functions');
const jsforce = require('jsforce');
const admin = require('firebase-admin');
const express = require('express');

const app = express();
const cors = require('cors')({ origin: true });
const cookieParser = require('cookie-parser')();

const env = functions.config().salesforce ? functions.config().salesforce.env : 'sandbox';
const sfLogin = {
    username: functions.config().salesforce ? functions.config().salesforce.username : 'spmf@interaktiv.sg.sb',
    password: functions.config().salesforce ? functions.config().salesforce.password : 'interaktiv.2JdQ3TrZm0cC5m0pGQj8eHRYi',
};

loginToSalesforce = (req, res) => {
    const conn = new jsforce.Connection({
        loginUrl: env !== 'sandbox' ? 'https://login.salesforce.com' : 'https://test.salesforce.com',
    });
    conn.login(sfLogin.username, sfLogin.password, (err, result) => {
        if (err) {
            console.log('err', err)
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
            // admin.database().ref(`/salesforce-session/${sfSession.env}`).set(sfSession);
            res.status(200).send(sfSession);
        }
    });
};


app.use(cors);
app.use(cookieParser);
app.get('/cors', (req, res) => {
    res.status(200).send('OK');
});

app.get('/salesforce-token', (req, res) => {
    console.log(`Running on ${env} environment`);
    const sfSession = admin.database().ref(`/salesforce-session/${env}`);

    sfSession.once('value', (snapshot) => {
        const value = snapshot.val();
        if (value === null) {
            loginToSalesforce(req, res);
        } else {
            if ((new Date().getTime()) - value.issued_at > (60 * 60 * 1000)) {
                console.info('Getting from salesforce');
                loginToSalesforce(req, res);
            } else {
                console.info('Getting from realtime database');
                res.status(200).send(value);
            }
        }
    });
});