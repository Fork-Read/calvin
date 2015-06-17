define([
    'jquery', 'underscore', 'backbone', 'events', 'views/BaseView', 'views/ProjectCategoryItemView', 'views/DialogView', 'models/ProjectCategoryModel', 'text!templates/categorylistview.tmpl'
], function ($, _, Backbone, Events, BaseView, ProjectCategoryItemView, DialogView, ProjectCategoryModel, viewTemplate) {
    var ProjectCategoryListView = BaseView.extend({
        onInitialize: function (options) {
            var _self = this;
            _self.projectId = options.projectId;
            _self.collection = options.collection;
        },
        events: {
            'click .add-category': 'addNewCategory'
        },
        render: function () {
            var _self = this;

            var template = _.template(viewTemplate);

            if (_self.addCategoryDialog) {
                _self.addCategoryDialog.destroy();
            }
            console.log(_self.collection.toJSON());
            _self.$el.html(template(null));
            _.each(_self.collection.models, function (model, index) {
                var categoryItemView = _self.addView('ProjectCategoryItemView' + index, ProjectCategoryItemView, {
                    model: model
                });
                _self.$el.find('.category-list').prepend(categoryItemView.render().el);
            });

            _self.addCategoryDialog = new DialogView({
                'width': 400,
                'title': 'Add Category',
                'innerHTML': _self.$el.find('.add-category-dialog'),
                'buttons': [{
                    text: "Cancel",
                    click: function () {
                        _self.addCategoryDialog.close();
                    }
                }, {
                    text: "Save",
                    click: function () {
                        var categoryName = $.trim($('.new-category-name').val()),
                            categoryDescription = $.trim($('.new-category-description').val()),
                            categoryBaseUrl = $.trim($('.new-category-url').val());

                        if (!categoryName || !categoryBaseUrl) {
                            _self.updateFeedback('Category name and base url cannot be blank', 'warning');
                            return;
                        }

                        var sendObj = {
                            'projectId': _self.projectId,
                            'name': categoryName,
                            'baseUrl': categoryBaseUrl,
                            'description': categoryDescription
                        };

                        $.ajax({
                            url: '/api/project/category/add',
                            'type': 'POST',
                            'contentType': 'application/json',
                            'data': JSON.stringify(sendObj),
                            success: function (data) {
                                if (data) {
                                    _self.addCategoryDialog.close();
                                    Events.trigger('category:add', data);
                                } else {
                                    _self.updateFeedback('Category name already present', 'warning');
                                }
                            },
                            error: function (error) {
                                console.log(error);
                            }
                        });

                    }
                }]
            });

            _self.$el.append(_self.addCategoryDialog.render().el);

            // Attach events after view has been rendered
            setTimeout(function () {
                _self.delegateEvents();
            }, 0);

            return _self;
        },
        addNewCategory: function () {
            this.addCategoryDialog.open();
        },
        updateFeedback: function (html, className) {
            var _self = this;

            $('.add-category-feedback').html(html).addClass(className).show();
        },
        onClose: function () {
            var _self = this;
            if (_self.addCategoryDialog) {
                _self.addCategoryDialog.destroy();
            }
            _self.unbind();
        }
    });
    return ProjectCategoryListView;
});