"use strict"
const layout = new Map([]);
const map_data = new Map([]);
var from = [], to = []

function today(d_now) {
    var dc = new Date(d_now)
    var day = String(dc.getDate()).padStart(2, '0');
    var month = String(dc.getMonth() + 1).padStart(2, '0');
    var year = String(dc.getFullYear());
    return `${year}-${month}-${day}`
}

function addDays(date, days) {
    var currentDate = date.getDate();
    date.setDate(currentDate + days);
    return date;
}

function deductDays(date, days) {
    var currentDate = date.getDate();
    date.setDate(currentDate - days);
    return date;
}

const templating = async(url, name) => {
    console.log("templating start")
    await $.ajax({
        url: url,
        method: "POST",
        dataType: "JSON",
        success: function (data) {
            layout.set(name, data)
        },
        error: function (request, error) {
            alert(error);
        },
    });
    console.log("templating end")
};

const start = async() => {
    var static_template = [
        { "url": "/template/client_layer", "template": "layer" }
        , { "url": "/template/client_home", "template": "home" }
        , { "url": "/template/client_about", "template": "about" }
        , { "url": "/template/client_brands", "template": "brands" }
        , { "url": "/template/client_categories", "template": "categories" }
        , { "url": "/template/client_login", "template": "login" }
        , { "url": "/template/client_msg", "template": "msg" }
        , { "url": "/template/client_bookings", "template": "bookings" }
        , { "url": "/template/client_product", "template": "product" }
        , { "url": "/template/client_profile", "template": "profile" }
        , { "url": "/template/client_signup", "template": "signup" }
    ]
    console.log("starting loop")
    for (let procedure of static_template){
        console.log("starting insertion")
        await templating(procedure.url, procedure.template);
        console.log("end insertion")
    }
    console.log("ending")
};


(async () => {
    await start();
    console.log(layout);
})();