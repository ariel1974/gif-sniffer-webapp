var http = require('http');
var express = require('express');
var app = express();
var fs = require('fs');
var fetch = require('node-fetch');

app.use('/images', express.static('images'));
app.use('/css', express.static('css'));
app.use('/favicons', express.static('favicons'));

app.get('/top_risky_repos', (req, res) => {

    fetch('http://localhost:8123/top_risky_repos')
        .then(function (data) {
            return data.json();
        }).then(function (json) {

            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(json, null, 3) );

    });
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(8080, () => console.log('Example app listening on port 8080!'));
