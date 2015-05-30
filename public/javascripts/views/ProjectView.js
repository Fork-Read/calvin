define([
    'jquery', 'underscore', 'backbone', 'quill', 'views/BaseView', 'views/DialogView', 'text!templates/projectview.tmpl'
], function ($, _, Backbone, Quill, BaseView, DialogView, viewTemplate) {
    var ProjectView = BaseView.extend({
        initialize: function (options) {
            var _self = this;
            _self.model = options.model;
        },
        events: {
            'click .add-category': 'openAddCategoryDialog'
        },
        render: function () {
            var _self = this;
            var temp = _.template(viewTemplate);
            _self.$el.append(temp({
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
                _self.openAddCategoryDialog();
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
                            success: function () {
                                _self.addCategoryDialog.close();
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