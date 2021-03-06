var express = require('express'),
    router = express.Router(),
    passport = require('passport');

function isAuthenticated(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/register');
    }
}

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', null);
});

router.get('/home', isAuthenticated, function (req, res, next) {
    res.render('home', null);
});

router.get('/register', function (req, res, next) {
    res.render('register', null);
});

router.get('/auth/google',
    passport.authenticate('google', {
        scope: [
            'https://www.googleapis.com/auth/plus.me',
            'email',
            'https://www.googleapis.com/auth/contacts.readonly'
        ]
    })
);

router.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/home',
        failureRedirect: '/register'
    })
);

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;