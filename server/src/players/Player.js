import { DataTypes } from 'sequelize'
import sequelize from '../../database/sequelize'

const Player = sequelize.define('Player', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fifa_version: {
        type: DataTypes.INTEGER,
    },
    fifa_update: {
        type: DataTypes.INTEGER,
    },
    fifa_update_date: {
        type: DataTypes.DATE,
    },
    short_name: {
        type: DataTypes.STRING,
    },
    long_name: {
        type: DataTypes.STRING,
    },
    dob: {
        type: DataTypes.DATE,
    },
    age: {
        type: DataTypes.INTEGER,
    },
    height_cm: {
        type: DataTypes.INTEGER,
    },
    weight_kg: {
        type: DataTypes.INTEGER,
    },
    preferred_foot: {
        type: DataTypes.ENUM('Left','Rigth'),
    },
    weak_foot: {
        type: DataTypes.INTEGER,
    },
    skill_moves: {
        type: DataTypes.INTEGER,
    },
    international_reputation: {
        type: DataTypes.INTEGER,
    },
    work_rate: {
        type: DataTypes.STRING,
    },
    body_type: {
        type: DataTypes.STRING,
    },
    player_url: {
        type: DataTypes.STRING,
    },
    player_face_url: {
        type: DataTypes.STRING,
    },
}, {
        tableName: "players",
        timestamps: true,
})

export default Player