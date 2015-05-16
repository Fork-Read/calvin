define([
    'underscore', 'backbone', 'views/BaseView', 'text!templates/searchbar.tmpl'
], function (_, Backbone, BaseView, viewTemplate) {
    var SearchBarView = BaseView.extend({
        initialize: function () {

        },
        render: function () {
            var _self = this;
            _self.$el.html(_.template(viewTemplate, null));
            return this;
        }
    });
    return SearchBarView;
});