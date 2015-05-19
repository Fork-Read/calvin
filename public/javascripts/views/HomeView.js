define([
    'underscore', 'backbone', 'views/BaseView', 'views/SearchBarView', 'models/ProjectCollection', 'text!templates/home.tmpl'
], function (_, Backbone, BaseView, SearchBarView, ProjectCollection, homeTemplate) {
    var HomeView = BaseView.extend({
        initialize: function () {
            var_self = this;
            this.searchBarView = new SearchBarView();
            this.projectCollection = new ProjectCollection();
        },
        render: function () {
            var _self = this;
            _self.$el.append(_self.searchBarView.render().el);
            this.projectCollection.fetch({
                'reset': true,
                success: function () {
                    _self.$el.append(_.template(homeTemplate, {
                        projects: _self.projectCollection.toJSON()
                    }));
                }
            });

            return this;
        }
    });
    return HomeView;
});