module.exports = function(req, res, next) {
    if (req.user.isactive === false) {
        return res.render('error', {message: 'Your account is not actived, please contact to administrator to active.'})
    } else if (req.user.isadmin === true) {
        return next();
    } else {
        return next();
    }
}
