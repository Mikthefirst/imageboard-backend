const db = require('./db');
const thread_limit = 10;

class DB_Thread_Operations{
    async get_threads(num) {
        const result = await db.query(`SELECT * from threads WHERE thread_id BETWEEN ${num + 1} AND ${num + thread_limit - 1}`);
        const rows = result.rows;
        return rows.map(row => ({
            id: row.thread_id,
            name: row.thread_name,
            desc: row.description,
            img: row.img,
            time:row.time
        }));
    }
    async add_thread(thread, img_name) {
        try {
            const row = await db.query('SELECT COUNT(*) FROM threads');
            const id = result.rows[0]['count']+1;
              await db.query(`INSERT INTO threads (id, name, description, img, time) VALUES (${id}, '${thread.name}', '${thread.comment}', '${img_name}', CURRENT_TIMESTAMP)`);
        
            await db.query(`CREATE TABLE ${thread.id}`);
        }
        catch (err) {
            console.log(err.stack);
        }
    }
    async delete_thread(id) {
        try {
            await db.query(`DROP TABLE table_${id}`);
            await db.query(`DELETE FROM threads WHERE id=${id}`);
        }   
         catch (err) {
            console.log(err.stack);
        }
    }
}

module.exports = new DB_Thread_Operations();