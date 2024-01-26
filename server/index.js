require('dotenv').config();
const express = require('express');
const multer = require('multer');
const path=require('path')
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
app.use(cors());
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname+'\\..\\..\\frontend\\public\\img\\')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
})
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/img'];
    if (allowedTypes.includes(file.mimetype))
        cb(null, true);
    else
        cb(null, false);
};
const upload = multer({ storage, fileFilter })

const DB_Thread = require('./thread_operations');
const DB_Post = require('./post_operations');

app.get('/api/threads/:number', async (req, res) => {
    let page_num = req.params.number || 0;
    res.json(await DB_Thread.get_threads(page_num));
});

app.get('/api/post/:id', async (req, res) => {
    try {
        let id = req.params.id || 0;
        let db_res = {};
        if (id != 0) {
             db_res = await DB_Post.get_posts(id);
        }
        res.json(db_res);
    } catch (error) {
        console.log(error);
    }
});

app.post('/api/add-thread', upload.single('file'), async (req, res) => {
    await DB_Thread.add_thread(req.body, req.file.filename);
});

app.post('/api/add-post/:id', upload.single('file'), async (req, res) => {
    await DB_Post.add_post(req.body, req.params.id, req.file.filename);
});

app.listen(port, () => {
    console.log('start listening on port ', port);
});

