var parameters = {
    'google-client-id': '994809358369-7pm7ohj0mpt01kmnf57nqof6scjvhsl7.apps.googleusercontent.com',
    'google-client-secret': 'xUdND09lJMoZZJbKoZN2UhmP',
    'google-callback-url': 'http://apibucket.herokuapp.com/auth/google/callback',
    'local-mongodb-url': 'mongodb://localhost:27017/calvin',
    get: function(param) {
        return parameters[param];
    }
}

module.exports = parameters;
