const db = require('./db');

class DB_Post_Operations {
     async add_post(post_info, thread_id, img_name) {
        const result = await db.query(`SELECT COUNT(*) FROM table_${thread_id}`);
        const id = result.rows[0]['count']+ 1;
        try {
            db.query(`CREATE TABLE IF NOT EXISTS table_1 (
                id INTEGER NOT NULL PRIMARY KEY,
                name TEXT NOT NULL,
                description TEXT NOT NULL,
                img TEXT,
                time TIMESTAMP WITHOUT TIME ZONE NOT NULL
            `);
            await db.query(`INSERT INTO table_${thread_id} (id, name, description, img, time) VALUES (${id}, '${post_info.name}', '${post_info.comment}', '${img_name}', CURRENT_TIMESTAMP)`);
        }
        catch (err) {
            console.error(err);
        }
    }

    async get_posts(thread_id) {
        const res=(await db.query(`SELECT * FROM table_${thread_id}`)).rows.map(row => ({
            id: row.id,
            name: row.name,
            desc: row.description,
            img: row.img,
            time: row.time
        }));
        return res;
    }
}

module.exports = new DB_Post_Operations();