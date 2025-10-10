// src/models/trait.js
import { DataTypes } from 'sequelize'
import sequelize from '../database/sequelize.js'

export const Trait = sequelize.define('Trait', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true }
  }, { tableName: 'traits' })
