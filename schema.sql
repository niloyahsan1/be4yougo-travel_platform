-- Database Schema for Before You Go (be4yougo) MySQL Database


-- Users table (simulating auth.users)
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User roles table
CREATE TABLE IF NOT EXISTS user_roles (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_user_role (user_id, role),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Visitor signups table
CREATE TABLE IF NOT EXISTS visitor_signups (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  location VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Page views table
CREATE TABLE IF NOT EXISTS page_views (
  id VARCHAR(36) PRIMARY KEY,
  path VARCHAR(255) NOT NULL,
  destination_id VARCHAR(255) DEFAULT NULL,
  session_id VARCHAR(255) DEFAULT NULL,
  user_agent VARCHAR(255) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_page_views_created_at ON page_views (created_at DESC);
CREATE INDEX idx_page_views_destination ON page_views (destination_id);
