const pool = require('../pool')
const toCamelCase = require('./Utils/to-camel-case');

class UserRepo {
    static async find() {
        const result = await pool.query(`
            SELECT *
            FROM users;
        `);
        
        const rows = result.rows;
        return toCamelCase(rows);
    }

    static async findById(id) {
        const result = await pool.query(`
            SELECT *
            FROM users
            WHERE id = $1;
        `, [id]);
        
        const rows = result.rows;
        return toCamelCase(rows)[0];
    }

    static async insert(username, bio) {
        const result = await pool.query(`
            INSERT INTO users (username, bio)
            VALUES ($1, $2) RETURNING *;
        `, [username, bio]);
        
        const rows = result.rows;
        return toCamelCase(rows)[0];
    }

    static async update(id, username, bio) {
        const result = await pool.query(`
            UPDATE users
            SET username = $2, bio = $3
            WHERE id = $1 RETURNING *;
        `, [id, username, bio]);
        
        const rows = result.rows;
        return toCamelCase(rows)[0];
    }

    static async delete(id) {
        const result = await pool.query(`
            DELETE FROM users
            WHERE id = $1 RETURNING *;
        `, [id]);

        const rows = result.rows;
        return toCamelCase(rows)[0];
    }
}

module.exports = UserRepo;