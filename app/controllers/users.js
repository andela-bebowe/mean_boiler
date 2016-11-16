module.exports = function Users(User){
  var get = function(req, res) {
    User.find(function(err, users) {
      if(err) return res.status(500).json({ "error": err.message })
      res.status(200).json(users);
    })
  };

  var post = function(req, res) {
    var user = new User(req.body);
    user.save(function(err, user) {
      if(err) return res.status(500).json({ "error": err.message });
      if(!user) return res.status(400).json({ "error": "Incorrect attribute supplied..."});
      res.status(201).json(user);
    })
  };

  var findById = function(req, res, next) {
    User.findById(req.params._id, function(err, user) {
      if(err) return res.status(500).json({ "error": err.message })
      if(!user) return res.status(404).json({ "error": "User Not Found"});
      req.user = user;
      next();
    })
  };

  return {
    post: post,
    get: get,
    findById: findById
  }
}
