define([
    'jquery', 'underscore', 'backbone', 'events', 'views/BaseView', 'views/ProjectApiListView', 'models/ProjectApiCollection', 'text!templates/projectcategory.tmpl'
], function ($, _, Backbone, Events, BaseView, ProjectApiListView, ProjectApiCollection, viewTemplate) {
    var ProjectApiContainerView = BaseView.extend({
        'className': 'container',
        onInitialize: function (options) {
            var _self = this;
            _self.options = options;
            _self.apiCollection = new ProjectApiCollection();
        },
        render: function () {
            var _self = this;

            $.ajax({
                'url': '/api/project/' + _self.options.projectId + '/category/' + _self.options.category.name,
                'type': 'GET',
                contentType: 'application/json',
                success: function (category) {
                    _self.options.category = category;

                    var template = _.template(viewTemplate);

                    _self.$el.html(template({
                        category: _self.options.category,
                        projectId: _self.options.projectId
                    }));

                    _self.apiCollection.url = '/api/routes/' + _self.options.projectId + '/apis/' + _self.options.category._id;

                    _self.apiCollection.fetch({
                        'reset': true,
                        success: function () {
                            var apiListView = _self.addView('ProjectApiListView', ProjectApiListView, {
                                'collection': _self.apiCollection
                            });
                            console.log(_self.apiCollection);
                            _self.$el.find('.api-list-container').append(apiListView.render().el);
                        }
                    });
                }
            });

            return this;
        }
    });
    return ProjectApiContainerView;
});