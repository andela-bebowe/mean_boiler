var User = require('../models/user'),
    Users = require('../controllers/users')(User);

module.exports = function(router) {
  router.route('/users')
    .get(Users.get)
    .post(Users.post)

  router.use('/users/:userId', Users.findById);

  router.get('/users/:userId', function(req, res) {
    res.status(200).json(req.user);
  });
}
