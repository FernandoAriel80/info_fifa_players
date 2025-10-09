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

const setupAssociations = () => {
  // Player - ClubContract (One-to-Many)
  Player.hasMany(ClubContract, {
    foreignKey: 'player_id',
    as: 'clubContracts'
  });
  ClubContract.belongsTo(Player, {
    foreignKey: 'player_id',
    as: 'player'
  });

  // Club - ClubContract (One-to-Many)
  Club.hasMany(ClubContract, {
    foreignKey: 'club_id',
    as: 'contracts'
  });
  ClubContract.belongsTo(Club, {
    foreignKey: 'club_id',
    as: 'club'
  });

  // League - Club (One-to-Many)
  League.hasMany(Club, {
    foreignKey: 'league_id',
    as: 'clubs'
  });
  Club.belongsTo(League, {
    foreignKey: 'league_id',
    as: 'league'
  });

  // Player - NationalTeam (One-to-Many)
  Player.hasMany(NationalTeam, {
    foreignKey: 'player_id',
    as: 'nationalTeams'
  });
  NationalTeam.belongsTo(Player, {
    foreignKey: 'player_id',
    as: 'player'
  });

  // Nationality - NationalTeam (One-to-Many)
  Nationality.hasMany(NationalTeam, {
    foreignKey: 'nationality_id',
    as: 'nationalTeams'
  });
  NationalTeam.belongsTo(Nationality, {
    foreignKey: 'nationality_id',
    as: 'nationality'
  });

  // Player - PlayerStat (One-to-One)
  Player.hasOne(PlayerStat, {
    foreignKey: 'player_id',
    as: 'stats'
  });
  PlayerStat.belongsTo(Player, {
    foreignKey: 'player_id',
    as: 'player'
  });

  // Player - PlayerPosition (One-to-Many)
  Player.hasMany(PlayerPosition, {
    foreignKey: 'player_id',
    as: 'positions'
  });
  PlayerPosition.belongsTo(Player, {
    foreignKey: 'player_id',
    as: 'player'
  });

  // Player - PlayerTag (Many-to-Many)
  Player.belongsToMany(PlayerTag, {
    through: PlayerPlayerTag,
    foreignKey: 'player_id',
    otherKey: 'tag_id',
    as: 'tags'
  });
  PlayerTag.belongsToMany(Player, {
    through: PlayerPlayerTag,
    foreignKey: 'tag_id',
    otherKey: 'player_id',
    as: 'players'
  });

  // Player - PlayerTrait (Many-to-Many)
  Player.belongsToMany(PlayerTrait, {
    through: PlayerPlayerTrait,
    foreignKey: 'player_id',
    otherKey: 'trait_id',
    as: 'traits'
  });
  PlayerTrait.belongsToMany(Player, {
    through: PlayerPlayerTrait,
    foreignKey: 'trait_id',
    otherKey: 'player_id',
    as: 'players'
  });
};

module.exports = setupAssociations;