define([
    'jquery',
    'backbone',
    'events',
    'views/HeaderView',
    'views/HomeView',
    'views/CreateProjectView'
], function ($, Backbone, Events, HeaderView, HomeView, CreateProjectView) {
    "use strict";
    var Router = Backbone.Router.extend({
        'routes': {
            '': 'showHome',
            'createProject': 'showCreateProject'
        },
        initialize: function () {
            console.log('Router Initialized');
            var _self = this;
            _self.currentView = null;
            _self._renderHeaderView();
            Events.on('router:navigate', function (url) {
                _self.navigate(url, {
                    'trigger': true
                });
            });
        },
        _renderHeaderView: function () {
            var headerView = new HeaderView();
            $('header').html(headerView.render().el);
        },
        _renderView: function (view) {
            if (this.currentView) {
                this.currentView.remove();
            }
            this.currentView = view;
            $('#content').html(view.render().el);
        },
        showHome: function () {
            var homeView = new HomeView();
            this._renderView(homeView);
        },
        showCreateProject: function () {
            var createProjectView = new CreateProjectView();
            this._renderView(createProjectView);
        }
    });
    return Router;
});