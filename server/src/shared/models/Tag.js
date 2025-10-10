// src/models/tag.js
import { DataTypes } from 'sequelize'
import sequelize from '../database/sequelize.js'

export const Tag = sequelize.define('Tag', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true }
  }, { tableName: 'tags' })
