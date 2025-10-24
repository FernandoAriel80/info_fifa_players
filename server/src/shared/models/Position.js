// src/models/position.js
import { DataTypes } from 'sequelize'
import sequelize from '../database/sequelize.js'

export const Position = sequelize.define('Position', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(50), allowNull: false }
  }, { tableName: 'positions' })
