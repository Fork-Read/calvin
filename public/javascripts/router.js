define([
    'jquery',
    'underscore',
    'backbone',
    'events',
    'views/HeaderView'
], function ($, _, Backbone, Events, HeaderView) {
    "use strict";
    var Router = Backbone.Router.extend({
        'routes': {
            '': 'showHome',
            'project/:id': 'showProject',
            'project/:id/edit': 'showEditProject',
            'project/:id/category/:category': 'showCategoryPage',
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
            _.templateSettings.variable = "data";
        },
        _renderHeaderView: function () {
            var headerView = new HeaderView();
            $('header').html(headerView.render().el);
        },
        _showProjectsDropdown: function () {
            $('.project-name-container').css({
                'visibility': 'visible'
            });
        },
        _hideProjectsDropdown: function () {
            $('.project-name-container').css({
                'visibility': 'hidden'
            });
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
            _self._hideProjectsDropdown();
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
        },
        showProject: function (id) {
            var _self = this;
            _self._showProjectsDropdown();
            require(['views/ProjectContainerView'], function (ProjectContainerView) {
                var projectContainerView = new ProjectContainerView({
                    'projectId': id
                });
                _self._renderView(projectContainerView);
            });
        },
        showEditProject: function (id) {
            var _self = this;
            _self._hideProjectsDropdown();
            require(['views/ProjectContainerView'], function (ProjectContainerView) {
                var projectContainerView = new ProjectContainerView({
                    'projectId': id,
                    'type': 'edit'
                });
                _self._renderView(projectContainerView);
            });
        },
        showCategoryPage: function (id, category) {
            console.log(id, name);
        }
    });
    return Router;
});