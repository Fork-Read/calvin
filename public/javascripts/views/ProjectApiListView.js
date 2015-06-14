define([
    'jquery', 'underscore', 'backbone', 'events', 'views/BaseView', 'views/ProjectApiItemView', 'views/DialogView', 'models/ProjectCategoryModel'
], function ($, _, Backbone, Events, BaseView, ProjectApiItemView, DialogView, ProjectCategoryModel) {
    var ProjectApiListView = BaseView.extend({
        'tagName': 'ul',
        'className': 'api-list',
        onInitialize: function (options) {
            var _self = this;
            _self.collection = options.collection;
        },
        render: function () {
            var _self = this;

            _.each(_self.collection.models, function (model, index) {
                var apiItemView = _self.addView('ProjectApiItemView' + index, ProjectApiItemView, {
                    model: model
                });
                _self.$el.append(apiItemView.render().el);
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