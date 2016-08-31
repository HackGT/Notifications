var express = require('express');
var router = express.Router();
var request = require('superagent');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/console', function(req, res, next) {
  res.render('console', {});
});

router.post('/login', function(req, res, next) {
  console.log(req.body);
  request.post('https://apply.hackgt.com/auth/login')
    .send({
      email: req.body.email,
      password: req.body.password
    })
    .set('Content-Type', 'application/json')
    .end(function(err, response) {
      console.log(response.body.token);
      res.send(200, 'Login successful');
    });
});

module.exports = router;
