const express = require('express');
const fs = require("node:fs");
const queries = express.Router();
queries.use(express.static(__dirname));
const db = require('../db');
var md5 = require('md5');

var cloudinary = require('../middleware/cloudinary')
var upload = require('../middleware/multer')

var this_date = new Date()
var day = String(this_date.getDate()).padStart(2, '0');
var m = String(this_date.getMonth() + 1).padStart(2, '0');
var year = this_date.getFullYear();
const today = `${year}-${m}-${day}`;


// semi-api-router
queries.post('/active_user', (req, res) => {
    if (!req.session.is_admin) {
        res.json({status:404});
        res.end();
    }
    else {
        qry = `SELECT * FROM users WHERE id='${req.session.user_id}';`;
        db.query(qry, function (error, data) {
            if (error) res.send(error);
            res.json({status:202, raw:data});
            res.end();
        });
    }
});

queries.get('/logout',  function (req, res)  {
    req.session.is_admin = false;
    req.session.is_client= false;
    req.session.logged_in = false;
    req.session.user_id = '';
    req.session.uname = '';
    res.json({status:202});
    res.end();
    // if (!req.session.is_admin) {
    //     res.redirect('/admin/sign-in/');
    //     res.end();
    // }
    // else {
    //     req.session.is_admin = false;
    //     req.session.is_client= false;
    //     req.session.logged_in = false;
    //     req.session.user_id = '';
    //     req.session.uname = '';
    //     res.json({status:202});
    //     res.end();
    // }
});

queries.post('/bike_list', (req, res) => {
    if (!req.session.is_admin) {
        res.json({status:404});
        res.end();
    }
    else {
        qry = "SELECT * FROM `bike_list`";
        db.query(qry, function (error, data) {
            if (error) res.send(error);
            res.json({status:202, raw:data});
            res.end();
        });
    }
});

queries.post('/clients_list', (req, res) => {
    if (!req.session.is_admin) {
        res.json({status:404});
        res.end();
    }
    else {
        qry = "SELECT * FROM `clients`";
        db.query(qry, function (error, data) {
            if (error) res.send(error);
            res.json({status:202, raw:data});
            res.end();
        });
    }
});

queries.post('/brands', (req, res) => {
    if (!req.session.is_admin) {
        res.json({status:404});
        res.end();
    }
    else {
        qry = "SELECT * FROM `brand_list`";
        db.query(qry, function (error, data) {
            if (error) res.send(error);
            res.json({status:202, raw:data});
            res.end();
        });
    }
});


queries.post('/categories', (req, res) => {
    if (!req.session.is_admin) {
        res.json({status:404});
        res.end();
    }
    else {
        qry = "SELECT * FROM `categories`";
        db.query(qry, function (error, data) {
            if (error) res.send(error);
            res.json({status:202, raw:data});
            res.end();
        });
    }
});

queries.post('/rent_list', (req, res) => {
    if (!req.session.is_admin) {
        res.json({status:404});
        res.end();
    }
    else {
        qry = "SELECT * FROM `rent_list`";
        db.query(qry, function (error, data) {
            if (error) res.send(error);
            res.json({status:202, raw:data});
            res.end();
        });
    }
});

queries.post('/dell_booklist', (req, res) => {
    if (!req.session.is_admin) {
        res.json({status:404});
        res.end();
    }
    else {
        qry = `DELETE FROM rent_list WHERE id='${req.body.id}';`;
        db.query(qry, function (error, data) {
            if (error) res.send(error);
            res.json({status:202, raw:data});
            res.end();
        });
    }
});


queries.post('/re_place_stats', (req, res) => {
    if (!req.session.is_admin) {
        res.json({status:404});
        res.end();
    }
    else {
        qry = `UPDATE rent_list SET status = '${req.body.val}' WHERE id = ${req.session.user_id};`;
        db.query(qry, function (error, data) {
            if (error) res.send(error);
            res.json({status:202, raw:data});
            res.end();
        });
    }
});


queries.post('/available_bikes', (req, res) => {
    res.json({status:202});
    qry = "SELECT * FROM `rent_list`";
    db.query(qry, function (error, data) {
        if (error) res.send(error);
        console.log(data)
    });
});

queries.post('/updateusr', async (req, res) => {
    var f_name = req.body.f_name;
    var l_name = req.body.l_name;
    var u_name = req.body.u_name;
    if (!req.session.is_admin) {
        res.redirect('/admin/sign-in');
        res.end();
    }
    else {
        var d = new Date()
        d.toLocaleTimeString()
        qry = `UPDATE users SET firstname = '${f_name}', lastname = '${l_name}', username = '${u_name}', date_updated = '${today}'  WHERE users.id = ${req.session.user_id};`;
        db.query(qry, function (error, data) {
            if (error) res.send(error);
            res.json({status:202, raw:data});
            res.end();
        });
    }
})

