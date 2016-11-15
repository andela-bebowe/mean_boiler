var router = require('express').Router()

// User routes
require('./app/routes/user.js')(router);

module.exports = router;
