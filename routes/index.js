var express = require('express');
var router = express.Router();
var request = require('superagent');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/console', function(req, res, next) {
  if (req.session.token) {
    res.render('console', {});
  } else {
    res.redirect('/login');
  }
});

router.get('/login', function(req, res, next) {
  if (req.session.token) {
    res.redirect('/console', {});
  } else {
    res.render('login', {});
  }
});

router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
