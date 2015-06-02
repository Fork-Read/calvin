define([
    'underscore', 'jquery', 'backbone'
], function (_, $, Backbone) {
    var BaseView = Backbone.View.extend({
        initialize: function (options) {
            this.views = {};
            this.onInitialize(options);
        },
        addView: function (key, View, viewData) {
            var newView = new View(viewData);
            this.views[key] = newView;
            return newView;
        },
        removeView: function (key) {
            this.views[key].close();
        },
        close: function () {
            var _self = this;
            _.each(this.views, function (view) {
                view.onClose();
                view.remove();
            });
            _self.remove();
        }
    });
    return BaseView;
});