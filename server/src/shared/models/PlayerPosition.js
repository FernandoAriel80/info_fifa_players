import { DataTypes } from 'sequelize'
import sequelize from '../database/sequelize.js'

export const PlayerPosition = sequelize.define('PlayerPosition', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  player_id: { type: DataTypes.INTEGER, allowNull: false },
  position_id: { type: DataTypes.INTEGER, allowNull: false }
}, { tableName: 'player_positions' });
