import { DataTypes } from 'sequelize'
import { sequelize } from '../database/sequelize'

const NationalTeam = sequelize.define('NationalTeam', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  team_id: {
    type: DataTypes.INTEGER
  },
  position: {
    type: DataTypes.STRING
  },
  jersey_number: {
    type: DataTypes.INTEGER
  }
}, {
  tableName: 'national_teams',
  timestamps: true
})

export default NationalTeam