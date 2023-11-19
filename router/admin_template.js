const express = require('express');
const admin_template = express.Router();
const bodyParser = require('body-parser');
admin_template.use(express.static(__dirname));
admin_template.use(bodyParser.urlencoded({ extended: true }));
const fs = require("node:fs");
const http = require('http');

admin_template.post('/add_bike', (req, res) => {
    res.setHeader("Content-Type", "text/html");
    var content = fs.readFileSync(__dirname + "/../pages/partials/add_bike.html", 'utf8');
    res.json(content);
    res.end();
});

admin_template.post('/bike_list', (req, res) => {
    res.setHeader("Content-Type", "text/html");
    var content = fs.readFileSync(__dirname + "/../pages/partials/bike_list.html", 'utf8');
    res.json(content);
    res.end();
});

admin_template.post('/booking_list', (req, res) => {
    res.setHeader("Content-Type", "text/html");
    var content = fs.readFileSync(__dirname + "/../pages/partials/booking_list.html", 'utf8');
    res.json(content);
    res.end();
});

admin_template.post('/booking_report', (req, res) => {
    res.setHeader("Content-Type", "text/html");
    var content = fs.readFileSync(__dirname + "/../pages/partials/booking_report.html", 'utf8');
    res.json(content);
    res.end();
});

admin_template.post('/brand_list', (req, res) => {
    res.setHeader("Content-Type", "text/html");
    var content = fs.readFileSync(__dirname + "/../pages/partials/brand_list.html", 'utf8');
    res.json(content);
    res.end();
});

admin_template.post('/category_list', (req, res) => {
    res.setHeader("Content-Type", "text/html");
    var content = fs.readFileSync(__dirname + "/../pages/partials/category_list.html", 'utf8');
    res.json(content);
    res.end();
});

admin_template.post('/client_list', (req, res) => {
    res.setHeader("Content-Type", "text/html");
    var content = fs.readFileSync(__dirname + "/../pages/partials/client_list.html", 'utf8');
    res.json(content);
    res.end();
});

admin_template.post('/client_profile', (req, res) => {
    res.setHeader("Content-Type", "text/html");
    var content = fs.readFileSync(__dirname + "/../pages/partials/client_profile.html", 'utf8');
    res.json(content);
    res.end();
});

admin_template.post('/dashboard', (req, res) => {
    res.setHeader("Content-Type", "text/html");
    var content = fs.readFileSync(__dirname + "/../pages/partials/dashboard.html", 'utf8');
    res.json(content);
    res.end();
});

admin_template.post('/layer-index', (req, res) => {
    res.setHeader("Content-Type", "text/html");
    var content = fs.readFileSync(__dirname + "/../pages/partials/layer-index.html", 'utf8');
    res.json(content);
    res.end();
});

admin_template.post('/layer-s-in', (req, res) => {
    res.setHeader("Content-Type", "text/html");
    var content = fs.readFileSync(__dirname + "/../pages/partials/layer-s-in.html", 'utf8');
    res.json(content);
    res.end();
});

admin_template.post('/profile', (req, res) => {
    res.setHeader("Content-Type", "text/html");
    var content = fs.readFileSync(__dirname + "/../pages/partials/profile.html", 'utf8');
    res.json(content);
    res.end();
});


module.exports = admin_template;