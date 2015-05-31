define([
    'jquery', 'jquery-ui', 'backbone'
], function ($, JQueryUI, Backbone) {
    var DialogView = Backbone.View.extend({
        initialize: function (options) {
            var _self = this;
            _self.options = $.extend({
                'width': 500,
                'autoOpen': false,
                'closeOnEscape': true,
                'draggable': false,
                'modal': true,
                'position': {
                    'my': 'center',
                    'at': 'center',
                    'of': window
                },
                'resizable': false,
                'innerHTML': '<div></div>',
                open: function (event, ui) {
                    $('.ui-widget-overlay').bind('click', function () {
                        $("#popup").dialog('close');
                    });
                }
            }, options);
        },
        render: function () {
            var _self = this;

            $(_self.options.innerHTML).dialog(_self.options);

            return _self;
        },
        open: function () {
            var _self = this;
            $(_self.options.innerHTML).dialog('open');
        },
        update: function (options) {
            var _self = this;
            _self.options = $.extend(_self.options, options);
        },
        close: function () {
            var _self = this;
            $(_self.options.innerHTML).dialog('close');
        },
        destroy: function () {
            var _self = this;
            $(_self.options.innerHTML).dialog('destroy');
        }
    });
    return DialogView;
});