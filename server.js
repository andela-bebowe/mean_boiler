var express     = require('express'),
    app         = express(),
    mongoose    = require('mongoose'),
    session     = require('express-session'),
    bodyParser  = require('body-parser'),
    morgan      = require('morgan'),
    passport    = require('passport')
    db          = ""
    config      = require('./config/config');

app.use(express.static(__dirname + '/views'));

app.get('/', function(req, res) {
  res.sendFile('index.html')
});

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
require('./config/auth.js')(app, passport);
require('./config/passport')(passport);

app.use('/api', require('./routes.js'));

app.listen(config.port);
