import { DataTypes } from 'sequelize'
import { sequelize } from '../database/sequelize'

const PlayerStat = sequelize.define('PlayerStat', {
  
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  player_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  overall: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
      max: 99
    }
  },
  potential: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
      max: 99
    }
  },
  pace: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
      max: 99
    }
  },
  shooting: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
      max: 99
    }
  },
  passing: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
      max: 99
    }
  },
  dribbling: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
      max: 99
    }
  },
  defending: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
      max: 99
    }
  },
  physic: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
      max: 99
    }
  },
  attacking_crossing: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
      max: 99
    }
  },
  attacking_finishing: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
      max: 99
    }
  },
  attacking_heading_accuracy: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
      max: 99
    }
  },
  attacking_short_passing: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
      max: 99
    }
  },
  skill_dribbling: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
      max: 99
    }
  },
  skill_fk_accuracy: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
      max: 99
    }
  },
  skill_long_passing: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
      max: 99
    }
  },
  skill_ball_control: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
      max: 99
    }
  },
  movement_acceleration: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
      max: 99
    }
  },
  movement_sprint_speed: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
      max: 99
    }
  },
  movement_agility: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
      max: 99
    }
  },
  movement_reactions: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
      max: 99
    }
  },
  power_shot_power: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
      max: 99
    }
  },
  power_jumping: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
      max: 99
    }
  },
  power_stamina: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
      max: 99
    }
  },
  power_strength: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
      max: 99
    }
  },
  power_long_shots: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
      max: 99
    }
  },
  mentality_aggression: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
      max: 99
    }
  },
  mentality_vision: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
      max: 99
    }
  },
  mentality_composure: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
      max: 99
    }
  },
  defending_marking_awareness: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
      max: 99
    }
  },
  defending_standing_tackle: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
      max: 99
    }
  },
  defending_sliding_tackle: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
      max: 99
    }
  },
  goalkeeping_diving: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
      max: 99
    }
  },
  goalkeeping_handling: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
      max: 99
    }
  },
  goalkeeping_kicking: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
      max: 99
    }
  },
  goalkeeping_positioning: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
      max: 99
    }
  },
  goalkeeping_reflexes: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
      max: 99
    }
  },
  goalkeeping_speed: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
      max: 99
    }
  }
}, {
  tableName: 'player_stats',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['player_id']
    }
  ]
})

export default PlayerStat