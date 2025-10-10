const { sequelize } = require('./infrastructure/database/sequelize');

// Repositories
const SequelizePlayerRepository = require('./infrastructure/repositories/player.repository');
const ClubRepository = require('./infrastructure/repositories/club.repository');
const NationalityRepository = require('./infrastructure/repositories/nationality.repository');
const PlayerStatsRepository = require('./infrastructure/repositories/player-stats.repository');

// Services
const CSVProcessingService = require('./application/services/csv-processing.service');

class Container {
  constructor() {
    this.repositories = this.setupRepositories();
    this.services = this.setupServices();
  }

  setupRepositories() {
    return {
      playerRepository: new SequelizePlayerRepository(),
      clubRepository: new ClubRepository(),
      nationalityRepository: new NationalityRepository(),
      playerStatsRepository: new PlayerStatsRepository()
    };
  }

  setupServices() {
    return {
      csvProcessingService: new CSVProcessingService(this.repositories)
    };
  }

  async connectDatabase() {
    try {
      await sequelize.authenticate();
      await sequelize.sync({ alter: true }); // Crear tablas si no existen
      console.log('Database connected and synced');
    } catch (error) {
      console.error('Database connection failed:', error);
      throw error;
    }
  }
}

module.exports = Container;