var express = require('express');
var router = express.Router();
const jsforce = require('jsforce');
const redis = require('redis');
const clientRedis = redis.createClient();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



const env = 'sandbox';
const sfLogin = {
  username: 'spmf@interaktiv.sg.sb',
  password: 'interaktiv.2JdQ3TrZm0cC5m0pGQj8eHRYi',
};

loginToSalesforce = (req, res) => {
  const conn = new jsforce.Connection({
    loginUrl: env !== 'sandbox' ? 'https://login.salesforce.com' : 'https://test.salesforce.com',
  });
  console.log(conn);
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
      clientRedis.set('sfToken', JSON.stringify(sfSession));
      clientRedis.expire('sfToken', 60 * 60);
      // admin.database().ref(`/salesforce-session/${sfSession.env}`).set(sfSession);
      res.status(200).send(sfSession);
    }
  });
};


router.get('/salesforce-token', (req, res) => {

    clientRedis.get('sfToken', (err, value) => {
      if(err) {
        return res.status(503).send(err);
      }

      if (value === null) {
        loginToSalesforce(req, res);
      } else {
        res.status(200).send(JSON.parse(value));
      }
    });
    
});
module.exports = router;
