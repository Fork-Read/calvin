define([
    'underscore', 'backbone', 'quill', 'views/BaseView', 'text!templates/projectview.tmpl'
], function (_, Backbone, Quill, BaseView, viewTemplate) {
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
            setTimeout(function () {
                var fullEditor = new Quill('#editor', {
                    modules: {
                        'link-tooltip': true
                    },
                    readOnly: true,
                    theme: 'snow'
                });
            }, 0);
            return this;
        }
    });
    return ProjectView;
});