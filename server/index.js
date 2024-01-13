require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
app.use(cors({
    origin: 'http//localhost:3000'
}));
const DB_Thread = require('./post-writting');

app.get('/api/threads/:number', async (req, res) => {
    let page_num = req.params.number || 0;
    res.json(await DB_Thread.get_threads(page_num));
})

app.post('/api/thread', (req, res) => {
    console.log('this thread info: '+req.body);
})
app.post('/api/post', (req, res) => {
    console.log('this post info: '+req.body);
})



app.listen(port, () => {
    console.log('start listening on port ', port);
});

