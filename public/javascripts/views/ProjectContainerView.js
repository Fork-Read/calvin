define([
    'jquery', 'underscore', 'backbone', 'views/BaseView', 'views/ProjectView', 'views/ProjectEditView', 'models/ProjectModel'
], function ($, _, Backbone, BaseView, ProjectView, ProjectEditView, ProjectModel) {
    var ProjectContainerView = BaseView.extend({
        'className': 'project-container',
        initialize: function (options) {
            var _self = this;
            this.options = options;
            this.projectModel = new ProjectModel({
                _id: _self.options.projectId
            });
        },
        render: function () {
            var _self = this;

            this.projectModel.fetch({
                'reset': true,
                success: function () {
                    if (!_self.options.type || _self.options.type === 'project') {
                        _self.setHeader();

                        _self.projectView = new ProjectView({
                            model: _self.projectModel
                        });
                        _self.$el.append(_self.projectView.render().el);
                    } else {
                        if (_self.options.type = 'edit') {
                            _self.projectEditView = new ProjectEditView({
                                model: _self.projectModel
                            });
                            _self.$el.append(_self.projectEditView.render().el);
                        }
                    }
                }
            });
            return this;
        },
        setHeader: function () {
            $('.active-project').html(this.projectModel.get('name'));
        }
    });
    return ProjectContainerView;
});