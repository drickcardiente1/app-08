const express = require("express");
const auth_router = express.Router();
const bodyParser = require("body-parser");
var md5 = require("md5");
const oneDay = 1000 * 60 * 60 * 24;
auth_router.use(express.static(__dirname));
const session = require("express-session");
auth_router.use(
  session({
    secret: "weblesson",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
  })
);
auth_router.use(bodyParser.urlencoded({ extended: true }));
const db = require("../db");
var this_date = new Date();
var day = String(this_date.getDate()).padStart(2, "0");
var m = String(this_date.getMonth() + 1).padStart(2, "0");
var year = this_date.getFullYear();
const today = `${year}-${m}-${day}`;

auth_router.post("/admin-login", (req, res) => {
  var uname = req.body.um;
  var pwd = req.body.pd;
  if (uname && pwd) {
    sql_admin = `SELECT * FROM users WHERE username = '${uname}' AND password = '${md5(
      pwd
    )}';`;
    qry = `UPDATE clients SET last_login='${today}' WHERE id='${req.session.user_id}';`;
    (async () => {
      await new Promise((resolve, reject) => {
        db.query(sql_admin, (err, data) => {
          if (err) {
            reject(res.send({ code: 500 }));
          } else {
            resolve(data);
          }
        });
      })
        .then((result) => {
          if (result.length == 0) {
            res.json({ status: 404 });
            res.end();
          } else {
            req.session.is_admin = true;
            req.session.is_client = false;
            req.session.logged_in = true;
            req.session.user_id = result[0].id;
            req.session.uname = result[0].username;
            (async () => {
              await new Promise((resolve, reject) => {
                db.query(qry, (err, data) => {
                  if (err) {
                    reject(res.send({ code: 500 }));
                  } else {
                    resolve(data);
                  }
                });
              })
                .then((rs) => {
                  res.json({ status: 202, raw: result });
                  res.end();
                })
                .catch((rs) => {
                  console.log("Error such table found ", rs);
                });
            })();
          }
        })
        .catch((rs) => {
          console.log("Error such table found ", rs);
        });
    })();
  }
});

auth_router.post("/client-login", (req, res) => {
  var uname = req.body.um;
  var pwd = req.body.pd;
  sql_client = `SELECT * FROM clients WHERE email = '${uname}' AND password = '${md5(
    pwd
  )}';`;
  sql_admin = `SELECT * FROM users WHERE username = '${uname}' AND password = '${md5(
    pwd
  )}';`;
  if (uname && pwd) {
    (async () => {
      await new Promise((resolve, reject) => {
        db.query(sql_client, (err, data) => {
          if (err) {
            reject(res.send({ code: 500 }));
          } else {
            resolve(data);
          }
        });
      })
        .then((result) => {
          if (result.length == 0) {
            (async () => {
              await new Promise((resolve, reject) => {
                db.query(sql_admin, (err, data) => {
                  if (err) {
                    reject(res.send({ code: 500 }));
                  } else {
                    resolve(data);
                  }
                });
              })
                .then((result) => {
                  if (result.length == 0) {
                    res.json({ status: 404 });
                    res.end();
                  } else {
                    req.session.is_admin = true;
                    req.session.is_client = false;
                    req.session.logged_in = true;
                    req.session.user_id = result[0].id;
                    req.session.uname = result[0].username;
                    qry = `UPDATE users SET last_login='${today}' WHERE id='${req.session.user_id}';`;
                    (async () => {
                      await new Promise((resolve, reject) => {
                        db.query(qry, (err, data) => {
                          if (err) {
                            reject(res.send({ code: 500 }));
                          } else {
                            resolve(data);
                          }
                        });
                      })
                        .then((rs) => {
                          res.json({ status: 203, raw: result });
                          res.end();
                        })
                        .catch((rs) => {
                          console.log("Error such table found ", rs);
                        });
                    })();
                  }
                })
                .catch((rs) => {
                  console.log("Error such table found ", rs);
                });
            })();
          } else {
            req.session.is_admin = false;
            req.session.is_client = true;
            req.session.logged_in = true;
            req.session.user_id = result[0].id;
            req.session.uname = result[0].email;
            qry = `UPDATE clients SET last_login='${today}' WHERE id='${req.session.user_id}';`;
            (async () => {
              await new Promise((resolve, reject) => {
                db.query(qry, (err, data) => {
                  if (err) {
                    reject(res.send({ code: 500 }));
                  } else {
                    resolve(data);
                  }
                });
              })
                .then((rs) => {
                  res.json({ status: 202, raw: result });
                  res.end();
                })
                .catch((rs) => {
                  console.log("Error such table found ", rs);
                });
            })();
          }
        })
        .catch((rs) => {
          console.log("Error such table found ", rs);
        });
    })();
  }
});

auth_router.get("/logout", function (req, res, next) {
  (async () => {
    await (async () => {
      req.session.is_admin = false;
      req.session.is_client = false;
      req.session.logged_in = false;
      req.session.user_id = "";
      req.session.uname = "";
    })().then(() => {
      res.json({ status: 202 });
      res.end();
    });
  })();
});

module.exports = auth_router;
