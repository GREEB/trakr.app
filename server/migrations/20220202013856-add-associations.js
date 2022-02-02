'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'RefreshTokens', // name of Source model
      'userId', // name of the key we're adding
      {
        type: Sequelize.UUID,
        references: {
          model: 'Users', // name of Target model
          key: 'id' // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    )
    await queryInterface.addColumn(
      'Positions', // name of Source model
      'clientId', // name of the key we're adding
      {
        type: Sequelize.UUID,
        references: {
          model: 'Clients', // name of Target model
          key: 'id' // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    )
    await queryInterface.addColumn(
      'Clients', // name of Source model
      'userId', // name of the key we're adding
      {
        type: Sequelize.UUID,
        references: {
          model: 'Users', // name of Target model
          key: 'id' // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'RefreshTokens', // name of Source model
      'userId' // key we want to remove
    )
    await queryInterface.removeColumn(
      'Positions', // name of Source model
      'clientId' // key we want to remove
    )
    await queryInterface.removeColumn(
      'Clients', // name of Source model
      'userId' // key we want to remove
    )
  }
}
