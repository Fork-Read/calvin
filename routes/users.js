var express = require('express'),
    router = express.Router(),
    UserController = require('../controllers/UserController');

/* GET users listing. */
router.get('/:id', function (req, res, next) {
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