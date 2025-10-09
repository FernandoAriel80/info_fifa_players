import { DataTypes } from 'sequelize'
import { sequelize } from '../database/sequelize'

const Position = sequelize.define('Position', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'positions',
  timestamps: true
})

export default Position