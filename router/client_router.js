const express = require('express');
const client_router = express.Router();
const bodyParser = require('body-parser');
client_router.use(express.static(__dirname));
client_router.use(bodyParser.urlencoded({ extended: true }));
const fs = require("node:fs");
const http = require('http');



client_router.get('/', (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    const html = fs.readFileSync(__dirname + "/../pages/client/index.html", "utf-8");
    res.end(html);
});

client_router.get('/Sign-in', (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    const html = fs.readFileSync(__dirname + "/../pages/client/index.html", "utf-8");
    res.end(html);
});

client_router.get('/Sign-up', (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    const html = fs.readFileSync(__dirname + "/../pages/client/index.html", "utf-8");
    res.end(html);
});

client_router.get('/categories', (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    const html = fs.readFileSync(__dirname + "/../pages/client/index.html", "utf-8");
    res.end(html);
});

client_router.get('/brands', (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    const html = fs.readFileSync(__dirname + "/../pages/client/index.html", "utf-8");
    res.end(html);
});

client_router.get('/about', (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    const html = fs.readFileSync(__dirname + "/../pages/client/index.html", "utf-8");
    res.end(html);
});

client_router.get('/product/:id', async (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    const html = fs.readFileSync(__dirname + "/../pages/client/index.html", "utf-8");
    res.end(html);
})

client_router.get('/book/:id', async (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    const html = fs.readFileSync(__dirname + "/../pages/client/index.html", "utf-8");
    res.end(html);
})

client_router.get('/profile', (req, res) => {
    if (!req.session.is_client) {
        res.status(404);
        res.send('Cannot GET /profile');
        res.end();
    }
    else {
        res.writeHead(200, { "Content-Type": "text/html" });
        const html = fs.readFileSync(__dirname + "/../pages/client/index.html", "utf-8");
        res.end(html);
    }
});

client_router.get('/my-bookings', (req, res) => {
    if (!req.session.is_client) {
        res.status(404);
        res.send('Cannot GET /profile');
        res.end();
    }
    else {
        res.writeHead(200, { "Content-Type": "text/html" });
        const html = fs.readFileSync(__dirname + "/../pages/client/index.html", "utf-8");
        res.end(html);
    }
});

module.exports = client_router;