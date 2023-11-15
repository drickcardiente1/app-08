const express = require('express');
const fs = require("node:fs");
const router = express.Router();
router.use(express.static(__dirname));

// page router

router.get('/', async (req, res) => {
    if (!req.session.is_admin) {
        res.redirect('/admin/sign-in/');
        res.end();
    }
    else {
        res.writeHead(200, { "Content-Type": "text/html" });
        const html = fs.readFileSync(__dirname + "../../pages/admin/index.html", "utf-8");
        res.end(html);
    }
})

router.get('/sign-in/', async (req, res) => {
    if (req.session.is_admin) {
        res.redirect('/admin/');
        res.end();
    } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        const html = fs.readFileSync(__dirname + "../../pages/admin/index.html", "utf-8");
        res.end(html);
    }
})

router.get('/profile', async (req, res) => {
    if (!req.session.is_admin) {
        res.redirect('/admin/sign-in/');
        res.end();
    }
    else {
        res.writeHead(200, { "Content-Type": "text/html" });
        const html = fs.readFileSync(__dirname + "../../pages/admin/index.html", "utf-8");
        res.end(html);
    }
})

router.get('/Motorbikes', async (req, res) => {
    if (!req.session.is_admin) {
        res.redirect('/admin/sign-in/');
        res.end();
    }
    else {
        res.writeHead(200, { "Content-Type": "text/html" });
        const html = fs.readFileSync(__dirname + "../../pages/admin/index.html", "utf-8");
        res.end(html);
    }
})

router.get('/Motorbikes/add', async (req, res) => {
    if (!req.session.is_admin) {
        res.redirect('/admin/sign-in/');
        res.end();
    }
    else {
        res.writeHead(200, { "Content-Type": "text/html" });
        const html = fs.readFileSync(__dirname + "../../pages/admin/index.html", "utf-8");
        res.end(html);
    }
})

router.get('/bookinglist/', async (req, res) => {
    if (!req.session.is_admin) {
        res.redirect('/admin/sign-in/');
        res.end();
    }
    else {
        res.writeHead(200, { "Content-Type": "text/html" });
        const html = fs.readFileSync(__dirname + "../../pages/admin/index.html", "utf-8");
        res.end(html);
    }
})

router.get('/bookingreports', async (req, res) => {
    if (!req.session.is_admin) {
        res.redirect('/admin/sign-in');
        res.end();
    }
    else {
        res.writeHead(200, { "Content-Type": "text/html" });
        const html = fs.readFileSync(__dirname + "../../pages/admin/index.html", "utf-8");
        res.end(html);
    }
})

router.get('/clients', async (req, res) => {
    if (!req.session.is_admin) {
        res.redirect('/admin/sign-in');
        res.end();
    }
    else {
        res.writeHead(200, { "Content-Type": "text/html" });
        const html = fs.readFileSync(__dirname + "../../pages/admin/index.html", "utf-8");
        res.end(html);
    }
})

router.get('/clients/:id', async (req, res) => {
    if (!req.session.is_admin) {
        res.redirect('/admin/sign-in');
        res.end();
    }
    else {
        res.writeHead(200, { "Content-Type": "text/html" });
        const html = fs.readFileSync(__dirname + "../../pages/admin/index.html", "utf-8");
        res.end(html);
    }
})

router.get('/brandlist', async (req, res) => {
    if (!req.session.is_admin) {
        res.redirect('/admin/sign-in');
        res.end();
    }
    else {
        res.writeHead(200, { "Content-Type": "text/html" });
        const html = fs.readFileSync(__dirname + "../../pages/admin/index.html", "utf-8");
        res.end(html);
    }
})

router.get('/brandlist/add', async (req, res) => {
    if (!req.session.is_admin) {
        res.redirect('/admin/sign-in/');
        res.end();
    }
    else {
        res.writeHead(200, { "Content-Type": "text/html" });
        const html = fs.readFileSync(__dirname + "../../pages/admin/index.html", "utf-8");
        res.end(html);
    }
})


router.get('/categorylist', async (req, res) => {
    if (!req.session.is_admin) {
        res.redirect('/admin/sign-in');
        res.end();
    }
    else {
        res.writeHead(200, { "Content-Type": "text/html" });
        const html = fs.readFileSync(__dirname + "../../pages/admin/index.html", "utf-8");
        res.end(html);
    }
})


module.exports = router;