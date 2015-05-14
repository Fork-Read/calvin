define([
    'backbone', 'router'
], function (Backbone, Router) {
    var App = {
        start: function () {
            new Router();
            Backbone.history.start();
        }
    };

    return App;
});