// src/models/league.js
import { DataTypes } from 'sequelize'
import sequelize from '../database/sequelize.js'

export const League = sequelize.define('League', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false }
  }, { tableName: 'leagues' })
