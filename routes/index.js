var express = require('express');
var router = express.Router();

var isLogined = require('./require-logined')

module.exports = function (app, passport) {
  require('./users')(router, app, passport);

  router.use(isLogined);

  require('./home')(router, app);
  
  app.use('/', router);
}
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;