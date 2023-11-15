const express = require('express');
const client_partials = express.Router();
const bodyParser = require('body-parser');
client_partials.use(express.static(__dirname));
client_partials.use(bodyParser.urlencoded({ extended: true }));
const fs = require("node:fs");

client_partials.post('/layer', (req, res) => {
    var html = fs.readFileSync(__dirname + "../../../pages/client_partials/layer.html", "utf-8");
    res.json({template: html});
    res.end();
});

client_partials.post('/home_content', (req, res) => {
    var html = fs.readFileSync(__dirname + "../../../pages/client_partials/home_content.html", "utf-8");
    res.json({template: html});
    res.end();
});

client_partials.post('/about_content', (req, res) => {
    var html = fs.readFileSync(__dirname + "../../../pages/client_partials/about_content.html", "utf-8");
    res.json({template: html});
    res.end();
});

client_partials.post('/brand_content', (req, res) => {
    var html = fs.readFileSync(__dirname + "../../../pages/client_partials/brands_content.html", "utf-8");
    res.json({template: html});
    res.end();
});

client_partials.post('/categories_content', (req, res) => {
    var html = fs.readFileSync(__dirname + "../../../pages/client_partials/categories_content.html", "utf-8");
    res.json({template: html});
    res.end();
});

client_partials.post('/log-in', (req, res) => {
    var html = fs.readFileSync(__dirname + "../../../pages/client_partials/log-in.html", "utf-8");
    res.json({template: html});
    res.end();
});

client_partials.post('/msg', (req, res) => {
    var html = fs.readFileSync(__dirname + "../../../pages/client_partials/msg.html", "utf-8");
    res.json({template: html});
    res.end();
});

client_partials.post('/my-bookings', (req, res) => {
    var html = fs.readFileSync(__dirname + "../../../pages/client_partials/my_bookings.html", "utf-8");
    res.json({template: html});
    res.end();
});

client_partials.post('/product', (req, res) => {
    var html = fs.readFileSync(__dirname + "../../../pages/client_partials/product.html", "utf-8");
    res.json({template: html});
    res.end();
});

client_partials.post('/profile', (req, res) => {
    var html = fs.readFileSync(__dirname + "../../../pages/client_partials/profile.html", "utf-8");
    res.json({template: html});
    res.end();
});

client_partials.post('/sign-up', (req, res) => {
    var html = fs.readFileSync(__dirname + "../../../pages/client_partials/sign-up.html", "utf-8");
    res.json({template: html});
    res.end();
});



module.exports = client_partials;