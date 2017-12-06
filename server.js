var http = require('http');
var express = require('express');
var app = express();
var fs = require('fs');

app.use('/images', express.static('images'));
app.use('/css', express.static('css'));
app.use('/favicons', express.static('favicons'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(8080, () => console.log('Example app listening on port 8080!'));
