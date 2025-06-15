"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post, { foreignKey: "userId", as: "user" });
      User.belongsToMany(models.Post, {
        through: models.Favorite,
        foreignKey: "userId",
        otherKey: "postId",
        as: "favoritePosts",
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      zalo: DataTypes.STRING,
      fbUrl: DataTypes.STRING,
      avatar: DataTypes.BLOB,
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      balance: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      vipLevel: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      vipExpire: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    { sequelize, modelName: "User" }
  );

  return User;
};
