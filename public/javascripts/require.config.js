require.config({
    'baseUrl': '/javascripts',
    'paths': {
        'jquery': 'libs/jquery',
        'jquery-ui': 'libs/jquery-ui',
        'backbone': 'libs/backbone',
        'underscore': 'libs/underscore',
        'text': 'libs/text',
        'quill': 'libs/quill.min'
    },
    'shim': {
        'backbone': {
            'deps': ['underscore', 'jquery'],
            'exports': 'Backbone'
        },
        'underscore': {
            'exports': "_"
        },
        'quill': {
            'exports': "Quill"
        },
        'jquery-ui': {
            'deps': ['jquery']
        }
    }
});

require(['init']);