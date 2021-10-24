const express = require('express');
const port = process.env.PORT || 8003;

const app = express();

app.use(express.static(__dirname + "/dist/mega-able-ver/"));
app.get(/.*/, function(req, res){
    res.sendFile(__dirname + "/dist/mega-able-ver/index.html");
});

app.listen(port)