import { DataTypes } from 'sequelize'
import { sequelize } from '../database/sequelize'

const League = sequelize.define('League', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  level: {
    type: DataTypes.INTEGER
  }
}, {
  tableName: 'leagues',
  timestamps: true
})

export default League