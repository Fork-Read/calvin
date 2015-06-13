define([
    'jquery', 'underscore', 'backbone', 'quill', 'views/BaseView', 'text!templates/categoryitem.tmpl'
], function ($, _, Backbone, Quill, BaseView, viewTemplate) {
    var ProjectApiItemView = BaseView.extend({
        'tagName': 'li',
        'className': 'api-list-item grid-item',
        onInitialize: function (options) {
            var _self = this;
            _self.model = options.model;
        },
        render: function () {
            var _self = this;
            var template = _.template(viewTemplate);

            _self.$el.html(template({
                api: _self.model.toJSON()
            }));
            return this;
        },
        onClose: function () {
            var _self = this;
            _self.unbind();
        }
    });
    return ProjectApiItemView;
});