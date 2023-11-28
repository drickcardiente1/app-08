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
const promise_query = (qr) => {
    return new Promise((resolve, reject) => {db.query(qr, (err, data) => { err ? reject(err) : resolve(data) })})
};       


// semi-api-router
queries.post('/active_user', (req, res) => {
    if (!req.session.is_admin) {
        res.json({ status: 404 });
        res.end();
    }
    else {
        qry = `SELECT * FROM users WHERE id='${req.session.user_id}';`;
        db.query(qry, function (error, data) {
            if (error) res.send(error);
            res.json({ status: 202, raw: data });
            res.end();
        });
    }
});

queries.get('/logout', function (req, res) {
    req.session.is_admin = false;
    req.session.is_client = false;
    req.session.logged_in = false;
    req.session.user_id = '';
    req.session.uname = '';
    res.json({ status: 202 });
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
        res.json({ status: 404 });
        res.end();
    }
    else {
        qry = "SELECT * FROM `bike_list`";
        db.query(qry, function (error, data) {
            if (error) res.send(error);
            res.json({ status: 202, raw: data });
            res.end();
        });
    }
});

queries.post('/clients_list', (req, res) => {
    if (!req.session.is_admin) {
        res.json({ status: 404 });
        res.end();
    }
    else {
        qry = "SELECT * FROM `clients`";
        db.query(qry, function (error, data) {
            if (error) res.send(error);
            res.json({ status: 202, raw: data });
            res.end();
        });
    }
});

queries.post('/brands', (req, res) => {
    if (!req.session.is_admin) {
        res.json({ status: 404 });
        res.end();
    }
    else {
        qry = "SELECT * FROM `brand_list`";
        db.query(qry, function (error, data) {
            if (error) res.send(error);
            res.json({ status: 202, raw: data });
            res.end();
        });
    }
});


queries.post('/categories', (req, res) => {
    if (!req.session.is_admin) {
        res.json({ status: 404 });
        res.end();
    }
    else {
        qry = "SELECT * FROM `categories`";
        db.query(qry, function (error, data) {
            if (error) res.send(error);
            res.json({ status: 202, raw: data });
            res.end();
        });
    }
});

queries.post('/rent_list', (req, res) => {
    if (!req.session.is_admin) {
        res.json({ status: 404 });
        res.end();
    }
    else {
        qry = "SELECT * FROM `rent_list`";
        db.query(qry, function (error, data) {
            if (error) res.send(error);
            res.json({ status: 202, raw: data });
            res.end();
        });
    }
});

queries.post('/dell_booklist', (req, res) => {
    if (!req.session.is_admin) {
        res.json({ status: 404 });
        res.end();
    }
    else {
        qry = `DELETE FROM rent_list WHERE id='${req.body.id}';`;
        db.query(qry, function (error, data) {
            if (error) res.send(error);
            res.json({ status: 202, raw: data });
            res.end();
        });
    }
});


queries.post('/re_place_stats', (req, res) => {
    if (!req.session.is_admin) {
        res.json({ status: 404 });
        res.end();
    }
    else {
        qry = `UPDATE rent_list SET status = '${req.body.val}' WHERE id = ${req.session.user_id};`;
        db.query(qry, function (error, data) {
            if (error) res.send(error);
            res.json({ status: 202, raw: data });
            res.end();
        });
    }
});


