var router = require('express').Router();
var sequelize = require('../db.js');
var User = sequelize.import('../models/user');

router.post('/', function(req, res){
    // When posted to API user, it will want a user object in the body
    var username = req.body.user.username;
    var pass = req.body.user.password; // TODO: hash this password
    // Match the model created above
    // Sequelize - take the user model and go out to the db and create this:
    User.create({
        username: username,
        passwordhash: ''
    }).then(
        //Sequelize is going to return the object it created from the db
        function createSuccess(user){
            // On success
            res.json({
                user: user,
                message: 'create'
            });
        },
        // On error
        function createError(err){
            res.send(500, err.message)
        }
    );
});

module.exports = router;



