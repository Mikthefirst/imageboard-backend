const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.get('/api', (req, res) => {
    res.json({
        message: "lalala backend"
    });
})

app.listen(port, () => {
    console.log('start listening on port ', port);
});

