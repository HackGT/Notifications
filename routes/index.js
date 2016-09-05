var express = require('express');
var router = express.Router();
var request = require('superagent');
var path = require('path');

router.get('/', function(req, res, next) {
  if (req.session.token) {
    res.sendFile(path.join(__dirname + '/../views/home.html'));
  } else {
    console.log("Not logged in");
    res.redirect('/login');
  }
});

router.get('/login', function(req, res, next) {
  if (req.session.token) {
    res.redirect('/', {});
  } else {
    res.sendFile(path.join(__dirname + '/../views/login.html'));  }
});

router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
