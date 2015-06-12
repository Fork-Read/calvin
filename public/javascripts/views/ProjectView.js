define([
    'jquery', 'underscore', 'backbone', 'events', 'quill', 'views/BaseView', 'views/ProjectCategoryListView', 'models/ProjectCategoryCollection', 'text!templates/projectview.tmpl'
], function ($, _, Backbone, Events, Quill, BaseView, ProjectCategoryListView, ProjectCategoryCollection, viewTemplate) {
    var ProjectView = BaseView.extend({
        'className': 'project-view',
        onInitialize: function (options) {
            var _self = this;
            _self.model = options.model;
            _self.model.on('change', _self.render, _self);
            _self.categoryCollection = new ProjectCategoryCollection();
            _self.categoryCollection.url = '/api/project/' + _self.model.get('_id') + '/category/all';
            Events.on('category:add', function (category) {
                _self.categoryCollection.add(category);
                _self.renderCategoryList();
            });

            _self.projectCategoryListView = _self.addView('ProjectCategoryListView', ProjectCategoryListView, {
                collection: _self.categoryCollection,
                projectId: _self.model.get('_id')
            });
        },
        render: function () {
            var _self = this;
            var template = _.template(viewTemplate);

            _self.$el.html(template({
                project: _self.model.toJSON()
            }));

            _self.categoryCollection.fetch({
                'reset': true,
                success: function () {
                    _self.renderCategoryList();
                }
            })
            setTimeout(function () {
                if (_self.model.toJSON().setup_instructions) {
                    var fullEditor = new Quill('#editor', {
                        modules: {
                            'link-tooltip': true
                        },
                        readOnly: true,
                        theme: 'snow'
                    });
                }
            }, 0);

            return this;
        },
        renderCategoryList: function () {
            var _self = this;
            _self.$el.find('#category-list').html(_self.projectCategoryListView.render().el);
        },
        onClose: function () {
            var _self = this;
            _self.unbind();
        }
    });
    return ProjectView;
});