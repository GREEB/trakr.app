'use strict'
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Positions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      x: {
        type: Sequelize.FLOAT
      },
      y: {
        type: Sequelize.FLOAT
      },
      z: {
        type: Sequelize.FLOAT
      },
      inPuddleSum: {
        type: Sequelize.FLOAT
      },
      surfaceRumbleSum: {
        type: Sequelize.FLOAT
      },
      normSuspensionTravelSum: {
        type: Sequelize.FLOAT
      },
      gameId: {
        type: Sequelize.INTEGER
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Positions')
  }
}
