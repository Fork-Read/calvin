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

router.get('/:projectId/apis/:categoryId', isAuthenticated, function (req, res, next) {

    ApiController.getAll(req.params.projectId, req.params.categoryId, function (apiList) {
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify(apiList));
    });
});

router.post('/:projectId/:category/api', isAuthenticated, function (req, res, next) {

    ApiController.save(req.params.projectId, req.params.category, req.body, function (apiList) {
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify(apiList));
    });

});

module.exports = router;