define([
    'jquery', 'underscore', 'backbone', 'events', 'views/BaseView', 'views/ProjectApiItemView', 'views/DialogView', 'models/ProjectCategoryModel'
], function ($, _, Backbone, Events, BaseView, ProjectApiItemView, DialogView, ProjectCategoryModel) {
    var ProjectApiListView = BaseView.extend({
        'tagName': 'ul',
        'className': 'api-list',
        onInitialize: function (options) {
            var thisView = this;
            thisView.collection = options.collection;
        },
        render: function () {
            var thisView = this;

            console.log(thisView.collection.models);

            _.each(thisView.collection.models, function (model, index) {
                console.log(models);
                var apiItemView = thisView.addView('ProjectApiItemView' + index, ProjectApiItemView, {
                    model: model
                });
                thisView.$el.append(apiItemView.render().el);
            });

            return thisView;
        },
        onClose: function () {
            var thisView = this;
            if (thisView.addCategoryDialog) {
                thisView.addCategoryDialog.destroy();
            }
            thisView.unbind();
        }
    });
    return ProjectApiListView;
});