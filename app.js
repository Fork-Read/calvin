var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    session = require('express-session'),
    passport = require('passport'),
    _ = require('underscore'),
    UserModel = require('./models/UserModel');

var GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(new GoogleStrategy({
        clientID: '994809358369-7pm7ohj0mpt01kmnf57nqof6scjvhsl7.apps.googleusercontent.com',
        clientSecret: 'xUdND09lJMoZZJbKoZN2UhmP',
        callbackURL: "http://localhost:3000/auth/google/callback",
        passReqToCallback: true
    },
    function (request, accessToken, refreshToken, profile, done) {

        UserModel.findOne({
            'email': profile.email
        }, function (err, user) {
            if (err) {
                return console.error(err);
            }

            if (!user) {
                var newUser = new UserModel({
                    'name': profile.displayName,
                    'email': profile.email,
                    'pictureUrl': profile._json.image.url.replace('?sz=50', '?sz=300'),
                    'contactNo': '',
                    'website': '',
                    'isOrganisation': false,
                    'projects': [],
                    'providerId': profile.id
                });

                newUser.save(function (err, newUser) {
                    if (err) {
                        return console.error(err);
                    }
                    return done(err, newUser);
                });
            } else {
                return done(err, user);
            }
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    UserModel.findById(id, function (err, user) {
        console.log(user);
        done(err, user);
    });
});

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
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/api/users', users);

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