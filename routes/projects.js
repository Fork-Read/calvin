var express = require('express'),
    router = express.Router(),
    ProjectController = require('../controllers/ProjectController');

function isAuthenticated(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/register');
    }
}

router.get('/all', isAuthenticated, function (req, res, next) {

    ProjectController.getAllProjects(req.user._id, function (projects) {
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify(projects));
    });
});

router.get('/:id', isAuthenticated, function (req, res, next) {

    ProjectController.getProject(req.user._id, req.params.id, function (project) {
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify(project));
    });
});

router.post('/', isAuthenticated, function (req, res, next) {

    ProjectController.saveUserProject(req.user._id, req.body, function (project) {
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify(project));
    });
});

router.put('/:id', isAuthenticated, function (req, res, next) {

    ProjectController.updateProject(req.user._id, req.param('id'), req.body, function (project) {
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify(project));
    });
});

router.post('/category/add', function (req, res, next) {

    ProjectController.addCategory(req.user._id, req.body, function (project) {
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify(project));
    });
});

module.exports = router;