queries.post('/available_bikes', (req, res) => {
    res.json({ status: 202 });
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
            res.json({ status: 202, raw: data });
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
            res.json({ status: 202, raw: data });
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
            if (data[0].password == md5(old_p)) {
                res.json({ status: 202 });
                res.end();
            } else {
                res.json({ status: 404 });
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
            if (data[0].password == md5(old_p)) {
                res.json({ status: 202 });
                res.end();
            } else {
                res.json({ status: 404 });
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
            if (data[0].password == md5(old_p)) {
                res.json({ status: 404 });
                res.end();
            } else {
                res.json({ status: 202 });
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
            if (data[0].password == md5(old_p)) {
                res.json({ status: 404 });
                res.end();
            } else {
                res.json({ status: 202 });
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
            res.json({ status: 202 });
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
            res.json({ status: 202 });
            res.end();
        });
    }
})

queries.post('/addbike', upload.fields([{ name: 'Default', maxCount: 1 }, { name: 'Galeries' }]), async (req, res) => {
    var bike_category = req.body.bike_category;
    var brand_category = req.body.brand_category;
    var status = req.body.status;
    var daily_rate = req.body.daily_rate;
    var model = req.body.model;
    var discription = req.body.discription;


    if (!req.session.is_admin) {
        res.redirect('/admin/sign-in');
        res.end();
    }
    else {



        function insert_all() {
            (async () => {
                var def = await cloudinary.uploader.upload(req.files.Default[0].path);
                var avatar = [def.secure_url]
                var galeries = []
                for (var image of req.files.Galeries) {
                    var result = await cloudinary.uploader.upload(image.path);
                    galeries.push(result.secure_url)
                }
                return { "avatar": avatar, "galeries": galeries }
            })().then((images) => {
                console.log(images.avatar.length)
                console.log(images.galeries.length)
                qry = `INSERT INTO bike_list(id, brand_id, category_id, bike_model, description, avatar, daily_rate, status, date_created, date_updated) VALUES ('', '${brand_category}', '${bike_category}', '${model}', '${discription}', '${images.avatar[0]}', '${daily_rate}', '${status}', '${today}', '${today}')`;
                (async () => {
                    await new Promise((resolve, reject) => {
                        db.query(qry, (err, data) => { err ? reject(res.send({ code: 404 })) : resolve(data) });
                    }).then(result => {
                        for (var url of images.galeries) {
                            qry = `INSERT INTO bike_gallery(id, bike_id, image, date_added) VALUES ('', '${result.insertId}', '${url}', '${today}')`;
                            (async () => {
                                await new Promise((resolve, reject) => {
                                    db.query(qry, (err, data) => { err ? reject(res.send({ code: 404 })) : resolve(data) });
                                }).catch(rs => {
                                    res.sendStatus(404)
                                    res.end();
                                })
                            })();
                        };

                    }).then(() => {
                        res.sendStatus(202)
                        res.end();
                    }).catch(rs => {
                        res.sendStatus(404)
                        res.end();
                    })
                })();
            }).catch(() => {
                res.sendStatus(404)
                res.end();
            })
        }
        function insert_avatar() {
            (async () => {
                var def = await cloudinary.uploader.upload(req.files.Default[0].path);
                var avatar = [def.secure_url]
                return { "avatar": avatar }
            })().then((images) => {
                console.log(images.avatar.length)
                qry = `INSERT INTO bike_list(id, brand_id, category_id, bike_model, description, avatar, daily_rate, status, date_created, date_updated) VALUES ('', '${bike_category}', '${brand_category}', '${model}', '${discription}', '${images.avatar[0]}', '${daily_rate}', '${status}', '${today}', '${today}')`;
                (async () => {
                    await new Promise((resolve, reject) => {
                        db.query(qry, (err, data) => { err ? reject(res.send({ code: 404 })) : resolve(data) });
                    }).then(() => {
                        res.sendStatus(202)
                        res.end();
                    }).catch(rs => {
                        res.sendStatus(404)
                        res.end();
                    })
                })();
            }).catch(() => {
                res.sendStatus(404)
                res.end();
            })
        }
        function insert_Galery() {
            (async () => {
                var galeries = []
                for (var image of req.files.Galeries) {
                    var result = await cloudinary.uploader.upload(image.path);
                    galeries.push(result.secure_url)
                }
                return { "galeries": galeries }
            })().then((images) => {
                console.log(images.galeries.length)
                qry = `INSERT INTO bike_list(id, brand_id, category_id, bike_model, description, daily_rate, status, date_created, date_updated) VALUES ('', '${bike_category}', '${brand_category}', '${model}', '${discription}', '${daily_rate}', '${status}', '${today}', '${today}')`;
                (async () => {
                    await new Promise((resolve, reject) => {
                        db.query(qry, (err, data) => { err ? reject(res.send({ code: 404 })) : resolve(data) });
                    }).then(result => {
                        for (var url of images.galeries) {
                            qry = `INSERT INTO bike_gallery(id, bike_id, image, date_added) VALUES ('', '${result.insertId}', '${url}', '${today}')`;
                            (async () => {
                                await new Promise((resolve, reject) => {
                                    db.query(qry, (err, data) => { err ? reject(res.send({ code: 404 })) : resolve(data) });
                                }).catch(rs => {
                                    res.sendStatus(404)
                                    res.end();
                                })
                            })();
                        };
                    }).then(() => {
                        res.sendStatus(202)
                        res.end();
                    }).catch(rs => {
                        res.sendStatus(404)
                        res.end();
                    })
                })();
            }).catch(() => {
                res.sendStatus(404)
                res.end();
            })
        }
        function empty_all() {
            qry = `INSERT INTO bike_list(id, brand_id, category_id, bike_model, description, daily_rate, status, date_created, date_updated) VALUES ('', '${bike_category}', '${brand_category}', '${model}', '${discription}', '${daily_rate}', '${status}', '${today}', '${today}')`;
            (async () => {
                await new Promise((resolve, reject) => {
                    db.query(qry, (err, data) => { err ? reject(res.send({ code: 404 })) : resolve(data) });
                }).then(() => {
                    res.sendStatus(202)
                    res.end();
                }).catch(rs => {
                    res.sendStatus(404)
                    res.end();
                })
            })();
        }
        req.files.Default && req.files.Galeries ? insert_all() : !req.files.Default && req.files.Galeries ? insert_Galery() : req.files.Default && !req.files.Galeries ? insert_avatar() : empty_all();
    }
})


queries.post('/dell_bike', (req, res) => {
    if (!req.session.is_admin) {
        res.json({ status: 404 });
        res.end();
    }
    else {
        qry = `DELETE FROM bike_list WHERE id='${req.body.id}';`;
        db.query(qry, function (error, data) {
            if (error) res.send(error);
            res.json({ status: 202 });
            res.end();
        });
    }
});

queries.post('/bike_update', upload.array('Galeries'), (req, res) => {
    var bike_id = req.body.id;
    var brand_id = req.body.brn;
    var category_id = req.body.cat;
    var bike_model = req.body.model;
    var description = req.body.discription;
    var daily_rate = req.body.daily_rate;
    var status = req.body.trfl;
    var avatar = req.body.avatar;
    var to_delate = req.body.to_delate;
    if (!req.session.is_admin) {
        res.json({ status: 404 });
        res.end();
    }
    else {
        // adding img removing data
        function insert_remove() {
            (async () => {
                console.log("inserting")
                var galeries = []
                for (var image of req.files) {
                    var result = await cloudinary.uploader.upload(image.path);
                    galeries.push(result.secure_url)
                }
                return { "galeries": galeries }
            })().then((images) => {
                var qry
                (async () => {
                    for (var url of images.galeries) {
                        qry = `INSERT INTO bike_gallery(id, bike_id, image, date_added) VALUES ('', '${bike_id}', '${url}', '${today}')`
                        console.log(await promise_query(qry));
                    };
                    qry = `UPDATE bike_list SET brand_id='${brand_id}', category_id='${category_id}', bike_model='${bike_model}', description='${description}', avatar='${avatar}', daily_rate='${daily_rate}', status='${status}', date_updated='${today}' WHERE id = ${bike_id};`;
                    console.log(await promise_query(qry));
                })().then(() => {
                    function obj() {
                        var qry;
                        (async () => {
                            qry = `DELETE FROM bike_gallery WHERE id='${to_delate}';`
                            console.log(await promise_query(qry));
                        })();
                    }
                    function obj2() {
                        (async () => {
                            for (var id of to_delate) {
                                qry = `DELETE FROM bike_gallery WHERE id='${id}';`
                                console.log(await promise_query(qry));
                            };
                        })();
                    }
                    typeof (to_delate) == 'string' ? obj() : obj2()
                }).then(() => {
                    console.log("job done")
                    res.sendStatus(202)
                    res.end();
                }).catch(() => {
                    console.log("error 2")
                    res.sendStatus(404)
                    res.end();
                })
            }).catch(() => {
                console.log("error 1")
                res.sendStatus(404)
                res.end();
            })
        }
        // adding img
        function igalery() {
            (async () => {
                console.log("inserting")
                var galeries = []
                for (var image of req.files) {
                    var result = await cloudinary.uploader.upload(image.path);
                    galeries.push(result.secure_url)
                }
                return { "galeries": galeries }
            })().then((images) => {
                var qry
                (async () => {
                    for (var url of images.galeries) {
                        qry = `INSERT INTO bike_gallery(id, bike_id, image, date_added) VALUES ('', '${bike_id}', '${url}', '${today}')`
                        console.log(await promise_query(qry));
                    };
                    qry = `UPDATE bike_list SET brand_id='${brand_id}', category_id='${category_id}', bike_model='${bike_model}', description='${description}', avatar='${avatar}', daily_rate='${daily_rate}', status='${status}', date_updated='${today}' WHERE id = ${bike_id};`;
                    console.log(await promise_query(qry));
                })().then(() => {
                    console.log("job done")
                    res.sendStatus(202)
                    res.end();
                }).catch(() => {
                    console.log("error 2")
                    res.sendStatus(404)
                    res.end();
                })
            }).catch(() => {
                console.log("error 1")
                res.sendStatus(404)
                res.end();
            })
        }
        // removing data
        function idel() {
            var qry
            (async () => {
                qry = `UPDATE bike_list SET brand_id='${brand_id}', category_id='${category_id}', bike_model='${bike_model}', description='${description}', avatar='${avatar}', daily_rate='${daily_rate}', status='${status}', date_updated='${today}' WHERE id = ${bike_id};`;
                await promise_query(qry);
            })().then(() => {
                function obj() {
                    var qry;
                    (async () => {
                        qry = `DELETE FROM bike_gallery WHERE id='${to_delate}';`
                        await promise_query(qry);
                    })();
                }
                function obj2() {
                    (async () => {
                        for (var id of to_delate) {
                            qry = `DELETE FROM bike_gallery WHERE id='${id}';`
                            await promise_query(qry);
                        };
                    })();
                }
                typeof (to_delate) == 'string' ? obj() : obj2()
            }).then(() => {
                console.log("job done")
                res.sendStatus(202)
                res.end();
            }).catch(() => {
                console.log("error 2")
                res.sendStatus(404)
                res.end();
            })
        }
        // default update
        function default_adding() {
            (async () => {
                qry = `UPDATE bike_list SET brand_id='${brand_id}', category_id='${category_id}', bike_model='${bike_model}', description='${description}', avatar='${avatar}', daily_rate='${daily_rate}', status='${status}', date_updated='${today}' WHERE id = ${bike_id};`;
                await promise_query(qry);
            })().then(() => {
                console.log("job done")
                res.sendStatus(202)
                res.end();
            }).catch((error) => {
                console.log(error)
                console.log("job not done")
                res.sendStatus(404)
                res.end();
            })
        }
        req.files.length >= 1 && to_delate ? insert_remove() : req.files.length >= 1 && !to_delate ? igalery() : req.files.length == 0 && to_delate ? idel() : default_adding();
    }
});

queries.post('/booking_update', (req, res) => {
    var id = req.body.id;
    var status = req.body.status;
    var received = req.body.receaved;
    var topay = req.body.topay;
    var balance = req.body.balance;
    var rent_days = req.body.r_d;
    if (!req.session.is_admin) {
        res.json({ status: 404 });
        res.end();
    }
    else {
        qry = `UPDATE rent_list SET rent_days='${rent_days}', amount_received='${received}', amount_topay='${topay}', balance='${balance}', status='${status}', date_updated='${today}' WHERE id = ${id};`;
        db.query(qry, function (error, data) {
            if (error) res.send(error);
            res.json({ status: 202, raw: data });
            res.end();
        });
    }
});


queries.post('/dell_brnd', (req, res) => {
    var id = req.body.id;
    if (!req.session.is_admin) {
        res.json({ status: 404 });
        res.end();
    }
    else {
        qry = `DELETE FROM brand_list WHERE id='${id}';`;
        db.query(qry, function (error, data) {
            if (error) res.send(error);
            res.json({ status: 202 });
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
            res.json({ status: 202 });
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
            res.json({ status: 202 });
            res.end();
        });
    }
})

queries.post('/dell_cat', (req, res) => {
    var id = req.body.id;
    if (!req.session.is_admin) {
        res.json({ status: 404 });
        res.end();
    }
    else {
        qry = `DELETE FROM categories WHERE id='${id}';`;
        db.query(qry, function (error, data) {
            if (error) res.send(error);
            res.json({ status: 202 });
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
            res.json({ status: 202 });
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
            res.json({ status: 202 });
            res.end();
        });
    }
})

queries.post('/users_info', (req, res) => {
    var id = req.body.id;
    if (!req.session.is_admin) {
        res.json({ status: 404 });
        res.end();
    }
    else {
        qry = `DELETE FROM rent_list WHERE client_id='${id}';`;
        db.query(qry, function (error, data) {
            if (error) res.send(error);
            res.json({ status: 202 });
            res.end();
        });
    }
});

queries.post('/del_user', (req, res) => {
    var id = req.body.id;
    if (!req.session.is_admin) {
        res.json({ status: 404 });
        res.end();
    }
    else {
        qry = `DELETE FROM clients WHERE id='${id}';`;
        db.query(qry, function (error, data) {
            if (error) res.send(error);
            res.json({ status: 202 });
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
            res.json({ status: 202, raw: data });
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


queries.post('/bike_gallery', upload.single('imageProfile'), async (req, res) => {
    if (!req.session.is_admin) {
        res.redirect('/admin/sign-in');
        res.end();
    }
    else {
        qry = "SELECT * FROM `bike_gallery`";
        db.query(qry, function (error, data) {
            if (error) res.send(error);
            res.json({ status: 202, raw: data });
            res.end();
        });
    }
})










module.exports = queries;
