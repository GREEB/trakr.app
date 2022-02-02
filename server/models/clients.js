'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Clients extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      this.belongsTo(models.Users, { foreignKey: 'id' })
      this.hasMany(models.Positions, { foreignKey: 'clientId' })
      // define association here
    }
  }
  Clients.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    mid: DataTypes.STRING,
    game: DataTypes.INTEGER,
    usage: DataTypes.INTEGER,
    mode: DataTypes.INTEGER,
    visibility: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Clients'
  })
  return Clients
}
