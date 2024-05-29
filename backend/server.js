const express = require('express')
const app = express()

app.listen(3000, () => {
    console.log('server run');
})

app.get('/', (req, res) => {
    res.send("Hello from node API")
});