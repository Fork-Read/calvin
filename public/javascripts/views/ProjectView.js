define([
    'underscore', 'backbone', 'quill', 'views/BaseView', 'views/DialogView', 'text!templates/projectview.tmpl'
], function (_, Backbone, Quill, BaseView, DialogView, viewTemplate) {
    var ProjectView = BaseView.extend({
        initialize: function (options) {
            var _self = this;
            _self.model = options.model;
        },
        events: {
            'click .add-category': 'openAddCategoryDialog'
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

            _self.addCategoryDialog = new DialogView({
                'title': 'Add Category',
                'innerHTML': _self.$el.find('.add-category-dialog')
            });

            _self.$el.append(_self.addCategoryDialog.render().el);
            return this;
        },
        openAddCategoryDialog: function () {
            this.addCategoryDialog.open();
        }
    });
    return ProjectView;
});