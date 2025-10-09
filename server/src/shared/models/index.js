import { sequelize } from '../database/sequelize'

import { User } from './User.js'
import { Player } from './Player.js'
import { League } from './League.js'
import { Club } from './Club.js'
import { ClubContract } from './ClubContract.js'
import { Nationality } from './Nationality.js'
import { NationalTeam } from './NationalTeam.js'
import { PlayerStat } from './PlayerStat.js'
import { PlayerTag } from './PlayerTag.js'
import { PlayerTrait } from './PlayerTrait.js'
import { PlayerPosition } from './PlayerPosition.js'
import { PlayerPlayerTag } from './PlayerPlayerTag.js'
import { PlayerPlayerTrait } from './PlayerPlayerTrait.js'

import { setupAssociations } from '../associations.js'


setupAssociations();

export const models = {
  User,
  Player,
  League,
  Club,
  ClubContract,
  Nationality,
  NationalTeam,
  PlayerStat,
  PlayerTag,
  PlayerTrait,
  PlayerPosition,
  PlayerPlayerTag,
  PlayerPlayerTrait,
  sequelize
}

export const syncModels = async (force = false) => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a MySQL establecida correctamente.');
    
    await sequelize.sync({ force });
    console.log('Modelos sincronizados con la base de datos.');
  } catch (error) {
    console.error('Error al sincronizar modelos:', error);
  }
}
