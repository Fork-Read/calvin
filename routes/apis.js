var express = require('express'),
    router = express.Router(),
    ApiController = require('../controllers/ApiController');

function isAuthenticated(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify({
            error: 'Authentication Failure'
        }));
    }
}

router.get('/category/apis/:projectId', isAuthenticated, function (req, res, next) {

    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify({}));

});

router.get('/category/api/:id', isAuthenticated, function (req, res, next) {

    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify({}));

});

module.exports = router;