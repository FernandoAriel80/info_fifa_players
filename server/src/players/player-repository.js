import { Player } from '../shared/models/Player.js'
import { Nationality } from '../shared/models/Nationality.js'
import { Club } from '../shared/models/Club.js'
import { League } from '../shared/models/League.js'
import { Position } from '../shared/models/Position.js'
import { Tag } from '../shared/models/Tag.js'
import { Trait } from '../shared/models/Trait.js'
import { PlayerStats } from '../shared/models/PlayerStats.js'
import { NationalTeam } from '../shared/models/NationalTeam.js'
import { ClubContract } from '../shared/models/ClubContract.js'
import { Op } from 'sequelize';

export default class PlayerRepository {

  async all() {
    return await Player.findAll({
      include: this.getDefaultIncludes()
    })
  }

  async create(data, options = {}) {
    return await Player.create(data, options);
  }

  async findById(id) {
    return await Player.findOne({
      where: { player_id: id },
      include: this.getDefaultIncludes()
    });
  }

  async findAllPaginated(page = 1, size = 10, filters = {}) {
    const limit = size;
    const offset = (page - 1) * size;

    const { where, include } = this.buildFilters(filters);

    const result = await Player.findAndCountAll({
      where,
      limit,
      offset,
      distinct: true,
      subQuery: false,
      order: this.buildOrder(filters),
      include,
      attributes: {
        exclude: ['created_at', 'updated_at']
      },
    })

    const totalItems = result.count;
    const totalPages = Math.ceil(totalItems / limit);

    return {
      data: result.rows,
      meta: {
        totalItems,
        itemsPerPage: limit,
        totalPages,
        currentPage: page
      }
    }
  }

  // Métodos auxiliares para construir filtros
  buildFilters(filters = {}) {
    const where = {};
    const include = [...this.getDefaultIncludes()];

    // 🔍 Filtro por nombre del jugador 1
    if (filters.name) {
      where.short_name = {
        [Op.like]: `%${filters.name}%`
      }
    }

    // 🔍 Filtro por edad 1
    if (filters.age) {
      where.age = {
        [Op.eq]: parseInt(filters.age)
      }
    }

    // 🔍 Filtro por nacionalidad 1
    if (filters.nationality) {
      const nationalityIndex = include.findIndex(inc => inc.as === 'nationalTeams');
      if (nationalityIndex !== -1) {
        include[nationalityIndex].required = true;
        include[nationalityIndex].include[0].where = {
          name: { [Op.like]: `%${filters.nationality}%` }
        };
      }
    }

    // 🔍 Filtro por posición 1
    if (filters.position) {
      const positionIndex = include.findIndex(inc => inc.as === 'positions');
      if (positionIndex !== -1) {
        include[positionIndex].required = true;
        include[positionIndex].where = {
          name: { [Op.like]: `%${filters.position}%` }
        };
      }
    }

    // 🔍 Filtro por liga 1
    if (filters.league) {
      const clubContractIndex = include.findIndex(inc => inc.as === 'clubContracts');
      if (clubContractIndex !== -1) {
        include[clubContractIndex].required = true;
        include[clubContractIndex].include[0].required = true;
        include[clubContractIndex].include[0].include[0].where = {
          name: { [Op.like]: `%${filters.league}%` }
        };
      }
    }

    // 🔍 Filtro por club 1
    if (filters.club) {
      const clubContractIndex = include.findIndex(inc => inc.as === 'clubContracts');
      if (clubContractIndex !== -1) {
        include[clubContractIndex].required = true;
        include[clubContractIndex].include[0].where = {
          name: { [Op.like]: `%${filters.club}%` }
        };
      }
    }

    // 🔍 Filtro por tags 1
    if (filters.tags) {
      const tagsIndex = include.findIndex(inc => inc.as === 'tags');
      if (tagsIndex !== -1) {
        include[tagsIndex].required = true;
        include[tagsIndex].where = {
          name: { [Op.like]: `%${filters.tags}%` }
        };
      }
    }

    // 🔍 Filtro por traits 1
    if (filters.traits) {
      const traitsIndex = include.findIndex(inc => inc.as === 'traits');
      if (traitsIndex !== -1) {
        include[traitsIndex].required = true;
        include[traitsIndex].where = {
          name: { [Op.like]: `%${filters.traits}%` }
        };
      }
    }
  }

  buildOrder(filters = {}) {
    // Orden por defecto
    let order = [['created_at', 'DESC']];

    // 🔍 Ordenamiento por overall
    if (filters.sortBy === 'overall') {
      order = [[{ model: PlayerStats, as: 'stats' }, 'overall', filters.sortOrder || 'DESC']];
    }

    // 🔍 Ordenamiento por potencial
    else if (filters.sortBy === 'potential') {
      order = [[{ model: PlayerStats, as: 'stats' }, 'potential', filters.sortOrder || 'DESC']];
    }

    // 🔍 Ordenamiento por valor
    else if (filters.sortBy === 'value') {
      order = [['value_eur', filters.sortOrder || 'DESC']];
    }

    // 🔍 Ordenamiento por edad
    else if (filters.sortBy === 'age') {
      order = [['age', filters.sortOrder || 'ASC']];
    }

    // 🔍 Ordenamiento por nombre
    else if (filters.sortBy === 'name') {
      order = [['short_name', filters.sortOrder || 'ASC']];
    }

    return order;
  }

  getDefaultIncludes() {
    return [
      {
        model: NationalTeam,
        as: 'nationalTeams',
        attributes: { exclude: ['created_at', 'updated_at', 'player_id', 'nationality_id'] },
        include: [
          {
            model: Nationality,
            as: 'nationality',
            attributes: { exclude: ['created_at', 'updated_at'] },
          }
        ]
      },
      {
        model: Position,
        as: 'positions',
        through: { attributes: [] },
        attributes: { exclude: ['created_at', 'updated_at'] }
      },
      {
        model: Tag,
        as: 'tags',
        through: { attributes: [] },
        attributes: { exclude: ['created_at', 'updated_at'] }
      },
      {
        model: Trait,
        as: 'traits',
        through: { attributes: [] },
        attributes: { exclude: ['created_at', 'updated_at'] }
      },
      {
        model: PlayerStats,
        as: 'stats',
        attributes: { exclude: ['created_at', 'updated_at'] }
      },
      {
        model: ClubContract,
        as: 'clubContracts',
        attributes: { exclude: ['created_at', 'updated_at'] },
        include: [
          {
            model: Club,
            as: 'club',
            attributes: { exclude: ['created_at', 'updated_at'] },
            include: [
              {
                model: League,
                as: 'league',
                attributes: { exclude: ['created_at', 'updated_at'] },
              }
            ]
          }
        ]
      }
    ];
  }

  // 🔍 Métodos específicos para búsquedas comunes
  async findByNationality(nationalityName) {
    return this.findAllPaginated(1, 10, { nationality: nationalityName });
  }

  async findByPosition(positionName) {
    return this.findAllPaginated(1, 10, { position: positionName });
  }

  async findByClub(clubName) {
    return this.findAllPaginated(1, 10, { club: clubName });
  }

  async findTopPlayers(limit = 10) {
    return this.findAllPaginated(1, limit, {
      sortBy: 'overall',
      sortOrder: 'DESC'
    });
  }

  async findYoungTalents(maxAge = 21, minPotential = 80) {
    return this.findAllPaginated(1, 10, {
      maxAge,
      minPotential,
      sortBy: 'potential',
      sortOrder: 'DESC'
    });
  }
}