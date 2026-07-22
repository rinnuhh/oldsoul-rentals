-- ============================================================
--  OldSoul Rentals — MySQL Database Schema
--  Database: oldsoul
--  User: rinsha / rinsha
-- ============================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ── 1. admins ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `admins` (
  `id`         INT AUTO_INCREMENT PRIMARY KEY,
  `name`       VARCHAR(100) NOT NULL,
  `email`      VARCHAR(150) NOT NULL UNIQUE,
  `password`   VARCHAR(255) NOT NULL,
  `role`       VARCHAR(50)  NOT NULL DEFAULT 'Super Admin',
  `created_at` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── 2. hosts (vehicle owners) ────────────────────────────────
CREATE TABLE IF NOT EXISTS `hosts` (
  `id`               INT AUTO_INCREMENT PRIMARY KEY,
  `host_code`        VARCHAR(10)  NOT NULL UNIQUE,
  `name`             VARCHAR(100) NOT NULL,
  `email`            VARCHAR(150) NOT NULL UNIQUE,
  `password`         VARCHAR(255) NOT NULL,
  `phone`            VARCHAR(20),
  `location`         VARCHAR(100),
  `company_name`     VARCHAR(150),
  `avatar_initials`  VARCHAR(5)   DEFAULT 'H',
  `total_earnings`   DECIMAL(12,2) DEFAULT 0.00,
  `rating`           DECIMAL(3,2)  DEFAULT 5.00,
  `vehicles_count`   INT           DEFAULT 0,
  `status`           ENUM('active','suspended','pending') DEFAULT 'pending',
  `verified`         TINYINT(1)   DEFAULT 0,
  `joined_date`      DATE,
  `created_at`       TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── 3. users (customers) ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS `users` (
  `id`               INT AUTO_INCREMENT PRIMARY KEY,
  `user_code`        VARCHAR(10)  NOT NULL UNIQUE,
  `name`             VARCHAR(100) NOT NULL,
  `email`            VARCHAR(150) NOT NULL UNIQUE,
  `password`         VARCHAR(255) NOT NULL,
  `phone`            VARCHAR(20),
  `avatar_initials`  VARCHAR(5)   DEFAULT 'U',
  `total_bookings`   INT          DEFAULT 0,
  `total_spent`      DECIMAL(12,2) DEFAULT 0.00,
  `status`           ENUM('active','suspended','inactive') DEFAULT 'active',
  `last_active`      DATE,
  `joined_date`      DATE,
  `created_at`       TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── 4. show_vehicles (vintage / modern / modified) ───────────
CREATE TABLE IF NOT EXISTS `show_vehicles` (
  `id`             INT AUTO_INCREMENT PRIMARY KEY,
  `host_id`        INT          NOT NULL,
  `name`           VARCHAR(150) NOT NULL,
  `year`           YEAR         NOT NULL,
  `category`       VARCHAR(50)  NOT NULL,
  `category_label` VARCHAR(80)  NOT NULL,
  `location`       VARCHAR(100),
  `price_per_day`  DECIMAL(10,2) NOT NULL,
  `rating`         DECIMAL(3,2)  DEFAULT 5.00,
  `reviews_count`  INT           DEFAULT 0,
  `image_url`      TEXT,
  `owner_name`     VARCHAR(100),
  `verified`       TINYINT(1)    DEFAULT 0,
  `tags`           JSON,
  `available`      TINYINT(1)    DEFAULT 1,
  `created_at`     TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`host_id`) REFERENCES `hosts`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── 5. normal_vehicles (everyday rentals) ────────────────────
CREATE TABLE IF NOT EXISTS `normal_vehicles` (
  `id`            INT AUTO_INCREMENT PRIMARY KEY,
  `host_id`       INT          NOT NULL,
  `name`          VARCHAR(150) NOT NULL,
  `type`          VARCHAR(50)  NOT NULL,
  `seats`         INT          DEFAULT 5,
  `fuel`          VARCHAR(30),
  `transmission`  VARCHAR(50),
  `price_per_day` DECIMAL(10,2) NOT NULL,
  `price_per_km`  DECIMAL(6,2)  DEFAULT 0.00,
  `available`     TINYINT(1)    DEFAULT 1,
  `image_url`     TEXT,
  `features`      JSON,
  `location`      VARCHAR(100),
  `created_at`    TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`host_id`) REFERENCES `hosts`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── 6. bookings ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `bookings` (
  `id`             INT AUTO_INCREMENT PRIMARY KEY,
  `booking_code`   VARCHAR(15)  NOT NULL UNIQUE,
  `user_id`        INT          NOT NULL,
  `user_name`      VARCHAR(100),
  `host_id`        INT,
  `host_name`      VARCHAR(100),
  `vehicle_name`   VARCHAR(150) NOT NULL,
  `vehicle_type`   ENUM('show','normal') NOT NULL DEFAULT 'show',
  `start_date`     DATE,
  `end_date`       DATE,
  `days`           INT          DEFAULT 1,
  `amount`         DECIMAL(12,2) NOT NULL,
  `status`         ENUM('pending','confirmed','completed','cancelled') DEFAULT 'pending',
  `payment_status` ENUM('pending','paid','refunded') DEFAULT 'pending',
  `purpose`        VARCHAR(255),
  `created_at`     TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── 7. revenue_monthly ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS `revenue_monthly` (
  `id`              INT AUTO_INCREMENT PRIMARY KEY,
  `month_name`      VARCHAR(10) NOT NULL,
  `month_year`      INT         NOT NULL,
  `revenue`         DECIMAL(12,2) DEFAULT 0.00,
  `bookings_count`  INT           DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
