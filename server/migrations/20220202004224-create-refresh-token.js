'use strict'
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('RefreshTokens', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      token: {
        type: Sequelize.STRING
      },
      expiryDate: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('RefreshTokens')
  }
}
