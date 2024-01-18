const db = require('./db');

class DB_Post_Operations {
    async add_post(post_info, thread_id) {
        await db.query(`INSERT INTO ${thread_id} VALUES(
            
        )`)
    }
    async get_posts(thread_id) {
        return (await db.query(`SELECT * FROM table_${thread_id}`)).rows.map(row => ({
            id: row.id,
            name: row.name,
            desc: row.description,
            img: row.img,
            time:row.time
        }));
    }
}

module.exports = new DB_Post_Operations();