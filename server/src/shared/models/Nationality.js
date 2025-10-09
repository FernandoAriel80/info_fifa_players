import { DataTypes } from 'sequelize'
import { sequelize } from '../database/sequelize'

const Nationality = sequelize.define('Nationality', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'nationalities',
  timestamps: true
})

export default Nationality