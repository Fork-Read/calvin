define([
    'jquery', 'underscore', 'backbone', 'events', 'views/BaseView', 'views/ProjectApiListView', 'models/ProjectApiCollection'
], function ($, _, Backbone, Events, BaseView, ProjectApiListView, ProjectApiCollection) {
    var ProjectApiContainerView = BaseView.extend({
        'className': 'project-api-container',
        onInitialize: function (options) {
            var _self = this;
            _self.options = options;
            _self.apiCollection = new ProjectApiCollection();
            _self.apiCollection.url = '/api/routes/' + _self.options.projectId + '/apis/' + _self.options.categoryName;
        },
        render: function () {
            var _self = this;

            _self.apiCollection.fetch({
                'reset': true,
                success: function () {
                    var apiListView = _self.addView('ProjectApiListView', ProjectApiListView, {
                        'collection': _self.apiCollection
                    });
                    _self.$el.append(apiListView.render().el);
                }
            });

            return this;
        }
    });
    return ProjectApiContainerView;
});