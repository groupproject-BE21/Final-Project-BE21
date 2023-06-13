'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('articles',{
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.DataTypes.INTEGER,
      },
  
      title: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
  
      content: {
        type: Sequelize.DataTypes.STRING,
      },
  
      image: {
        type: Sequelize.DataTypes.STRING,
      },
  
      created_at: {
        type: Sequelize.DataTypes.DATE,
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('articles');
  }
};
