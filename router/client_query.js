const express = require('express');
const fs = require("node:fs");
const client_queries = express.Router();
client_queries.use(express.static(__dirname));
const db = require('../db');
var md5 = require('md5');
const e = require('express');

var this_date = new Date()
var day = String(this_date.getDate()).padStart(2, '0');
var m = String(this_date.getMonth() + 1).padStart(2, '0');
var year = this_date.getFullYear();
const today = `${year}-${m}-${day}`;


function get_today(d_now) {
    var dc = new Date(d_now)
    var day = String(dc.getDate()).padStart(2, '0');
    var month = String(dc.getMonth() + 1).padStart(2, '0');
    var year = String(dc.getFullYear());
    return `${year}-${month}-${day}`
}

client_queries.post('/available_bikes', (req, res) => {
    var starts = req.body.start;
    var ends = req.body.ends;
    qry = "SELECT * FROM `rent_list`";
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
            var rs = [result];
            var rs_array = [];
            for (let loop = 0; loop < rs[0].length; loop++) {
                rs_array.push({ "id": rs[0][loop].id, "bike_id": rs[0][loop].bike_id, "date_start": rs[0][loop].date_start, "date_end": rs[0][loop].date_end, "status": rs[0][loop].status })
            }

            var unavail_id = [];
            var tocheck_id = [];
            var check_stats = (stat, bike) => {
                if (stat == '0' || stat == '1' || stat == '3') {
                    unavail_id.push(bike);
                }
            }
            for (let loop = 0; loop < rs_array.length; loop++) {
                var d_start = get_today(rs_array[loop].date_start);
                var d_ends = get_today(rs_array[loop].date_end);
                if (starts >= d_start && ends <= d_ends) {
                    check_stats(rs_array[loop].status, rs_array[loop].bike_id);
                } else if (d_start >= starts && d_ends <= ends || d_ends > starts && d_ends < ends || d_start > starts && d_start < ends) {
                    tocheck_id.push(rs_array[loop]);
                }
            }
            function removedoplicates(arr) {
                return arr.filter((el, index) => arr.indexOf(el) === index)
            }
            var doplocated = [];
            if (tocheck_id.length >= 1) {
                for (let loop = 0; loop < tocheck_id.length; loop++) {
                    var itc = tocheck_id[loop].bike_id;
                    doplocated.push(itc)
                }
                var redop = removedoplicates(doplocated);
                for (let loop = 0; loop < redop.length; loop++) {
                    var redop_id = redop[loop];
                    for (let loop = 0; loop < tocheck_id.length; loop++) {
                        var itc = tocheck_id[loop].bike_id;
                        if(redop_id == itc){
                            check_stats(tocheck_id[loop].status, tocheck_id[loop].bike_id);
                        }
                    }
                }
            }
            removedoplicates(unavail_id);
            qry2 = "SELECT * FROM `bike_list`";
            (async () => {
                await new Promise((resolve, reject) => {
                    db.query(qry2, (err, data) => {
                        if (err) {
                            reject(res.send({ code: 404 }))
                        } else {
                            resolve(data)
                        };
                    })
                }).then(result => {
                    var data = []
                    for (let loop = 0; loop < result.length; loop++){
                        if(!unavail_id.includes(result[loop].id)){
                            data.push(result[loop])
                        }
                    }
                    res.json({status:202, data: data});
                    res.end();
                }).catch(rs => {
                    console.log("Error such table found ", rs);
                })
            })();
        }).catch(rs => {
            console.log("Error such table found ", rs);
        })
    })();
});

client_queries.post('/all_bikes', (req, res) => {
    qry = "SELECT * FROM `bike_list`";
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
            res.json({raw:result});
            res.end();
        }).catch(rs => {
            console.log("Error such table found ", rs);
        })
    })();
});

