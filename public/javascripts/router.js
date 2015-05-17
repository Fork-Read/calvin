define([
    'jquery',
    'backbone',
    'events',
    'views/HeaderView'
], function ($, Backbone, Events, HeaderView) {
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
            var _self = this;
            require(['views/HomeView'], function (HomeView) {
                var homeView = new HomeView();
                _self._renderView(homeView);
            });
        },
        showCreateProject: function () {
            var _self = this;
            require(['views/CreateProjectView'], function (CreateProjectView) {
                var createProjectView = new CreateProjectView();
                _self._renderView(createProjectView);
            });
        }
    });
    return Router;
});