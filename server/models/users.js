'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      this.hasOne(models.RefreshTokens, { foreignKey: 'userId' })
      this.hasMany(models.Clients, { foreignKey: 'userId' })
    }
  }
  Users.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    did: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    avatar: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users'
  })
  return Users
}
