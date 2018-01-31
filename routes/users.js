/* GET users listing. */
'user strict;'

module.exports = function (router, app , passport) {
  // =====================================
  // HOME PAGE (with signin links) ========
  // =====================================
  router.get('/', function (req, res) {
    res.render('signin'); // load the index file
  });

  // =====================================
  // signin ===============================
  // =====================================
  // show the signin form
  router.get('/signin', function (req, res) {

    // render the page and pass in any flash data if it exists
    res.render('signin', {
      message: req.flash('signinMessage')
    });
  });

  // process the signin form
  router.post('/signin', passport.authenticate('local-signin', {
      successRedirect: '/index', // redirect to the secure profile section
      failureRedirect: '/signin', // redirect back to the signup page if there is an error
      failureFlash: true // allow flash messages
    }),
    function (req, res) {
      console.log("hello");

      if (req.body.remember) {
        req.session.cookie.maxAge = 1000 * 60 * 3;
      } else {
        req.session.cookie.expires = false;
      }
      res.redirect('/');
    });

  // =====================================
  // SIGNUP ==============================
  // =====================================
  // show the signup form
  router.get('/signup', function (req, res) {
    // render the page and pass in any flash data if it exists
    res.render('signup', {
      message: req.flash('signupMessage')
    });
  });

  // process the signup form
  router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // =====================================
  // PROFILE SECTION =========================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  router.get('/index', isLoggedIn, function (req, res) {
    res.render('index', {
      user: req.user // get the user out of session and pass to template
    });
  });

  // =====================================
  // LOGOUT ===signin===========================
  // =====================================
  router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}