// src/models/nationalTeam.js
import { DataTypes } from 'sequelize'
import sequelize from '../database/sequelize.js'

export const NationalTeam = sequelize.define('NationalTeam', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    player_id: { type: DataTypes.INTEGER, allowNull: false },
    nationality_id: { type: DataTypes.INTEGER, allowNull: false },
    position: { type: DataTypes.STRING(50) },
    jersey_number: { type: DataTypes.INTEGER }
  }, { tableName: 'national_teams' })
