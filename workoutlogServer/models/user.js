// Build a user model in sqllize
// Talks to the table user
module.exports=function(sequelize, DataTypes){
        return sequelize.define('user', {
        username: DataTypes.STRING,
        passwordhash: DataTypes.STRING,
    });
};