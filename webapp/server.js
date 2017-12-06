var http = require('http');
var express = require('express');
var app = express();
var fs = require('fs');
var fetch = require('node-fetch');

let api_host = process.env.GIT_API_HOST;
let api_port = process.env.GIT_API_PORT;

app.use('/images', express.static('images'));
app.use('/css', express.static('css'));
app.use('/favicons', express.static('favicons'));

app.get('/top_risky_repos', (req, res) => {

    fetch(`http://${api_host}:${api_port}/top_risky_repos`)
        .then(function (data) {
            return data.json();
        }).then(function (json) {

            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(json, null, 3) );

    });
});

app.get('/over_time', (req, res) => {

    fetch(`http://${api_host}:${api_port}/vulnerabilities_over_time`)
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
