const express = require("express");
const auth_router = express.Router();
const bodyParser = require("body-parser");
var md5 = require("md5");
const oneDay = 1000 * 60 * 60 * 24;
auth_router.use(express.static(__dirname));
auth_router.use(bodyParser.urlencoded({ extended: true }));
const db = require("../db");
var this_date = new Date();
var day = String(this_date.getDate()).padStart(2, "0");
var m = String(this_date.getMonth() + 1).padStart(2, "0");
var year = this_date.getFullYear();
const today = `${year}-${m}-${day}`;
var upload = require("../middleware/multer");
const promise_query = (qr) => {
  return new Promise((resolve, reject) => {
    db.query(qr, (err, data) => {
      err ? reject(err) : resolve(data);
    });
  });
};      

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

auth_router.post("/client-login", upload.single(), async(req, res) => {
  var uname = req.body.um;
  var pwd = req.body.pd;
  if (uname && pwd) {
    var status
    qry = `SELECT * FROM clients WHERE email = '${uname}' AND password = '${md5(
      pwd
    )}';`;
    qry2 = `SELECT * FROM users WHERE username = '${uname}' AND password = '${md5(
      pwd
    )}';`;
    var data = await promise_query(qry)
    if (data.length == 0) {
      data = await promise_query(qry2);
      if (data.length == 0) {
        status = 404;
        data = [];
      } else {
        status = 203
        req.session.is_admin = true;
        req.session.is_client = false;
        req.session.logged_in = true;
        req.session.user_id = data[0].id;
        req.session.uname = data[0].username;
      }
    } else {
      status = 202;
      req.session.is_admin = false;
      req.session.is_client = true;
      req.session.logged_in = true;
      req.session.user_id = data[0].id;
      req.session.uname = data[0].email;
    }
    res.json({ status: status, raw: data });
    res.end();
  }
});

auth_router.post("/logout", async function (req, res, next) {
  req.session.destroy();
  res.json({ status: 202 });
  res.end();
});

module.exports = auth_router;




