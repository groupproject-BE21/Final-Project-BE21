'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('comments',{
      id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
      },
  
      user_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'users'
          },
          key: 'id'
        },
      },
  
      article_id: {
        type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
      },
  
      created_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('comments');
  }
};
