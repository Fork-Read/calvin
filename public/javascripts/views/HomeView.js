define([
    'underscore', 'backbone', 'views/BaseView', 'views/SearchBarView', 'text!templates/home.tmpl'
], function (_, Backbone, BaseView, SearchBarView, homeTemplate) {
    var HomeView = BaseView.extend({
        initialize: function () {
            this.searchBarView = new SearchBarView();
        },
        render: function () {
            var _self = this;
            _self.$el.append(_self.searchBarView.render().el);
            _self.$el.append(_.template(homeTemplate, null));

            return this;
        }
    });
    return HomeView;
});