import { DataTypes } from 'sequelize'
import { sequelize } from '../database/sequelize'

const Player = sequelize.define('Player', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fifa_version: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fifa_update: {
    type: DataTypes.INTEGER
  },
  fifa_update_date: {
    type: DataTypes.DATE
  },
  short_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  long_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dob: {
    type: DataTypes.DATE
  },
  age: {
    type: DataTypes.INTEGER
  },
  height_cm: {
    type: DataTypes.INTEGER
  },
  weight_kg: {
    type: DataTypes.INTEGER
  },
  preferred_foot: {
    type: DataTypes.ENUM('Left', 'Right')
  },
  weak_foot: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1,
      max: 5
    }
  },
  skill_moves: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1,
      max: 5
    }
  },
  international_reputation: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1,
      max: 5
    }
  },
  work_rate: {
    type: DataTypes.STRING
  },
  body_type: {
    type: DataTypes.STRING
  },
  real_face: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  player_url: {
    type: DataTypes.STRING
  },
  player_face_url: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'players',
  timestamps: true
})

export default Player