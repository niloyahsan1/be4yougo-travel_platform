import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const PORT = process.env.PORT || 3001;
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = Number(process.env.DB_PORT) || 3306;
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_NAME = process.env.DB_NAME || 'be4yougo';
const JWT_SECRET = process.env.JWT_SECRET || 'be4yougo_development_jwt_secret_key_998877';
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'hellosajid07@gmail.com').toLowerCase().trim();

// Initialize express app
const app = express();
app.use(cors());
app.use(express.json());

// Whitelists and safety definitions
const ALLOWED_TABLES = ['page_views', 'visitor_signups', 'user_roles'];
const SAFE_COLUMNS = {
  page_views: ['id', 'path', 'destination_id', 'session_id', 'user_agent', 'created_at'],
  visitor_signups: ['id', 'name', 'phone', 'location', 'created_at'],
  user_roles: ['id', 'user_id', 'role', 'created_at']
};

function isValidColumn(table, col) {
  return SAFE_COLUMNS[table] && SAFE_COLUMNS[table].includes(col);
}

let pool;

// Function to auto-create tables if they don't exist
async function initDatabaseAndPool() {
  try {
    // Connect directly to the configured database pool
    pool = mysql.createPool({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    console.log(`Connecting to MySQL on ${DB_HOST}:${DB_PORT} as ${DB_USER}...`);

    // 3. Initialize tables
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_roles (
        id VARCHAR(36) PRIMARY KEY,
        user_id VARCHAR(36) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY unique_user_role (user_id, role),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS visitor_signups (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        location VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS page_views (
        id VARCHAR(36) PRIMARY KEY,
        path VARCHAR(255) NOT NULL,
        destination_id VARCHAR(255) DEFAULT NULL,
        session_id VARCHAR(255) DEFAULT NULL,
        user_agent VARCHAR(255) DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Add indexes. Catch duplicate errors gracefully.
    try {
      await pool.query(`ALTER TABLE page_views ADD INDEX idx_page_views_created_at (created_at DESC)`);
    } catch (e) {
      if (!e.message.includes('Duplicate key')) console.log('Index note:', e.message);
    }

    try {
      await pool.query(`ALTER TABLE page_views ADD INDEX idx_page_views_destination (destination_id)`);
    } catch (e) {
      if (!e.message.includes('Duplicate key')) console.log('Index note:', e.message);
    }

    console.log('Database tables successfully initialized.');
  } catch (err) {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  }
}

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access token required' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = user;
    next();
  });
}

// Authentication Routes
app.post('/api/auth/signup', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const userId = crypto.randomUUID();
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    await pool.query('INSERT INTO users (id, email, password) VALUES (?, ?, ?)', [userId, email, hashedPassword]);

    // Assign role (auto-admin for configured ADMIN_EMAIL, user for others)
    const role = email.toLowerCase().trim() === ADMIN_EMAIL ? 'admin' : 'user';
    const roleId = crypto.randomUUID();
    await pool.query('INSERT INTO user_roles (id, user_id, role) VALUES (?, ?, ?)', [roleId, userId, role]);

    const token = jwt.sign(
      { id: userId, email: email, role: role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const session = {
      user: { id: userId, email: email },
      access_token: token,
      expires_in: 604800,
    };

    return res.json({ token, session });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ error: 'Failed to create user' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const user = users[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const [roles] = await pool.query('SELECT role FROM user_roles WHERE user_id = ?', [user.id]);
    const role = roles[0]?.role || 'user';

    const token = jwt.sign(
      { id: user.id, email: user.email, role: role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const session = {
      user: { id: user.id, email: user.email },
      access_token: token,
      expires_in: 604800,
    };

    return res.json({ token, session });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Authentication failed' });
  }
});

app.get('/api/auth/session', authenticateToken, async (req, res) => {
  try {
    const token = req.headers['authorization'].split(' ')[1];
    const session = {
      user: { id: req.user.id, email: req.user.email },
      access_token: token,
      expires_in: 604800,
    };
    return res.json({ session });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to verify session' });
  }
});

// Dynamic Query compiler endpoints mapping to MySQL
app.post('/api/query', async (req, res) => {
  const { action, table, data, selects, filters, orderCol, orderAsc, limitCount, countOption, isHead } = req.body;

  if (!ALLOWED_TABLES.includes(table)) {
    return res.status(400).json({ error: `Unauthorized table access: ${table}` });
  }

  try {
    if (action === 'insert') {
      if (!data.id) {
        data.id = crypto.randomUUID();
      }

      const columns = Object.keys(data);
      for (const col of columns) {
        if (!isValidColumn(table, col)) {
          return res.status(400).json({ error: `Invalid column: ${col}` });
        }
      }

      const values = Object.values(data);
      const placeholders = columns.map(() => '?').join(', ');
      
      const sql = `INSERT INTO \`${table}\` (${columns.map(c => `\`${c}\``).join(', ')}) VALUES (${placeholders})`;
      await pool.query(sql, values);

      return res.json({ data: [data], error: null });
    }

    if (action === 'select') {
      let selectClause = '*';
      if (isHead || countOption) {
        selectClause = 'COUNT(*) as countVal';
      } else if (selects && selects !== '*') {
        const cols = selects.split(',').map(s => s.trim()).filter(Boolean);
        for (const col of cols) {
          if (!isValidColumn(table, col)) {
            return res.status(400).json({ error: `Invalid select column: ${col}` });
          }
        }
        selectClause = cols.map(c => `\`${c}\``).join(', ');
      }

      let sql = `SELECT ${selectClause} FROM \`${table}\``;
      const queryParams = [];
      const whereClauses = [];

      if (filters && filters.length > 0) {
        for (const filter of filters) {
          const { type, column, value, operator } = filter;
          if (!isValidColumn(table, column)) {
            return res.status(400).json({ error: `Invalid filter column: ${column}` });
          }

          const colEscaped = `\`${column}\``;

          if (type === 'eq') {
            whereClauses.push(`${colEscaped} = ?`);
            queryParams.push(value);
          } else if (type === 'gte') {
            whereClauses.push(`${colEscaped} >= ?`);
            queryParams.push(value);
          } else if (type === 'like') {
            whereClauses.push(`${colEscaped} LIKE ?`);
            queryParams.push(value);
          } else if (type === 'not') {
            if (operator === 'is' && value === null) {
              whereClauses.push(`${colEscaped} IS NOT NULL`);
            } else {
              whereClauses.push(`${colEscaped} != ?`);
              queryParams.push(value);
            }
          }
        }
      }

      if (whereClauses.length > 0) {
        sql += ` WHERE ${whereClauses.join(' AND ')}`;
      }

      if (orderCol) {
        if (!isValidColumn(table, orderCol)) {
          return res.status(400).json({ error: `Invalid order column: ${orderCol}` });
        }
        sql += ` ORDER BY \`${orderCol}\` ${orderAsc ? 'ASC' : 'DESC'}`;
      }

      if (limitCount !== null && limitCount !== undefined) {
        sql += ` LIMIT ?`;
        queryParams.push(Number(limitCount));
      }

      const [rows] = await pool.query(sql, queryParams);

      if (isHead || countOption) {
        const count = rows[0]?.countVal || 0;
        return res.json({ data: null, count: count, error: null });
      }

      return res.json({ data: rows, count: null, error: null });
    }

    return res.status(400).json({ error: `Unknown query action: ${action}` });
  } catch (err) {
    console.error('Database query error:', err);
    return res.status(500).json({ error: err.message || 'Database error' });
  }
});

// Serve static frontend in production if dist directory exists
const distPath = path.resolve(__dirname, '../dist');
app.use(express.static(distPath));

// Fallback to index.html for React client-side routing
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) next();
  });
});

// Start Express server
initDatabaseAndPool().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
