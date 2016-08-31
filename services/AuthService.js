var request = require('superagent');
var Promise = require('promise');

var AuthService = {};

AuthService.login = function(email, password) {
  return new Promise(function(resolver, reject) {
    request.post('https://apply.hackgt.com/auth/login')
      .send({
        email: email,
        password: password
      })
      .set('Content-Type', 'application/json')
      .end(function(err, response) {
        if (err || !response) {
          reject(err || {message: 'no response'});
        } else {
          resolver(response.body.token);
        }
      });
  });
};

module.exports = AuthService;
