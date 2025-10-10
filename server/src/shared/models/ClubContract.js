// src/models/clubContract.js
import { DataTypes } from 'sequelize'
import sequelize from '../database/sequelize.js'

export const ClubContract = sequelize.define('ClubContract', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    player_id: { type: DataTypes.INTEGER, allowNull: false },
    club_id: { type: DataTypes.INTEGER, allowNull: false },
    level: { type: DataTypes.INTEGER },
    position: { type: DataTypes.STRING(50) },
    jersey_number: { type: DataTypes.INTEGER },
    wage_eur: { type: DataTypes.DECIMAL(15,2) },
    value_eur: { type: DataTypes.DECIMAL(15,2) }
  }, { tableName: 'club_contracts' });