client_queries.post('/all_brands', (req, res) => {
    if(req.session.logged_in){
        qry = "SELECT * FROM `brand_list`";
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
                res.json({raw:result});
                res.end();
            }).catch(rs => {
                console.log("Error such table found ", rs);
            })
        })();
    }else{
        res.json({status:404});
        res.end();
    }
});

client_queries.post('/all_categories', (req, res) => {
    qry = "SELECT * FROM `categories`";
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
            res.json({raw:result});
            res.end();
        }).catch(rs => {
            console.log("Error such table found ", rs);
        })
    })();
});


client_queries.post('/u_active', (req, res) => {
    qry = `SELECT * FROM users WHERE id='${req.session.user_id}';`;
    qry_cl = `SELECT * FROM clients WHERE id='${req.session.user_id}';`;
    if (!req.session.logged_in) {
        res.json({status:404});
        res.end();
    }else if (req.session.is_admin) {
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
                res.json({status:203, raw:result});
                res.end();
            }).catch(rs => {
                console.log("Error such table found ", rs);
            })
        })();
    }else if(req.session.is_client) {
        (async () => {
            await new Promise((resolve, reject) => {
                db.query(qry_cl, (err, data) => {
                    if (err) {
                        reject(res.send({ code: 404 }))
                    } else {
                        resolve(data)
                    };
                })
            }).then(result => {
                res.json({status:202, raw:result});
                res.end();
            }).catch(rs => {
                console.log("Error such table found ", rs);
            })
        })();
    }
});

client_queries.post('/update_client_info', (req, res) => {
    if(req.session.logged_in){
        var firstname = req.body.firstname, lastname = req.body.lastname, username = req.body.username, address = req.body.address, contact = req.body.contact, gender = req.body.gender;
        qry = `UPDATE clients SET firstname = '${firstname}', lastname = '${lastname}', email = '${username}', address = '${address}', contact = '${contact}', gender = '${gender}', date_updated = '${today}'  WHERE id = ${req.session.user_id};`;
        (async () => {
            await new Promise((resolve, reject) => {
                db.query(qry, (err, data) => {
                    if (err) {
                        reject(res.send({ code: 404 }));
                    }else {
                        resolve(data);
                    };
                })
            }).then(result => {
                res.json({status:202});
                res.end();
            }).catch(rs => {
                console.log("Error such table found ", rs);
            })
        })();
    }else{
        res.json({status:404});
        res.end();
    }
});


client_queries.post('/validate_uname', (req, res) => {
    if(req.session.logged_in){
        var username = req.body.username;
        qry = `SELECT * FROM clients`;
        (async () => {
            await new Promise((resolve, reject) => {
                db.query(qry, (err, data) => {
                    if (err) {
                        reject(res.send({ code: 404 }));
                        res.end();
                    } else {
                        resolve(data);
                    };
                })
            }).then(result => {
                qry = `SELECT * FROM users`;
                (async () => {
                    await new Promise((resolve, reject) => {
                        db.query(qry, (err, data) => {
                            if (err) {
                                reject(res.send({ code: 404 }));
                                res.end();
                            } else {
                                resolve(data);
                            };
                        })
                    }).then(rs => {
                        var status = 202;
                        for(let loop = 0; loop < result.length; loop++){
                            if(req.session.user_id != result[loop].id){
                                var exname = String(username), exmail = String(result[loop].email);
                                if(exname.toLowerCase() == exmail.toLowerCase()){
                                    status = 200;
                                }
                            }
                        }
                        if(status == 202){
                            for(let loop2 = 0; loop2 < rs.length; loop2++){
                                var a_uname = String(rs[loop2].username);
                                if(exname.toLowerCase() == a_uname.toLowerCase()){
                                    status = 200;
                                };
                            };
                        };
                        res.json({stats:status});
                        res.end();
                    }).catch(rs => {
                        console.log("Error such table found ", rs);
                    })
                })();
            }).catch(rs => {
                console.log("Error such table found ", rs);
            })
        })();
    }else{
        res.json({status:404});
        res.end();
    }
});



