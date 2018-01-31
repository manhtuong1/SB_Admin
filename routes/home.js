/* GET users listing. */
'user strict;'
var userService = require('../services/index').user_service;

module.exports = function (router, app) {
  // =====================================
  // HOME PAGE (with signin links) ========
  // =====================================
  router.get('/index', function (req, res) {
    res.render('index'); // load the index file
  });

  router.get('/charts', function (req, res) {
    res.render('charts'); // load the index file
  });

  router.get('/tables', function (req, res) {
    res.render('tables'); // load the index file
  });
  router.get('/cards', function (req, res) {
    res.render('cards'); // load the index file
  });
  router.get('/navbar', function (req, res) {
    res.render('navbar'); // load the index file
  });
  router.get('/forgot-password', function (req, res) {
    res.render('forgot-password'); // load the index file
  });
}