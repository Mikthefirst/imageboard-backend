require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
app.use(cors(
    {
        origin:'http://localhost:3000/'
    }
));
const DB_Thread = require('./thread_operations');
const DB_Post = require('./post_operations');

app.get('/api/threads/:number', async (req, res) => {
    let page_num = req.params.number || 0;
    res.json(await DB_Thread.get_threads(page_num));
})

app.get('/api/post/:id', async (req, res) => {
    console.log(req.url);
    res.json(await DB_Post.get_posts(req.params.id))
});

app.post('/api/add-thread', async (req, res) => {
    console.log('this thread info: ' + req.body);
    await DB_Thread.add_thread(req.body);
})

app.post('/api/post/:id', async (req, res) => {
    await DB_Post.add_post(req.body.post, req.body.id);
})

app.listen(port, () => {
    console.log('start listening on port ', port);
});

