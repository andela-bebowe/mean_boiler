var express     = require('express'),
    app         = express(),
    mongoose    = require('mongoose'),
    session     = require('express-session'),
    bodyParser  = require('body-parser'),
    morgan      = require('morgan'),
    passport    = require('passport'),
    db          = "",
    basePath    = __dirname  + '/public',
    config      = require('./config/config');

app.use(express.static(basePath));

db = config.db.url;
if(process.env.NODE_ENV == "test") { db = config.db.test_url }

mongoose.connect(db);
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(session({
  secret: config.secret,
  resave: false,
  saveUninitialized: true,
  store: new (require('express-sessions'))({
    storage: 'mongodb',
    instance: mongoose
  })
}));
app.use(passport.initialize());
app.use(passport.session());

// Authentication routes
require('./config/auth.js')(app, passport, basePath);
require('./config/passport')(passport);

app.use('/api', require('./routes.js'));

app.listen(config.port);