client_queries.post('/check_uname', (req, res) => {
    var username = req.body.username;
    qry = `SELECT * FROM clients`;
    (async () => {
        await new Promise((resolve, reject) => {
            db.query(qry, (err, data) => {
                if (err) {
                    reject(res.send({ code: 404 }));
                    res.end();
                } else {
                    resolve(data);
                };
            })
        }).then(result => {
            qry = `SELECT * FROM users`;
            (async () => {
                await new Promise((resolve, reject) => {
                    db.query(qry, (err, data) => {
                        if (err) {
                            reject(res.send({ code: 404 }));
                            res.end();
                        } else {
                            resolve(data);
                        };
                    })
                }).then(rs => {
                    var status = 202;
                    for(let loop = 0; loop < result.length; loop++){
                        var exname = String(username), exmail = String(result[loop].email);
                        if(exname.toLowerCase() == exmail.toLowerCase()){
                            status = 200;
                        }
                    }
                    if(status == 202){
                        for(let loop2 = 0; loop2 < rs.length; loop2++){
                            var a_uname = String(rs[loop2].username);
                            if(exname.toLowerCase() == a_uname.toLowerCase()){
                                status = 200;
                            };
                        };
                    };
                    res.json({stats:status});
                    res.end();
                }).catch(rs => {
                    console.log("Error such table found ", rs);
                })
            })();
        }).catch(rs => {
            console.log("Error such table found ", rs);
        })
    })();
});

client_queries.post('/my_bookings', (req, res) => {
    if(req.session.logged_in){
        qry = `SELECT * FROM rent_list WHERE client_id ='${req.session.user_id}';`;
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
                res.json({raw:result});
                res.end();
            }).catch(rs => {
                console.log("Error such table found ", rs);
            })
        })();
    }else{
        res.json({status:404});
        res.end();
    }
});


client_queries.post('/validate_oldpass', async (req, res) => {
    if(req.session.logged_in){
        var old_p = req.body.old_p;
        qry = `SELECT * FROM clients WHERE id='${req.session.user_id}';`;
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
    }else{
        res.json({status:404});
        res.end();
    }
});

client_queries.post('/validate_newpass', async (req, res) => {
    if(req.session.logged_in){
        var old_p = req.body.new_p;
        qry = `SELECT * FROM clients WHERE id='${req.session.user_id}';`;
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
    }else{
        res.json({status:404});
        res.end();
    }
})

client_queries.post('/reg_client', async (req, res) => {
    var pwd = md5(req.body.password)
    qry = `INSERT INTO clients(id, firstname, lastname, gender, contact, email, password, address, date_created) VALUES ('', '${req.body.firstname}', '${req.body.lastname}', '${req.body.gender}', '${req.body.contact}', '${req.body.username}', '${pwd}', '${req.body.address}', '${today}')`;
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
            res.json({status:202});
            res.end();
        }).catch(rs => {
            console.log("Error such table found ", rs);
        })
    })();
})

client_queries.post('/updatepd', async (req, res) => {
    if(req.session.logged_in){
        var new_p = req.body.new_p;
        var pd = md5(new_p)
        qry = `UPDATE clients SET password='${pd}', date_updated = '${today}'  WHERE id = ${req.session.user_id};`;
        db.query(qry, function (error, data) {
            if (error) res.send(error);
                res.json({status:202});
                res.end();
        });
    }else{
        res.json({status:404});
        res.end();
    }
});


client_queries.post('/cancel-book', (req, res) => {
    var id = req.body.id
    if(req.session.logged_in){
        qry = `UPDATE rent_list SET status='${2}', date_updated = '${today}'  WHERE id = ${id};`;
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
                res.json({status:202});
                res.end();
            }).catch(rs => {
                console.log("Error such table found ", rs);
            })
        })();
    }else{
        res.json({status:404});
        res.end();
    }
});

module.exports = client_queries;
