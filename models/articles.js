'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Articles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
  }
  Articles.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    content: {
      type: DataTypes.STRING,
    },

    image: {
      type: DataTypes.STRING,
    },

    created_at: {
      type: DataTypes.DATE,
    },
  }, 
  {
    sequelize,
    modelName: 'Articles',
    tableName: 'articles',
    timestamps: false
  });
  return Articles;
};