queries.post('/update_clnt', async (req, res) => {
    var id = req.body.id;
    var f_name = req.body.f_name;
    var l_name = req.body.l_name;
    var u_name = req.body.u_name;
    var address = req.body.address;
    var gender = req.body.gender;
    var contact = req.body.number;
    if (!req.session.is_admin) {
        res.redirect('/admin/sign-in');
        res.end();
    }
    else {
        var d = new Date()
        d.toLocaleTimeString()
        qry = `UPDATE clients SET firstname = '${f_name}', lastname = '${l_name}', email = '${u_name}', gender = '${gender}', contact = '${contact}', address = '${address}', date_updated = '${today}'  WHERE id = ${id};`;
        db.query(qry, function (error, data) {
            if (error) res.send(error);
            res.json({status:202, raw:data});
            res.end();
        });
    }
})

queries.post('/compare', async (req, res) => {
    var old_p = req.body.old_p;
    if (!req.session.is_admin) {
        res.redirect('/admin/sign-in');
        res.end();
    }
    else {
        qry = `SELECT * FROM users WHERE id='${req.session.user_id}';`;
        db.query(qry, function (error, data) {
            if (error) res.send(error);
            if(data[0].password == md5(old_p)){
                res.json({status:202});
                res.end();
            }else{
                res.json({status:404});
                res.end();
            }
        });
    }
})

queries.post('/clcompare', async (req, res) => {
    var old_p = req.body.old_p;
    var ol_p = req.body.ol_p;
    if (!req.session.is_admin) {
        res.redirect('/admin/sign-in');
        res.end();
    }
    else {
        qry = `SELECT * FROM clients WHERE id='${ol_p}';`;
        db.query(qry, function (error, data) {
            if (error) res.send(error);
            if(data[0].password == md5(old_p)){
                res.json({status:202});
                res.end();
            }else{
                res.json({status:404});
                res.end();
            }
        });
    }
})

queries.post('/comparetrue', async (req, res) => {
    var old_p = req.body.new_p;
    if (!req.session.is_admin) {
        res.redirect('/admin/sign-in');
        res.end();
    }
    else {
        qry = `SELECT * FROM users WHERE id='${req.session.user_id}';`;
        db.query(qry, function (error, data) {
            if (error) res.send(error);
            if(data[0].password == md5(old_p)){
                res.json({status:404});
                res.end();
            }else{
                res.json({status:202});
                res.end();
            }
        });
    }
})

queries.post('/clcomparetrue', async (req, res) => {
    var old_p = req.body.new_p;
    var ol_p = req.body.ol_p;
    if (!req.session.is_admin) {
        res.redirect('/admin/sign-in');
        res.end();
    }
    else {
        qry = `SELECT * FROM clients WHERE id='${ol_p}';`;
        db.query(qry, function (error, data) {
            if (error) res.send(error);
            if(data[0].password == md5(old_p)){
                res.json({status:404});
                res.end();
            }else{
                res.json({status:202});
                res.end();
            }
        });
    }
})


queries.post('/updatepd', async (req, res) => {
    var new_p = req.body.new_p;
    var pd = md5(new_p)
    if (!req.session.is_admin) {
        res.redirect('/admin/sign-in');
        res.end();
    }
    else {
        qry = `UPDATE users SET password='${pd}', date_updated = '${today}'  WHERE users.id = ${req.session.user_id};`;
        db.query(qry, function (error, data) {
            if (error) res.send(error);
               res.json({status:202});
                res.end();
        });
    }
})

queries.post('/clupdatepd', async (req, res) => {
    var new_p = req.body.new_p;
    var pd = md5(new_p)
    var ol_p = req.body.ol_p;
    if (!req.session.is_admin) {
        res.redirect('/admin/sign-in');
        res.end();
    }
    else {
        qry = `UPDATE clients SET password='${pd}', date_updated = '${today}'  WHERE id = ${ol_p};`;
        db.query(qry, function (error, data) {
            if (error) res.send(error);
               res.json({status:202});
                res.end();
        });
    }
})

