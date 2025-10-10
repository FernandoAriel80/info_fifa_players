// src/models/club.js
import { DataTypes } from 'sequelize'
import sequelize from '../database/sequelize.js'

export const Club = sequelize.define('Club', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    league_id: { type: DataTypes.INTEGER }
  }, { tableName: 'clubs' });

