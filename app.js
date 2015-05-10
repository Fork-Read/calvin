var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    OAuth2Strategy = require('passport-oauth').OAuth2Strategy,
    mongoose = require('mongoose'),
    session = require('express-session'),
    UserModel = require('./models/UserModel');

// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.
var uristring = process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost:27017/calvin';

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(uristring, function (err, res) {
    if (err) {
        console.log('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
        console.log('Succeeded connected to: ' + uristring);
    }
});

passport.use('provider', new OAuth2Strategy({
        authorizationURL: 'https://accounts.google.com/o/oauth2/auth',
        tokenURL: 'https://accounts.google.com/o/oauth2/token',
        clientID: '994809358369-7pm7ohj0mpt01kmnf57nqof6scjvhsl7.apps.googleusercontent.com',
        clientSecret: 'xUdND09lJMoZZJbKoZN2UhmP',
        callbackURL: 'http://localhost:3000/auth/provider/callback'
    },
    function (accessToken, refreshToken, profile, done) {
        // UserModel.findOneOrCreate({
        //     'email': profile.email
        // }, function (err, user) {
        //     done(err, user);
        // });
        console.log(accessToken);
        done(null, {});
    }
));

passport.serializeUser(function (user, done) {
    done(null, '123456');
});

passport.deserializeUser(function (id, done) {
    console.log('deserializeUser');
    UserModel.findOne({
        '_id': id
    }, function (err, user) {
        done(err, user);
    });
});

var routes = require('./routes/index'),
    users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true
    }
}))

app.use('/', routes);
app.use('/users', users);
app.get('/auth/provider', passport.authenticate('provider', {
    scope: 'email'
}));
app.get('/auth/provider/callback',
    passport.authenticate('provider', {
        successRedirect: '/',
        failureRedirect: '/register'
    }));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;