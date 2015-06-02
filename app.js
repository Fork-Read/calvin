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
    UserModel = require('./models/UserModel'),
    parameters = require('./parameters'),
    MongoStore = require('connect-mongo')(session);

var GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(new GoogleStrategy({
        clientID: parameters.get('google-client-id'),
        clientSecret: parameters.get('google-client-secret'),
        callbackURL: parameters.get('google-callback-url'),
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
        done(err, user);
    });
});

// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.
var uristring = process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    parameters.get('local-mongodb-url');

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
    users = require('./routes/users'),
    projects = require('./routes/projects');

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
    saveUninitialized: true,
    store: new MongoStore({
        url: uristring
    })
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/api/users', users);
app.use('/api/project', projects);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
app.use(function (err, req, res, next) {
    if (app.get('env') === 'development') {
        if (err) {
            throw err
        } else {
            console.error(err);
        }
    }
});

module.exports = app;