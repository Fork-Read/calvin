require.config({
    'baseUrl': '/javascripts',
    'paths': {
        'jquery': 'libs/jquery',
        'backbone': 'libs/backbone',
        'underscore': 'libs/underscore',
        'text': 'libs/text'
    },
    'shim': {
        'backbone': {
            'deps': ['underscore', 'jquery'],
            'exports': 'Backbone'
        },
        'underscore': {
            'exports': "_"
        }
    }
});

require(['init']);
