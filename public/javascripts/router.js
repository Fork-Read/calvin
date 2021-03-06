define([
    'jquery',
    'underscore',
    'backbone',
    'events',
    'views/HeaderView',
    'views/HomeView',
    'views/CreateProjectView',
    'views/ProjectContainerView',
    'views/ProjectApiContainerView',
    'views/AddApiView',
    'views/ApiView'
], function ($, _, Backbone, Events, HeaderView, HomeView, CreateProjectView, ProjectContainerView, ProjectApiContainerView, AddApiView, ApiView) {
    "use strict";
    var Router = Backbone.Router.extend({
        'routes': {
            '': 'showHome',
            'createProject': 'showCreateProject',
            'project/:id': 'showProject',
            'project/:id/edit': 'showEditProject',
            'project/:projectId/category/:category': 'showCategoryPage',
            'project/:projectId/category/:categoryName/api/add': 'showAddApi',
            'api/:id': 'showApiView'
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
                this.currentView.close();
            }
            this.currentView = view;
            $('#content').html(view.render().el);
        },
        showHome: function () {
            var _self = this;
            _self._hideProjectsDropdown();

            var homeView = new HomeView();
            _self._renderView(homeView);
        },
        showCreateProject: function () {
            var _self = this;
            var createProjectView = new CreateProjectView();
            _self._renderView(createProjectView);
        },
        showProject: function (id) {
            var _self = this;
            _self._showProjectsDropdown();
            var projectContainerView = new ProjectContainerView({
                'projectId': id
            });
            _self._renderView(projectContainerView);
        },
        showEditProject: function (id) {
            var _self = this;
            _self._hideProjectsDropdown();
            var projectContainerView = new ProjectContainerView({
                'projectId': id,
                'type': 'edit'
            });
            _self._renderView(projectContainerView);
        },
        showCategoryPage: function (projectId, category) {
            var _self = this;
            _self._showProjectsDropdown();
            var projectApiContainerView = new ProjectApiContainerView({
                'projectId': projectId,
                'category': {
                    'name': category
                }
            });
            _self._renderView(projectApiContainerView);
        },
        showAddApi: function (projectId, categoryName) {
            var _self = this;
            _self._hideProjectsDropdown();
            var addApiView = new AddApiView({
                'projectId': projectId,
                'categoryName': categoryName,
            });
            _self._renderView(addApiView);
        },
        showApiView: function (id) {
            var _self = this;
            _self._hideProjectsDropdown();
            var apiView = new ApiView({
                'id': id
            });
            _self._renderView(apiView);
        }
    });
    return Router;
});