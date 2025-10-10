// src/models/playerStats.js
import { DataTypes } from 'sequelize'
import sequelize from '../database/sequelize.js'

export const PlayerStats = sequelize.define('PlayerStats', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    player_id: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    overall: { type: DataTypes.INTEGER },
    potential: { type: DataTypes.INTEGER },
    pace: { type: DataTypes.INTEGER },
    shooting: { type: DataTypes.INTEGER },
    passing: { type: DataTypes.INTEGER },
    dribbling: { type: DataTypes.INTEGER },
    defending: { type: DataTypes.INTEGER },
    physic: { type: DataTypes.INTEGER },
    attacking_crossing: { type: DataTypes.INTEGER },
    attacking_finishing: { type: DataTypes.INTEGER },
    attacking_heading_accuracy: { type: DataTypes.INTEGER },
    attacking_short_passing: { type: DataTypes.INTEGER },
    skill_dribbling: { type: DataTypes.INTEGER },
    skill_fk_accuracy: { type: DataTypes.INTEGER },
    skill_long_passing: { type: DataTypes.INTEGER },
    skill_ball_control: { type: DataTypes.INTEGER },
    movement_acceleration: { type: DataTypes.INTEGER },
    movement_sprint_speed: { type: DataTypes.INTEGER },
    movement_agility: { type: DataTypes.INTEGER },
    movement_reactions: { type: DataTypes.INTEGER },
    power_shot_power: { type: DataTypes.INTEGER },
    power_jumping: { type: DataTypes.INTEGER },
    power_stamina: { type: DataTypes.INTEGER },
    power_strength: { type: DataTypes.INTEGER },
    power_long_shots: { type: DataTypes.INTEGER },
    mentality_aggression: { type: DataTypes.INTEGER },
    mentality_vision: { type: DataTypes.INTEGER },
    mentality_composure: { type: DataTypes.INTEGER },
    defending_marking_awareness: { type: DataTypes.INTEGER },
    defending_standing_tackle: { type: DataTypes.INTEGER },
    defending_sliding_tackle: { type: DataTypes.INTEGER },
    goalkeeping_diving: { type: DataTypes.INTEGER },
    goalkeeping_handling: { type: DataTypes.INTEGER },
    goalkeeping_kicking: { type: DataTypes.INTEGER },
    goalkeeping_positioning: { type: DataTypes.INTEGER },
    goalkeeping_reflexes: { type: DataTypes.INTEGER },
    goalkeeping_speed: { type: DataTypes.INTEGER }

  }, { tableName: 'player_stats' });

