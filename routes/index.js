var express = require('express');
var router = express.Router();

/* GET home page. */
var handler = function (req, res) {
  //res.render('index');
  res.sendFile('/app/index.html', {root: __dirname + '/..'});
};

router.get('/', handler);
router.get('/beans', handler);
router.get('/beans/:id', handler);
router.get('/roasters', handler);
router.get('/roasters/:id', handler);
router.get('/roasters/:id/:bean', handler);
router.get('/coffepoints', handler);
router.get('/coffepoints/:id', handler);

router.get('/map', handler);

router.get('/contact', handler);
router.get('/about', handler);

module.exports = router;
