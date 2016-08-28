var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/notifications', function(req, res, next) {
  res.json(
    [
      {
        title: "Food is ready",
        description: "Cape Pies is available at the food table",
        time: new Date()
      },
      {
        title: "Food is on fire",
        description: "Run",
        time: new Date()
      }
    ]
  );
});

module.exports = router;
