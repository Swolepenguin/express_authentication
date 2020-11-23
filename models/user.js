'use strict';
const bycrypt = require('bycrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1,99],
          msg: 'Name must be between 1 and 99 characters'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [12,99],
          msg: 'Password must be between 12 and 99 characters'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'user',
  });

  user.addHook('beforeCreate', function(pendingUser){
    //bycrpt hash a password
    let hash = bycrypt.hashSync(pendingUser.password, 12);
  
    //set password to equal the hash
    pendingUser.password = hash;
  });
  
  user.prototype.validPassword = function(passwordTyped){
    let correctPassword = bycrypt.compareSync(passwordTyped, this.password)
  
    //return true or false based on correct password or not 
    return correctPassword;
  }
  
  //remove the password before it gets serialized (only deletes password from request not database)
  user.prototype.toJSON = function(){
    let userData = this.get();
    delete userData.password;
    return userData;
  }
  return user;
}; 

