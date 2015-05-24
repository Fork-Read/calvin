define([
    'jquery', 'underscore', 'backbone', 'events', 'quill', 'views/BaseView', 'text!templates/editproject.tmpl'
], function ($, _, Backbone, Events, Quill, BaseView, viewTemplate) {
    var ProjectEditView = BaseView.extend({
        'className': 'edit-project-container',
        initialize: function (options) {
            this.model = options.model;
        },
        events: {
            'keyup .edit-name': 'updateProjectName',
            'keyup .edit-github': 'updateProjectGithub',
            'keyup .edit-website': 'updateProjectWebsite',
            'keyup .edit-desc': 'updateProjectDescription',
            'click .save': 'saveProjectChanges'
        },
        render: function () {
            var _self = this;
            var temp = _.template(viewTemplate);
            _self.$el.append(temp({
                project: _self.model.toJSON()
            }));
            setTimeout(function () {
                _self.editor = new Quill('#editor', {
                    modules: {
                        'toolbar': {
                            container: '#toolbar'
                        },
                        'link-tooltip': true
                    },
                    theme: 'snow'
                });
                _self.editor.on('text-change', function (delta, source) {
                    _self.model.set({
                        'setup_instructions': _self.editor.getHTML()
                    });
                });
            }, 0);
            return this;
        },
        updateProjectName: function () {
            var _self = this;
            _self.model.set({
                'name': $.trim(_self.$el.find('.edit-name').val())
            });
        },
        updateProjectGithub: function () {
            var _self = this;
            _self.model.set({
                'github_url': $.trim(_self.$el.find('.edit-github').val())
            });
        },
        updateProjectWebsite: function () {
            var _self = this;
            _self.model.set({
                'website': $.trim(_self.$el.find('.edit-website').val())
            });
        },
        updateProjectDescription: function () {
            var _self = this;
            _self.model.set({
                'description': $.trim(_self.$el.find('.edit-desc').val())
            });
        },
        saveProjectChanges: function () {
            var _self = this;
            if (_self.model.get('name') === '') {
                alert('Project Name cannot be blank');
                return;
            }
            _self.model.save({}, {
                success: function (model, response) {
                    Events.trigger('router:navigate', 'project/' + _self.model.get('_id'));
                }
            });
        }
    });
    return ProjectEditView;
});