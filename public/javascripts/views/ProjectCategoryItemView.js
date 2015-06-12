define([
    'jquery', 'underscore', 'backbone', 'quill', 'views/BaseView', 'text!templates/categoryitem.tmpl'
], function ($, _, Backbone, Quill, BaseView, viewTemplate) {
    var ProjectCategoryItemView = BaseView.extend({
        'tagName': 'li',
        'className': 'category-list-item grid-item',
        onInitialize: function (options) {
            var _self = this;
            _self.model = options.model;
        },
        render: function () {
            var _self = this;
            var template = _.template(viewTemplate);

            _self.$el.html(template({
                category: _self.model.toJSON()
            }));
            return this;
        },
        onClose: function () {
            var _self = this;
            _self.unbind();
        }
    });
    return ProjectCategoryItemView;
});