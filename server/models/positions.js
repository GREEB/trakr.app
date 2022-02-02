'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Positions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      this.belongsTo(models.Clients, { foreignKey: 'id' })
      // define association here
    }
  }
  Positions.init({
    x: DataTypes.FLOAT,
    y: DataTypes.FLOAT,
    z: DataTypes.FLOAT,
    inPuddleSum: DataTypes.FLOAT,
    surfaceRumbleSum: DataTypes.FLOAT,
    normSuspensionTravelSum: DataTypes.FLOAT,
    gameId: DataTypes.INTEGER
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Positions'
  })
  return Positions
}
