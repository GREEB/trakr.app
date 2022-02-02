'use strict'
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Clients', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      mid: {
        type: Sequelize.STRING
      },
      game: {
        type: Sequelize.INTEGER
      },
      usage: {
        type: Sequelize.INTEGER
      },
      mode: {
        type: Sequelize.INTEGER
      },
      visibility: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Clients')
  }
}
