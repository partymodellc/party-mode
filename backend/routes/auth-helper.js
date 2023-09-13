module.exports.requireAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    return res.redirect('/api/login')
}