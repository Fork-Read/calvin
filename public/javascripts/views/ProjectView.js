define([
    'jquery', 'underscore', 'backbone', 'quill', 'views/BaseView', 'views/DialogView', 'text!templates/projectview.tmpl'
], function ($, _, Backbone, Quill, BaseView, DialogView, viewTemplate) {
    var ProjectView = BaseView.extend({
        'className': 'project-view',
        initialize: function (options) {
            var _self = this;
            _self.model = options.model;
            _self.model.on('change', _self.render, _self);
        },
        events: {
            'click .add-category': 'openAddCategoryDialog'
        },
        render: function () {
            var _self = this;
            var temp = _.template(viewTemplate);

            if (_self.addCategoryDialog) {
                _self.addCategoryDialog.destroy();
            }

            _self.$el.html(temp({
                project: _self.model.toJSON()
            }));
            setTimeout(function () {
                var fullEditor = new Quill('#editor', {
                    modules: {
                        'link-tooltip': true
                    },
                    readOnly: true,
                    theme: 'snow'
                });
            }, 0);

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
                        var categoryName = $.trim($('.new-category-input').val());

                        if (!categoryName) {
                            _self.updateFeedback('Category name cannot be blank', 'warning');
                            return;
                        }

                        var sendObj = {
                            'projectId': _self.model.get('_id'),
                            'category': categoryName
                        };

                        $.ajax({
                            url: '/api/project/category/add',
                            'type': 'POST',
                            'contentType': 'application/json',
                            'data': JSON.stringify(sendObj),
                            success: function (data) {
                                if (data.newCategory) {
                                    _self.addCategoryDialog.close();
                                    var categories = _.clone(_self.model.get('api_categories'));
                                    categories.push(data.newCategory);
                                    _self.model.set({
                                        'api_categories': categories
                                    });
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
            return this;
        },
        openAddCategoryDialog: function () {
            this.addCategoryDialog.open();
        },
        updateFeedback: function (html, className) {
            var _self = this;

            $('.add-category-feedback').html(html).addClass(className).show();
        }
    });
    return ProjectView;
});