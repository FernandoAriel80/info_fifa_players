import { Player } from "../shared/models/Player.js";
import { Nationality } from "../shared/models/Nationality.js";
import { Club } from "../shared/models/Club.js";
import { League } from "../shared/models/League.js";
import { Position } from "../shared/models/Position.js";
import { Tag } from "../shared/models/Tag.js";
import { Trait } from "../shared/models/Trait.js";
import { PlayerStats } from "../shared/models/PlayerStats.js";
import { NationalTeam } from "../shared/models/NationalTeam.js";
import { ClubContract } from "../shared/models/ClubContract.js";
import { Op } from "sequelize";

export default class PlayerRepository {
  async all() {
    return await Player.findAll({
      include: this.getDefaultIncludes(),
    });
  }

  async create(data, options = {}) {
    return await Player.create(data, options);
  }

  async findAllByName(name) {
    return await Player.findAll({
      where: {
        long_name: {
          [Op.eq]: name.trim(),
        },
      },
      include: this.getDefaultIncludes(),
    });
  }

  async findById(id) {
    return await Player.findOne({
      where: { player_id: id },
      include: this.getDefaultIncludes(),
    });
  }

  async findAllFiltered(filters = {}) {
    const { where, include } = this.buildFilters(filters);

    const players = await Player.findAll({
      where,
      distinct: true,
      subQuery: false,
      order: this.buildOrder(filters),
      include,
      attributes: {
        exclude: ["created_at", "updated_at"],
      },
    });

    return players;
  }

  async findAllPaginated(page = 1, size = 20, filters = {}) {
    const limit = size;
    const offset = (page - 1) * size;
    const { where, include } = this.buildFilters(filters);

    //console.log("INCLUDE construido:", JSON.stringify(include, null, 2));
    // Paso 1: obtener solo los IDs (sin includes)
    const { count: totalItems, rows: idRows } = await Player.findAndCountAll({
      where,
      limit,
      offset,
      attributes: ["id"],
      order: this.buildOrder(filters),
      distinct: true,
      subQuery: false,
    });

    const playerIds = idRows.map((p) => p.id);

    // Paso 2: obtener los jugadores completos por ID (ahora sí con includes)
    const players = await Player.findAll({
      where: { id: playerIds },
      include,
      order: this.buildOrder(filters),
      subQuery: false,
      attributes: { exclude: ["created_at", "updated_at"] },
    });

    const totalPages = Math.ceil(totalItems / limit);

    return {
      data: players,
      meta: {
        totalItems,
        itemsPerPage: limit,
        totalPages,
        currentPage: page,
      },
    };
  }

  // Métodos auxiliares para construir filtros
  buildFilters(filters = {}) {
    const where = {};
    const include = [...this.getDefaultIncludes()];

    // 🔍 Filtro por nombre del jugador 1
    if (filters.name) {
      where.short_name = {
        [Op.like]: `%${filters.name}%`,
      };
    }

    // 🔍 Filtro por version de fifa
    if (filters.version) {
      where.fifa_version = {
        [Op.like]: `%${filters.version}%`,
      };
    }

    // 🔍 Filtro por edad 1
    if (filters.age) {
      where.age = {
        [Op.eq]: parseInt(filters.age),
      };
    }
    // 🔍 Filtro por nacionalidad 1
    if (filters.nationality) {
      const nationalityIndex = include.findIndex(
        (inc) => inc.as === "nationalTeams"
      );
      if (nationalityIndex !== -1) {
        // Solo aplicamos el where, sin required
        include[nationalityIndex].include[0].where = {
          name: { [Op.like]: `%${filters.nationality}%` },
        };
      }
    }
    // 🔍 Filtro por nacionalidad

    // 🔍 Filtro por posición 1

    if (filters.position) {
      console.log(filters.position);

      include[1].required = true;
      include[1].where = {
        name: { [Op.like]: `%${filters.position}%` },
      };
      //}
      console.log(include[1]);
    }

    if (filters.league) {
      console.log(filters.league);

      include[5].include[0].include.required = true;
      include[5].include[0].include.where = {
        name: { [Op.like]: `%${filters.league}%` },
      };
      //}
      console.log(include[5].include[0].include);
    }

    if (filters.club) {
      console.log(filters.club);
      include[5].include.required = true;
      include[5].include.where = {
        name: { [Op.like]: `%${filters.club}%` },
      };
      console.log(include[5].include);
      //}
    }

    if (filters.tags) {
      const tagsIndex = include.findIndex((inc) => inc.as === "tags");
      if (tagsIndex !== -1) {
        include[tagsIndex].required = true;
        include[tagsIndex].where = {
          name: { [Op.like]: `%${filters.tags}%` },
        };
      }
    }

    if (filters.traits) {
      const traitsIndex = include.findIndex((inc) => inc.as === "traits");
      if (traitsIndex !== -1) {
        include[traitsIndex].required = true;
        include[traitsIndex].where = {
          name: { [Op.like]: `%${filters.traits}%` },
        };
      }
    }
    return {
      where,
      include,
    };
  }

  buildOrder(filters = {}) {
    let order = [["created_at", "DESC"]];

    if (filters.sortBy === "overall") {
      order = [
        [
          { model: PlayerStats, as: "stats" },
          "overall",
          filters.sortOrder || "DESC",
        ],
      ];
    } else if (filters.sortBy === "potential") {
      order = [
        [
          { model: PlayerStats, as: "stats" },
          "potential",
          filters.sortOrder || "DESC",
        ],
      ];
    } else if (filters.sortBy === "value") {
      order = [["value_eur", filters.sortOrder || "DESC"]];
    } else if (filters.sortBy === "age") {
      order = [["age", filters.sortOrder || "ASC"]];
    } else if (filters.sortBy === "fifa_version") {
      order = [["fifa_version", filters.sortOrder || "ASC"]];
    } else if (filters.sortBy === "name") {
      order = [["short_name", filters.sortOrder || "ASC"]];
    }

    return order;
  }

  getDefaultIncludes() {
    return [
      {
        model: NationalTeam,
        as: "nationalTeams",
        attributes: {
          exclude: ["created_at", "updated_at", "player_id", "nationality_id"],
        },
        include: [
          {
            model: Nationality,
            as: "nationality",
            attributes: { exclude: ["created_at", "updated_at"] },
          },
        ],
      },
      {
        model: Position,
        as: "positions",
        through: { attributes: [] },
        attributes: { exclude: ["created_at", "updated_at"] },
      },
      {
        model: Tag,
        as: "tags",
        through: { attributes: [] },
        attributes: { exclude: ["created_at", "updated_at"] },
      },
      {
        model: Trait,
        as: "traits",
        through: { attributes: [] },
        attributes: { exclude: ["created_at", "updated_at"] },
      },
      {
        model: PlayerStats,
        as: "stats",
        attributes: { exclude: ["created_at", "updated_at"] },
      },
      {
        model: ClubContract,
        as: "clubContracts",
        attributes: { exclude: ["created_at", "updated_at"] },
        include: [
          {
            model: Club,
            as: "club",
            attributes: { exclude: ["created_at", "updated_at"] },
            include: [
              {
                model: League,
                as: "league",
                attributes: { exclude: ["created_at", "updated_at"] },
              },
            ],
          },
        ],
      },
    ];
  }
}
