import { DataTypes } from 'sequelize'
import sequelize from '../database/sequelize.js'

export const PlayerTag = sequelize.define('PlayerTag', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  player_id: { type: DataTypes.INTEGER, allowNull: false },
  tag_id: { type: DataTypes.INTEGER, allowNull: false }
}, { tableName: 'player_tags' });
