-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS fifa_database;
USE fifa_database;

-- Tabla: users
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    gmail VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla: players
CREATE TABLE IF NOT EXISTS players (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fifa_version INT NOT NULL,
    short_name VARCHAR(255) NOT NULL,
    long_name VARCHAR(255) NOT NULL,
    age INT,
    dob DATE,
    height_cm INT,
    weight_kg INT,
    preferred_foot ENUM('Left', 'Right'),
    skill_moves INT,
    international_reputation INT, 
    work_rate VARCHAR(50),
    body_type VARCHAR(100),
    player_url TEXT,
    player_face_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla: leagues
CREATE TABLE IF NOT EXISTS leagues (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla: clubs
CREATE TABLE IF NOT EXISTS clubs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    league_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (league_id) REFERENCES leagues(id) ON DELETE SET NULL
);

-- Tabla: nationalities
CREATE TABLE IF NOT EXISTS nationalities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla: club_contracts
CREATE TABLE IF NOT EXISTS club_contracts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_id INT NOT NULL,
    club_id INT NOT NULL,
    level INT,
    position VARCHAR(50),
    jersey_number INT,
    wage_eur DECIMAL(15,2),
    value_eur DECIMAL(15,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE,
    FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE CASCADE
);

-- Tabla: national_teams
CREATE TABLE IF NOT EXISTS national_teams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_id INT NOT NULL,
    nationality_id INT NOT NULL,
    position VARCHAR(50),
    jersey_number INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE,
    FOREIGN KEY (nationality_id) REFERENCES nationalities(id) ON DELETE CASCADE
);

-- Tabla: player_stats
CREATE TABLE IF NOT EXISTS player_stats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_id INT NOT NULL,
    overall INT CHECK (overall BETWEEN 0 AND 99),
    potential INT CHECK (potential BETWEEN 0 AND 99),
    pace INT CHECK (pace BETWEEN 0 AND 99),
    shooting INT CHECK (shooting BETWEEN 0 AND 99),
    passing INT CHECK (passing BETWEEN 0 AND 99),
    dribbling INT CHECK (dribbling BETWEEN 0 AND 99),
    defending INT CHECK (defending BETWEEN 0 AND 99),
    physic INT CHECK (physic BETWEEN 0 AND 99),
    attacking_crossing INT CHECK (attacking_crossing BETWEEN 0 AND 99),
    attacking_finishing INT CHECK (attacking_finishing BETWEEN 0 AND 99),
    attacking_heading_accuracy INT CHECK (attacking_heading_accuracy BETWEEN 0 AND 99),
    attacking_short_passing INT CHECK (attacking_short_passing BETWEEN 0 AND 99),
    skill_dribbling INT CHECK (skill_dribbling BETWEEN 0 AND 99),
    skill_fk_accuracy INT CHECK (skill_fk_accuracy BETWEEN 0 AND 99),
    skill_long_passing INT CHECK (skill_long_passing BETWEEN 0 AND 99),
    skill_ball_control INT CHECK (skill_ball_control BETWEEN 0 AND 99),
    movement_acceleration INT CHECK (movement_acceleration BETWEEN 0 AND 99),
    movement_sprint_speed INT CHECK (movement_sprint_speed BETWEEN 0 AND 99),
    movement_agility INT CHECK (movement_agility BETWEEN 0 AND 99),
    movement_reactions INT CHECK (movement_reactions BETWEEN 0 AND 99),
    power_shot_power INT CHECK (power_shot_power BETWEEN 0 AND 99),
    power_jumping INT CHECK (power_jumping BETWEEN 0 AND 99),
    power_stamina INT CHECK (power_stamina BETWEEN 0 AND 99),
    power_strength INT CHECK (power_strength BETWEEN 0 AND 99),
    power_long_shots INT CHECK (power_long_shots BETWEEN 0 AND 99),
    mentality_aggression INT CHECK (mentality_aggression BETWEEN 0 AND 99),
    mentality_vision INT CHECK (mentality_vision BETWEEN 0 AND 99),
    mentality_composure INT CHECK (mentality_composure BETWEEN 0 AND 99),
    defending_marking_awareness INT CHECK (defending_marking_awareness BETWEEN 0 AND 99),
    defending_standing_tackle INT CHECK (defending_standing_tackle BETWEEN 0 AND 99),
    defending_sliding_tackle INT CHECK (defending_sliding_tackle BETWEEN 0 AND 99),
    goalkeeping_diving INT CHECK (goalkeeping_diving BETWEEN 0 AND 99),
    goalkeeping_handling INT CHECK (goalkeeping_handling BETWEEN 0 AND 99),
    goalkeeping_kicking INT CHECK (goalkeeping_kicking BETWEEN 0 AND 99),
    goalkeeping_positioning INT CHECK (goalkeeping_positioning BETWEEN 0 AND 99),
    goalkeeping_reflexes INT CHECK (goalkeeping_reflexes BETWEEN 0 AND 99),
    goalkeeping_speed INT CHECK (goalkeeping_speed BETWEEN 0 AND 99),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE,
    UNIQUE KEY unique_player_stats (player_id)
);

-- Tabla: tags
CREATE TABLE IF NOT EXISTS tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla: traits
CREATE TABLE IF NOT EXISTS traits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla: positions
CREATE TABLE IF NOT EXISTS positions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
);

-- TABLAS INTERMEDIAS PARA RELACIONES MANY-TO-MANY

-- Tabla: player_tags (Relación Many-to-Many entre players y tags)
CREATE TABLE IF NOT EXISTS player_tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_id INT NOT NULL,
    tag_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE,
    UNIQUE KEY unique_player_tag (player_id, tag_id)
);

-- Tabla: player_traits (Relación Many-to-Many entre players y traits)
CREATE TABLE IF NOT EXISTS player_traits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_id INT NOT NULL,
    trait_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE,
    FOREIGN KEY (trait_id) REFERENCES traits(id) ON DELETE CASCADE,
    UNIQUE KEY unique_player_trait (player_id, trait_id)
);
