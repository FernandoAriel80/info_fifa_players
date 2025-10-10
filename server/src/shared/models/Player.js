// src/models/player.js
import { DataTypes } from 'sequelize'
import sequelize from '../database/sequelize.js'

export const Player = sequelize.define('Player', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  fifa_version: { type: DataTypes.INTEGER, allowNull: false },
  short_name: { type: DataTypes.STRING, allowNull: false },
  long_name: { type: DataTypes.STRING, allowNull: false },
  age: { type: DataTypes.INTEGER },
  dob: { type: DataTypes.DATEONLY },
  height_cm: { type: DataTypes.INTEGER },
  weight_kg: { type: DataTypes.INTEGER },
  preferred_foot: { type: DataTypes.ENUM('Left', 'Right') },
  skill_moves: { type: DataTypes.INTEGER },
  international_reputation: { type: DataTypes.INTEGER },
  work_rate: { type: DataTypes.STRING(50) },
  body_type: { type: DataTypes.STRING(100) },
  player_url: { type: DataTypes.TEXT },
  player_face_url: { type: DataTypes.TEXT }
}, {
  tableName: 'players'
});
