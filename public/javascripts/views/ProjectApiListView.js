define([
    'jquery', 'underscore', 'backbone', 'events', 'views/BaseView', 'views/ProjectApiItemView', 'views/DialogView', 'models/ProjectCategoryModel', 'text!templates/apilistview.tmpl'
], function ($, _, Backbone, Events, BaseView, ProjectApiItemView, DialogView, ProjectCategoryModel, viewTemplate) {
    var ProjectApiListView = BaseView.extend({
        onInitialize: function (options) {
            var _self = this;
            _self.collection = options.collection;
        },
        render: function () {
            var _self = this;

            var template = _.template(viewTemplate);

            _self.$el.html(template(null));
            _.each(_self.collection.models, function (model, index) {
                var apiItemView = _self.addView('ProjectApiItemView' + index, ProjectApiItemView, {
                    model: model
                });
                _self.$el.find('.api-list').prepend(apiItemView.render().el);
            });

            return _self;
        },
        onClose: function () {
            var _self = this;
            if (_self.addCategoryDialog) {
                _self.addCategoryDialog.destroy();
            }
            _self.unbind();
        }
    });
    return ProjectApiListView;
});