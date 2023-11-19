const express = require('express');
const client_router = express.Router();
const bodyParser = require('body-parser');
client_router.use(express.static(__dirname));
client_router.use(bodyParser.urlencoded({ extended: true }));
const fs = require("node:fs");
const http = require('http');

client_router.post('/client-layer', (req, res) => {
    res.setHeader("Content-Type", "text/html");
    var content = fs.readFileSync(__dirname + "/../pages/client_partials/layer.html", 'utf8');
    res.json({content:content});
    res.end();
});

client_router.post('/client-home', (req, res) => {
    res.setHeader("Content-Type", "text/html");
    var content = fs.readFileSync(__dirname + "/../pages/client_partials/home_content.html", 'utf8');
    res.json({content:content});
    res.end();
});

module.exports = client_router;