queries.post('/addbike', async (req, res) => {
    var bike_category = req.body.bike_category;
    var brand_category = req.body.brand_category;
    var status = req.body.status;
    var available_unt = req.body.available_unt;
    var daily_rate = req.body.daily_rate;
    var model = req.body.model;
    var discription = req.body.discription;
    if (!req.session.is_admin) {
        res.redirect('/admin/sign-in');
        res.end();
    }
    else {
        qry = `INSERT INTO bike_list(id, brand_id, category_id, bike_model, description, quantity, daily_rate, status, date_created, date_updated) VALUES ('', '${bike_category}', '${brand_category}', '${model}', '${discription}', '${available_unt}', '${daily_rate}', '${status}', '${today}', '${today}')`;
        db.query(qry, function (error, data) {
            if (error) res.send(error);
                res.json({status:202});
                res.end();
        });
    }
})


queries.post('/dell_bike', (req, res) => {
    if (!req.session.is_admin) {
        res.json({status:404});
        res.end();
    }
    else {
        qry = `DELETE FROM bike_list WHERE id='${req.body.id}';`;
        db.query(qry, function (error, data) {
            if (error) res.send(error);
            res.json({status:202});
            res.end();
        });
    }
});

queries.post('/bike_update', (req, res) => {
    var bike_id = req.body.id;
    var brand_id = req.body.brn;
    var category_id = req.body.cat;
    var bike_model = req.body.model;
    var description	 = req.body.discription;
    var quantity = req.body.available_unit;
    var daily_rate = req.body.daily_rate;
    var status = req.body.trfl;
    if (!req.session.is_admin) {
        res.json({status:404});
        res.end();
    }
    else {
        qry = `UPDATE bike_list SET brand_id='${brand_id}', category_id='${category_id}', bike_model='${bike_model}', description='${description}', quantity='${quantity}', daily_rate='${daily_rate}', status='${status}', date_updated='${today}' WHERE id = ${bike_id};`;
        db.query(qry, function (error, data) {
            if (error) res.send(error);
            res.json({status:202, raw:data});
            res.end();
        });
    }
});

queries.post('/booking_update', (req, res) => {
    var id = req.body.id;
    var status = req.body.status;
    var received = req.body.receaved;
    var topay = req.body.topay;
    var balance	 = req.body.balance;
    var rent_days	 = req.body.r_d;
    if (!req.session.is_admin) {
        res.json({status:404});
        res.end();
    }
    else {
        qry = `UPDATE rent_list SET rent_days='${rent_days}', amount_received='${received}', amount_topay='${topay}', balance='${balance}', status='${status}', date_updated='${today}' WHERE id = ${id};`;
        db.query(qry, function (error, data) {
            if (error) res.send(error);
            res.json({status:202, raw:data});
            res.end();
        });
    }
});


queries.post('/dell_brnd', (req, res) => {
    var id = req.body.id;
    if (!req.session.is_admin) {
        res.json({status:404});
        res.end();
    }
    else {
        qry = `DELETE FROM brand_list WHERE id='${id}';`;
        db.query(qry, function (error, data) {
            if (error) res.send(error);
            res.json({status:202});
            res.end();
        });
    }
});

queries.post('/addbrand', async (req, res) => {
    var brand_name = req.body.brand_name;
    var brand_stats = req.body.brand_stats;
    if (!req.session.is_admin) {
        res.redirect('/admin/sign-in');
        res.end();
    }
    else {
        qry = `INSERT INTO brand_list(id, name, status, date_created, date_updated) VALUES ('', '${brand_name}', '${brand_stats}', '${today}', '${today}')`;
        db.query(qry, function (error, data) {
            if (error) res.send(error);
                res.json({status:202});
                res.end();
        });
    }
})


queries.post('/updatebrnd', async (req, res) => {
    var brand_id = req.body.b_id;
    var brand_name = req.body.brand_name;
    var brand_stats = req.body.brand_stats;
    if (!req.session.is_admin) {
        res.redirect('/admin/sign-in');
        res.end();
    }
    else {
        qry = `UPDATE brand_list SET name='${brand_name}', status='${brand_stats}', date_updated = '${today}'  WHERE id = ${brand_id};`;
        db.query(qry, function (error, data) {
            if (error) res.send(error);
               res.json({status:202});
                res.end();
        });
    }
})

queries.post('/dell_cat', (req, res) => {
    var id = req.body.id;
    if (!req.session.is_admin) {
        res.json({status:404});
        res.end();
    }
    else {
        qry = `DELETE FROM categories WHERE id='${id}';`;
        db.query(qry, function (error, data) {
            if (error) res.send(error);
            res.json({status:202});
            res.end();
        });
    }
});


