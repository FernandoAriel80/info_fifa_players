import { DataTypes } from 'sequelize'
import { sequelize } from '../database/sequelize'

const Club = sequelize.define('Club', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'clubs',
  timestamps: true
})

export default Club