import { User } from  '../models/User.js'
import { Player } from  '../models/Player.js'
import { League } from  '../models/League.js'
import { Club } from  '../models/Club.js'
import { Nationality } from  '../models/Nationality.js'
import { ClubContract } from  '../models/ClubContract.js'
import { NationalTeam } from  '../models/NationalTeam.js'
import { PlayerStats} from  '../models/PlayerStats.js'
import { Tag } from  '../models/Tag.js'
import { Trait } from  '../models/Trait.js'
import { Position } from  '../models/Position.js'
import { PlayerTag } from  '../models/PlayerTag.js'
import { PlayerTrait } from  '../models/PlayerTrait.js'
import { PlayerPosition } from '../models/PlayerPosition.js'

export default function setupAssociations() {

  // Player - PlayerStat (One-to-One)
  Player.hasOne(PlayerStats, {
    foreignKey: 'player_id',
    as: 'stats'
  })
  PlayerStats.belongsTo(Player, {
    foreignKey: 'player_id',
    as: 'player'
  })

  // Player - ClubContract (One-to-Many)
  Player.hasMany(ClubContract, {
    foreignKey: 'player_id',
    as: 'clubContracts'
  })
  ClubContract.belongsTo(Player, {
    foreignKey: 'player_id',
    as: 'player'
  })

  // Player - NationalTeam (One-to-Many)
  Player.hasMany(NationalTeam, {
    foreignKey: 'player_id',
    as: 'nationalTeams'
  })
  NationalTeam.belongsTo(Player, {
    foreignKey: 'player_id',
    as: 'player'
  })

  // Player - Position (One-to-Many)
  Player.belongsToMany(Position, {
    through: PlayerPosition,
    foreignKey: 'player_id',
    otherKey: 'position_id',
    as: 'positions'
  })
  Position.belongsToMany(Player, {
    through: PlayerPosition,
    foreignKey: 'position_id',
    otherKey: 'player_id',
    as: 'players'
  })

  // Player - Tag (Many-to-Many)
  Player.belongsToMany(Tag, {
    through: PlayerTag,
    foreignKey: 'player_id',
    otherKey: 'tag_id',
    as: 'tags'
  })
  Tag.belongsToMany(Player, {
    through: PlayerTag,
    foreignKey: 'tag_id',
    otherKey: 'player_id',
    as: 'players'
  })

  // Player - Trait (Many-to-Many)
  Player.belongsToMany(Trait, {
    through: PlayerTrait,
    foreignKey: 'player_id',
    otherKey: 'trait_id',
    as: 'traits'
  })
  Trait.belongsToMany(Player, {
    through: PlayerTrait,
    foreignKey: 'trait_id',
    otherKey: 'player_id',
    as: 'players'
  })

  // Club - ClubContract (One-to-Many)
  Club.hasMany(ClubContract, {
    foreignKey: 'club_id',
    as: 'contracts'
  })
  ClubContract.belongsTo(Club, {
    foreignKey: 'club_id',
    as: 'club'
  })

  // Club - League (Many-to-One)
  Club.belongsTo(League, {
    foreignKey: 'league_id',
    as: 'league'
  })
  League.hasMany(Club, {
    foreignKey: 'league_id',
    as: 'clubs'
  })

  // Nationality - NationalTeam (One-to-Many)
  Nationality.hasMany(NationalTeam, {
    foreignKey: 'nationality_id',
    as: 'nationalTeams'
  })
  NationalTeam.belongsTo(Nationality, {
    foreignKey: 'nationality_id',
    as: 'nationality'
  })

  console.log('✅ All associations configured')
}