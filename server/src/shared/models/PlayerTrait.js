import { DataTypes } from 'sequelize'
import sequelize from '../database/sequelize.js'

export const PlayerTrait = sequelize.define('PlayerTrait', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  player_id: { type: DataTypes.INTEGER, allowNull: false },
  trait_id: { type: DataTypes.INTEGER, allowNull: false }
}, { tableName: 'player_traits' });