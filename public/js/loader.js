"use strict"
const page_tittle_main = "MOTOREBIKE RENTAL SYSTEM";
const root_name = "admin";
const sub_name = "";
const admin_template_data = new Map([]);
const map1 = new Map([]);
const layout = new Map([]);
var removd = [];
var filtered;
var v2;

const templating = async (url, name) => {
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
};

const start = async () => {
    var static_template = [
        { "url": "/adstemplate/add_bike", "template": "add_bike" }
        , { "url": "/adstemplate/bike_list", "template": "bike_list" }
        , { "url": "/adstemplate/booking_list", "template": "about" }
        , { "url": "/adstemplate/booking_report", "template": "booking_report" }
        , { "url": "/adstemplate/brand_list", "template": "brand_list" }
        , { "url": "/adstemplate/category_list", "template": "category_list" }
        , { "url": "/adstemplate/client_list", "template": "client_list" }
        , { "url": "/adstemplate/client_profile", "template": "client_profile" }
        , { "url": "/adstemplate/dashboard", "template": "dashboard" }
        , { "url": "/adstemplate/layer-index", "template": "layer-index" }
        , { "url": "/adstemplate/layer-s-in", "template": "layer-s-in" }
        , { "url": "/adstemplate/profile", "template": "profile" }
    ]
    for (let procedure of static_template) {
        await templating(procedure.url, procedure.template);
    }
    admin_template_data.set(`/${root_name}`,{tittle: `${page_tittle_main} | ADMIN | Dashboard`,tag: "dashboard",layer: layout.get('layer-index'),content: layout.get('dashboard')})

    admin_template_data.set(`/${root_name}/profile`,{tittle: `${page_tittle_main} | ADMIN | Dashboard`,tag: "profile",layer: layout.get('layer'),content: layout.get('profile')})
    
    admin_template_data.set(`/${root_name}/sign-in`,{tittle: `${page_tittle_main} | ADMIN | Sign-in`,layer: layout.get('layer-s-in')})

    admin_template_data.set(`/sign-in`,{tittle: `TE Motorbikes | Sign-in`,tag: "Sign-in",layer: layout.get('layer'),content: layout.get('login')})
    admin_template_data.set(`/sign-up`,{tittle: `TE Motorbikes | Sign-up`,tag: "Sign-up",layer: layout.get('layer'),content: layout.get('signup')})
    admin_template_data.set(`/profile`,{tittle: `TE Motorbikes | My Account Details`,tag: "profile",layer: layout.get('layer'),content: layout.get('profile')})
    admin_template_data.set(`/my-bookings`,{tittle: `TE Motorbikes | My bookings`,tag: "my-bookings",layer: layout.get('layer'),content: layout.get('bookings')})
    admin_template_data.set(`/product`,{tittle: `TE Motorbikes | product`,tag: "product",layer: layout.get('layer'),content: layout.get('product')})
    admin_template_data.set(`/book`,{tittle: `TE Motorbikes | BOOK`,tag: "book",layer: layout.get('layer'),content: layout.get('product')})
};

async function re_load(loc) {
    await start();
    if (loc == "/admin/sign-in/" || loc == "/admin/sign-in" || loc == "/sign-in/" || loc == "/sign-in") {
        console.log("h1")
        first_load(loc);
    } else {
        console.log("h2");
        request_all()
    }
}

const first_load = (loc) => {
    if (loc == "/admin/sign-in/" || loc == "/admin/sign-in" || loc == "/sign-in/" || loc == "/sign-in") {
        layer.innerHTML = "";
        const ul = rep(loc);
        const entry = admin_template_data.get(ul.toLowerCase());
        document.title = entry.tittle;
        history.pushState(null, entry.tittle, loc);
        layer.innerHTML += entry.layer;
    } else {
        layer.innerHTML = "";
        const ul = rep(loc);
        const entry = admin_template_data.get(ul.toLowerCase());
        try{
            document.title = entry.tittle;
            history.pushState(null, entry.tittle, loc);
            layer.innerHTML = entry.layer;
            added();
            next(ul);
        }catch{
            document.title = `PAGE NOT FOUND`;
        }
    }
}

var loc = window.location.pathname.toLowerCase();
window.addEventListener("load", re_load(loc), false);
