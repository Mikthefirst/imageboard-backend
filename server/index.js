const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
app.use(cors());

app.get('/api', (req, res) => {
    res.json({
        message: "lalala backend"
    });
})

app.post('/api', (req, res) => {
    console.log(req.body);
})
app.listen(port, () => {
    console.log('start listening on port ', port);
});

