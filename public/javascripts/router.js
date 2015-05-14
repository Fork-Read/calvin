define([
    'jquery',
    'backbone',
    'events',
    'views/HomeView'
], function ($, Backbone, Events, HomeView) {
    var Router = Backbone.Router.extend({
        'routes': {
            '': 'showHome'
        },
        initialize: function () {
            console.log('initialize router');
            var _self = this;
            Events.on('router:navigate', function (url) {
                _self.navigate(url, {
                    'trigger': true
                });
            });
        },
        _renderView: function (view) {
            $('#content').html(view.render().el);
        },
        showHome: function () {
            console.log('function called');
            var homeView = new HomeView();
            this._renderView(homeView);
        }
    });
    return Router;
});