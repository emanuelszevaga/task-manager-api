const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
})

const initDB = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
        id         SERIAL PRIMARY KEY,
        email      VARCHAR(100) UNIQUE NOT NULL,
        password   VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS tasks (
        id          SERIAL PRIMARY KEY,
        user_id     INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title       VARCHAR(150) NOT NULL,
        description TEXT,
        status      VARCHAR(20) DEFAULT 'pending',
        created_at  TIMESTAMP DEFAULT NOW()
    );
    `)
    console.log('✅ Base de datos lista')
}

module.exports = { pool, initDB }