import { DataTypes } from 'sequelize'
import { sequelize } from '../database/sequelize'

const ClubContract = sequelize.define('ClubContract', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  position: {
    type: DataTypes.STRING
  },
  jersey_number: {
    type: DataTypes.INTEGER
  },
  loaned_from: {
    type: DataTypes.STRING
  },
  joined_date: {
    type: DataTypes.DATE
  },
  contract_valid_until_year: {
    type: DataTypes.INTEGER
  },
  release_clause_eur: {
    type: DataTypes.DECIMAL(15, 2)
  },
  wage_eur: {
    type: DataTypes.DECIMAL(15, 2)
  },
  value_eur: {
    type: DataTypes.DECIMAL(15, 2)
  }
}, {
  tableName: 'club_contracts',
  timestamps: true
})

export default ClubContract