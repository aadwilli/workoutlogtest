var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(require('./middleware/headers'))

app.use('/api/test', function(req, res){
    res.send('Hello World')
})

app.listen(3000, function(){
    console.log("Magic on 3000!")
})

var Sequelize = require('sequelize');
var sequelize = new Sequelize('workoutlog', 'postgres', 'Marauders4!', {
                host: 'localhost',
                dialect: 'postgres'
});

sequelize.authenticate().then(
    function(){
        console.log('connected to workoutlog postgres db');
    },
    function(err){
        console.log('err');
    }
);


// Build a user model in sqllize
var User = sequelize.define('user', {
            username: Sequelize.STRING,
            passwordhash: Sequelize.STRING,
});

// Creates the table in postgres
// Matches the model defined
// Doesn't drop the db
User.sync();
//User.sync({force: true})
app.use(bodyParser.json());

app.post('/api/user', function(req, res){
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



