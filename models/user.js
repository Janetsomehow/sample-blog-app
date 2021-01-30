'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
  first_name: DataTypes.STRING,
    last_name: DataTypes.STRING
     
  });
  User.associate = function(models) {
    models.User.hasMany(models.Task);
  };

  return User;
};

 