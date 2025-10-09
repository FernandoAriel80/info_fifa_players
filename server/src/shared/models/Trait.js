import { DataTypes } from 'sequelize'
import { sequelize } from '../database/sequelize'

const Trait = sequelize.define('Trait', {
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
  tableName: 'traits',
  timestamps: true
})

export default Trait