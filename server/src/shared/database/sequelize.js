import { Sequelize } from 'sequelize'
import { config } from 'dotenv'

config();

const sequelize = new Sequelize(
    process.env.DN_NAME,
    process.env.DN_USER,
    process.env.DN_PASSWORD,
    {
        host: process.env.DN_HOST,
        port: process.env.DN_PORT,
        dialect: process.env.DN_DIALECT,
        logging: false,
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        }
    }
)

export default sequelize