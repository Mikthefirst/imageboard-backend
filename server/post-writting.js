require('dotenv').config();
const Pool = require('pg').Pool;
const db = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_BASE
});
const limit = 10;

class DB_Thread_Operations{
    async get_threads(num) {
        const result = await db.query(`SELECT * from threads WHERE thread_id BETWEEN ${num + 1} AND ${num + limit - 1}`);
        const rows = result.rows;
        return rows.map(row => ({
            id: row.thread_id,
            name: row.thread_name,
            desc: row.description,
            img: row.img,
            time:row.time
        }));
    }
    async write_thread(thread) {
        return await db.query(`INSERT INTO your_table (Name, id, description, img, time) VALUES 
            ('Thread4', 4, 'This is the fourth thread', 'img4.jpg', CURRENT_TIMESTAMP)`);
    }
}

module.exports = new DB_Thread_Operations();