queries.post('/addcategory', async (req, res) => {
    var category = req.body.name;
    var discription = req.body.discription;
    var status = req.body.stats;
    if (!req.session.is_admin) {
        res.redirect('/admin/sign-in');
        res.end();
    }
    else {
        qry = `INSERT INTO categories(id, category, description, status, date_created, date_updated) VALUES ('', '${category}', '${discription}', '${status}', '${today}', '${today}')`;
        db.query(qry, function (error, data) {
            if (error) res.send(error);
                res.json({status:202});
                res.end();
        });
    }
})

queries.post('/upp_cat', async (req, res) => {
    console.log(req.body);
    var id = req.body.id;
    var name = req.body.name;
    var description = req.body.discription;
    var status = req.body.stats;

    if (!req.session.is_admin) {
        res.redirect('/admin/sign-in');
        res.end();
    }
    else {
        qry = `UPDATE categories SET category='${name}', description='${description}', status='${status}', date_updated = '${today}'  WHERE id = ${id};`;
        db.query(qry, function (error, data) {
            if (error) res.send(error);
               res.json({status:202});
                res.end();
        });
    }
})

queries.post('/users_info', (req, res) => {
    var id = req.body.id;
    if (!req.session.is_admin) {
        res.json({status:404});
        res.end();
    }
    else {
        qry = `DELETE FROM rent_list WHERE client_id='${id}';`;
        db.query(qry, function (error, data) {
            if (error) res.send(error);
            res.json({status:202});
            res.end();
        });
    }
});

queries.post('/del_user', (req, res) => {
    var id = req.body.id;
    if (!req.session.is_admin) {
        res.json({status:404});
        res.end();
    }
    else {
        qry = `DELETE FROM clients WHERE id='${id}';`;
        db.query(qry, function (error, data) {
            if (error) res.send(error);
            res.json({status:202});
            res.end();
        });
    }
});

queries.post('/updateusr', async (req, res) => {
    var f_name = req.body.f_name;
    var l_name = req.body.l_name;
    var u_name = req.body.u_name;
    if (!req.session.is_admin) {
        res.redirect('/admin/sign-in');
        res.end();
    }
    else {
        var d = new Date()
        d.toLocaleTimeString()
        qry = `UPDATE users SET firstname = '${f_name}', lastname = '${l_name}', username = '${u_name}', date_updated = '${today}'  WHERE users.id = ${req.session.user_id};`;
        db.query(qry, function (error, data) {
            if (error) res.send(error);
            res.json({status:202, raw:data});
            res.end();
        });
    }
})

queries.post('/my-profile_update', upload.single('imageProfile'), async (req, res) => {
    if (!req.session.is_admin) {
        res.redirect('/admin/sign-in');
        res.end();
    }
    else {
        (async () => {
            await new Promise((resolve, reject) => {
                cloudinary.uploader.upload(req.file.path, (err, data) => {
                    if (err) {
                        reject(res.send({ code: 404 }))
                    } else {
                        resolve(data)
                    };
                })
            }).then(result => {
                qry = `UPDATE users SET avatar = '${result.secure_url}', date_updated = '${today}'  WHERE users.id = ${req.session.user_id};`;
                (async () => {
                    await new Promise((resolve, reject) => {
                        db.query(qry, (err, data) => {
                            if (err) {
                                reject(res.send({ code: 404 }))
                            } else {
                                resolve(data)
                            };
                        })
                    }).then(result => {
                        res.sendStatus(202)
                        res.end();
                    }).catch(rs => {
                        console.log("Error such table found ", rs);
                    })
                })();
            }).catch(rs => {
                console.log("cloudinary response error", rs);
            })
        })();
    }
})


queries.post('/cl-profile_update', upload.single('imageProfile'), async (req, res) => {
    if (!req.session.is_admin) {
        res.redirect('/admin/sign-in');
        res.end();
    }
    else {
        (async () => {
            await new Promise((resolve, reject) => {
                cloudinary.uploader.upload(req.file.path, (err, data) => {
                    if (err) {
                        reject(res.send({ code: 404 }))
                    } else {
                        resolve(data)
                    };
                })
            }).then(result => {
                console.log(result)
                qry = `UPDATE clients SET avatar = '${result.secure_url}', date_updated = '${today}'  WHERE id = ${req.body.id};`;
                (async () => {
                    await new Promise((resolve, reject) => {
                        db.query(qry, (err, data) => {
                            if (err) {
                                reject(res.send({ code: 404 }))
                            } else {
                                resolve(data)
                            };
                        })
                    }).then(result => {
                        res.sendStatus(202)
                        res.end();
                    }).catch(rs => {
                        console.log("Error such table found ", rs);
                    })
                })();
            }).catch(rs => {
                console.log("cloudinary response error", rs);
            })
        })();
    }
})









module.exports = queries;
