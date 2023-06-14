'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
  }
  Comments.init({
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'users'
        },
        key: 'id'
      },
    },

    article_id: {
      type: DataTypes.INTEGER,
        allowNull: false,
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, 
  {
    sequelize,
    modelName: 'Comments',
    tableName: 'comments',
    timestamps: false
  });
  return Comments;
};