define([
    'underscore', 'backbone', 'views/BaseView', 'text!templates/projectview.tmpl'
], function (_, Backbone, BaseView, viewTemplate) {
    var ProjectView = BaseView.extend({
        initialize: function (options) {
            this.model = options.model;
        },
        render: function () {
            var _self = this;
            var temp = _.template(viewTemplate);
            _self.$el.append(temp({
                project: _self.model.toJSON()
            }));
            return this;
        }
    });
    return ProjectView;
});