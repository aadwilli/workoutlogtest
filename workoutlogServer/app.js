var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sequelize = require('./db');
var User = sequelize.import('./models/user');

// Creates the table in postgres
// Matches the model defined
// Doesn't drop the db
User.sync();
// Code below drops table
// User.sync({force: true})

app.use(bodyParser.json());
app.use(require('./middleware/headers'))
app.use('/api/user', require('./routes/user'));
app.use('/api/login', require('./routes/session'));
app.use('/api/test', function(req, res){
    res.send('Hello World');
});

app.listen(3000, function(){
    console.log("Magic on 3000!")
})

