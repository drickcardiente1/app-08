const express = require('express');
const client_template = express.Router();
const bodyParser = require('body-parser');
client_template.use(express.static(__dirname));
client_template.use(bodyParser.urlencoded({ extended: true }));
const fs = require("node:fs");
const http = require('http');

client_template.post('/client_layer', (req, res) => {
    res.setHeader("Content-Type", "text/html");
    var content = fs.readFileSync(__dirname + "/../pages/client_partials/layer.html", 'utf8');
    res.json(content);
    res.end();
});

client_template.post('/client_home', (req, res) => {
    res.setHeader("Content-Type", "text/html");
    var content = fs.readFileSync(__dirname + "/../pages/client_partials/home_content.html", 'utf8');
    res.json(content);
    res.end();
});
// are nako

client_template.post('/client_about', (req, res) => {
    res.setHeader("Content-Type", "text/html");
    var content = fs.readFileSync(__dirname + "/../pages/client_partials/about_content.html", 'utf8');
    res.json(content);
    res.end();
});

client_template.post('/client_brands', (req, res) => {
    res.setHeader("Content-Type", "text/html");
    var content = fs.readFileSync(__dirname + "/../pages/client_partials/brands_content.html", 'utf8');
    res.json(content);
    res.end();
});

client_template.post('/client_categories', (req, res) => {
    res.setHeader("Content-Type", "text/html");
    var content = fs.readFileSync(__dirname + "/../pages/client_partials/categories_content.html", 'utf8');
    res.json(content);
    res.end();
});

client_template.post('/client_login', (req, res) => {
    res.setHeader("Content-Type", "text/html");
    var content = fs.readFileSync(__dirname + "/../pages/client_partials/log-in.html", 'utf8');
    res.json(content);
    res.end();
});

client_template.post('/client_msg', (req, res) => {
    res.setHeader("Content-Type", "text/html");
    var content = fs.readFileSync(__dirname + "/../pages/client_partials/msg.html", 'utf8');
    res.json(content);
    res.end();
});

client_template.post('/client_bookings', (req, res) => {
    res.setHeader("Content-Type", "text/html");
    var content = fs.readFileSync(__dirname + "/../pages/client_partials/my_bookings.html", 'utf8');
    res.json(content);
    res.end();
});

client_template.post('/client_product', (req, res) => {
    res.setHeader("Content-Type", "text/html");
    var content = fs.readFileSync(__dirname + "/../pages/client_partials/product.html", 'utf8');
    res.json(content);
    res.end();
});

client_template.post('/client_profile', (req, res) => {
    res.setHeader("Content-Type", "text/html");
    var content = fs.readFileSync(__dirname + "/../pages/client_partials/profile.html", 'utf8');
    res.json(content);
    res.end();
});

client_template.post('/client_signup', (req, res) => {
    res.setHeader("Content-Type", "text/html");
    var content = fs.readFileSync(__dirname + "/../pages/client_partials/sign-up.html", 'utf8');
    res.json(content);
    res.end();
});





module.exports = client_template;