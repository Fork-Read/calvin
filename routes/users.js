var express = require('express'),
    router = express.Router(),
    UserController = require('../controllers/UserController');

function isAuthenticated(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/register');
    }
}

/* GET users listing. */
router.get('/:id', isAuthenticated, function (req, res, next) {
    UserController.getUserById(req.param('id'), function (user) {
        if (user) {
            res.set('Content-Type', 'application/json');
            res.send(JSON.stringify(user));
        } else {
            res.set('Content-Type', 'application/json');
            res.send(JSON.stringify({}));
        }
    });
});

module.exports = router;