"use strict"
const page_tittle_main = "MOTOREBIKE RENTAL SYSTEM";
const root_name = "admin";
const sub_name = "";
const admin_template_data = new Map([]);
const layout = new Map([]);
const map1 = new Map([]);
var removd = [];
var filtered;
var v2;
const rep = ne => {
    const l_slice = ne.slice(-1);
    if (l_slice === "/") {
        let url = ne;
        url = url.slice(0, -1);
        return url;
    }
    else {
        return ne;
    }
}

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
        , { "url": "/adstemplate/booking_list", "template": "booking_list" }
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
    admin_template_data.set(`/${root_name}/motorbikes`,{tittle: `${page_tittle_main} | ADMIN | BIKE LIST`,tag: "Motorbikes",layer: layout.get('layer'),content: layout.get('bike_list')})
    admin_template_data.set(`/${root_name}/motorbikes/add`,{tittle: `${page_tittle_main} | ADMIN | BIKE LIST`,tag: "Add Motorbike",layer: layout.get('layer'),content: layout.get('add_bike')})
    admin_template_data.set(`/${root_name}/bookinglist`,{tittle: `${page_tittle_main} | ADMIN | BOOKING LIST`,tag: "bookinglist",layer: layout.get('layer'),content: layout.get('booking_list')})
    admin_template_data.set(`/${root_name}/bookingreports`,{tittle: `${page_tittle_main} | ADMIN | BOOKING REPORTS`,tag: "bookingreports",layer: layout.get('layer'),content: layout.get('booking_report')})
    admin_template_data.set(`/${root_name}/clients`,{tittle: `${page_tittle_main} | ADMIN | Clients`,tag: "clients",layer: layout.get('layer'),content: layout.get('client_list')})
    admin_template_data.set(`/${root_name}/brandlist`,{tittle: `${page_tittle_main} | ADMIN | BRAND LIST`,tag: "brandlist",layer: layout.get('layer'),content: layout.get('brand_list')})
    admin_template_data.set(`/${root_name}/categorylist`,{tittle: `${page_tittle_main} | ADMIN | CATEGORY LIST`,tag: "categorylist",layer: layout.get('layer'),content: layout.get('category_list')})
};

const gathering = async (url, name) => {
    await $.ajax({
        url: url,
        method: "POST",
        dataType: "JSON",
        success: function (data) {
            map1.set(name, data.raw)
        },
        error: function (request, error) {
            alert(error);
        },
    });
};


async function initializer() {
    var subjects = [
        { "url": "/query/bike_list", "name": "bikes" },
        { "url": "/query/clients_list", "name": "users" },
        { "url": "/query/brands", "name": "brand_list" },
        { "url": "/query/categories", "name": "categories" },
        { "url": "/query/rent_list", "name": "rent_list" },
        { "url": "/query/bike_gallery", "name": "bike_gallery" },
        { "url": "/query/active_user", "name": "user" }
    ]
    for (let subj of subjects) {
        await gathering(subj.url, subj.name);
    }
    first_load();
}

function sbmt_in() {
    var nm = document.getElementById('uname').value;
    var pd = document.getElementById('pwd').value;
    if (!nm && pd) {
        Swal.fire(
            'Please input username',
        )
    }
    if (!pd && nm) {
        Swal.fire(
            'Please input password',
        )
    }
    if (!nm && !pd) {
        Swal.fire(
            'Please fill up filds',
        )
    }
    if (nm && pd) {
        $.ajax({
            url: "/auth/admin-login",
            method: "POST",
            data: { um: nm, pd: pd },
            dataType: "JSON",
            success: function (data) {
                if (data.status == 202) {
                    (async () => {
                        location.pathname = '/admin'
                        await initializer();
                    })();
                }
                else {
                    Swal.fire(
                        'No user founds',
                    )
                }
            },
            error: function (request, error) {
                alert(error);
            },
        });
    }
}

function strt(t_name) {
    if (t_name == "Add Motorbike") {
        t_name = "Motorbikes";
    } else if (t_name == "profile") {
        var a = document.getElementsByClassName('a');
        for (let i = 0; i < a.length; i++) {
            a[i].classList.remove('active')
        }
    } else {
        var a = document.getElementsByClassName('a');
        var elem = document.getElementById(t_name);
        for (let i = 0; i < a.length; i++) {
            a[i].classList.remove('active')
        }
        elem.classList.add("active");
    }
}


function next(ne) {
    document.getElementsByClassName("tag")[0].innerHTML = "";
    document.getElementsByClassName("bdy")[0].innerHTML = "";
    const ul = rep(ne);
    const entry = admin_template_data.get(ul.toLowerCase());
    document.getElementsByClassName("tag")[0].innerHTML = entry.tag;
    document.title = entry.tittle;
    history.pushState(null, entry.tittle, ne);
    strt(entry.tag);
    document.getElementsByClassName("bdy")[0].innerHTML = entry.content;
    console.log(entry.tag)
    page_data_loader(entry.tag);
}


function get_page(location) {
    var link = rep(location);
    var url = link.toLowerCase();
    var entry = admin_template_data.get(url);

    function normal_mode(){
        document.title = entry.tittle;
        history.pushState(null, entry.tittle, location);
        document.querySelector('.layer').innerHTML = entry.layer;
        console.log(document.querySelector('.layer').innerHTML)
        console.log(entry.content)
        entry.content ? document.querySelector('.bdy').innerHTML = entry.content : console.log("hello")
        page_data_loader(entry.tag);
    }
    entry ? normal_mode() : onlyContainsNumbers(result)? product_mode() : onlyContainsNumbers(result2)? book_mode() : "";
}



async function first_load() {
    await start();
    get_page(window.location.pathname)
}

function page_data_loader(tag) {
    if (tag == 'Home') {
        document.querySelector('.tc').classList.add('bg-gradient-primary')
        var date_now = today(new Date())
        var date_start_picker = document.querySelector('.date_start');
        var date_end_picker = document.querySelector('.date_end');
        date_start_picker.setAttribute('min', date_now);
        date_start_picker.setAttribute('value', date_now);
        date_start_picker.setAttribute('max', date_now);
        date_end_picker.setAttribute('min', today(addDays(new Date(date_now), 1)));
        date_end_picker.setAttribute('value', today(addDays(new Date(date_now), 1)));

        $(".date_start").change((a) => {
            if (a.target.value) {
                date_end_picker.min = today(addDays(new Date(a.target.value), 1))
            }
        })

        $(".date_end").change((a) => {
            date_start_picker.max = today(deductDays(new Date(a.target.value), 1));
        })
        var check_data = map_data.get('available_bikes')
        if (check_data && check_data.length > 0) {
            looper1();
        }
    } else if (tag == 'Sign-in') {
        var valid_u = map_data.get('active_u');
        if (valid_u.status == 202 || valid_u.status == 203) {
            get_page('/');
        }
    } else if (tag == 'Sign-up') {
        var valid_u = map_data.get('active_u');
        if (valid_u.status == 202 || valid_u.status == 203) {
            get_page('/');
        } else {
            $("#reg").keypress(function (event) {
                if (event.which == 13) {
                    event.preventDefault();
                    s_up();
                }
            });
        }
    } else if (tag == 'Categories') {
        document.querySelector('.tc2').classList.add('bg-gradient-primary')
        var odd_even = document.querySelector('.odd-even');
        var all_bikes = map_data.get('all_bikes');
        var all_categories = map_data.get('all_categories');
        var bikes = [];
        for (let loop = 0; loop < all_categories.length; loop++) {

            for (let loop2 = 0; loop2 < all_bikes.length; loop2++) {
                if(all_categories[loop].id == all_bikes[loop2].category_id){
                    console.log(all_categories[loop].id )
                    bikes.push(all_bikes[loop2])
                }
            };

            if(bikes.length != 0){
                odd_even.innerHTML += `
                <div class="col-lg-3">
                    <div class="position-sticky pb-lg-5 pb-3 mt-lg-0 mt-5 ps-2" style="top: 100px">
                        <h3>${all_categories[loop].category}</h3>
                    </div>
                </div>
    
                <div class="col-lg-9">
                    <div class="row mt-3 cat${all_categories[loop].id}">
                    </div>
                </div>
                `
                for (let loop3 = 0; loop3 < bikes.length; loop3++) {
                    var ct = document.querySelector(`.cat${all_categories[loop].id}`);
                    ct.innerHTML +=            
                    `
                    <div class="col-md-4">
                        <a onclick="get_page('/product/${bikes[loop3].id}');" href="javascript:;">
                            <div class="card shadow-lg move-on-hover min-height-160 min-height-160">
                                <img class="w-100 my-auto"
                                    src="${bikes[loop3].avatar}"
                                    alt="newsletter">
                            </div>
                            <div class="mt-2 ms-2">
                                <h6 class="mb-0">${bikes[loop3].bike_model}</h6>
                                <p class="text-secondary text-sm font-weight-normal">${bikes[loop3].description}</p>
                            </div>
                        </a>
                    </div>
                    `
                };
            }
          console.log(bikes.length)
          bikes = [];
        }
    } else if (tag == 'profile') {
        var valid_u = map_data.get('active_u');
        document.querySelector('.display_full_name').innerHTML = `${valid_u.raw[0].firstname.toUpperCase()} ${valid_u.raw[0].lastname.toUpperCase()}`;
        document.querySelector('.disp-id').placeholder = valid_u.raw[0].id;
        document.querySelector('.f_name').placeholder = valid_u.raw[0].firstname;
        document.querySelector('.l_name').placeholder = valid_u.raw[0].lastname;
        document.querySelector('.date_updated').placeholder = today(new Date(valid_u.raw[0].date_updated));
        document.querySelector('.date_added').placeholder = today(new Date(valid_u.raw[0].date_created));
        document.querySelector('.last_login').placeholder = today(new Date(valid_u.raw[0].last_login));
        document.querySelector('.u_name').placeholder = valid_u.raw[0].email;
        document.querySelector('.address').placeholder = valid_u.raw[0].address;
        document.querySelector('.contact').placeholder = valid_u.raw[0].contact;
        document.querySelector('.bct').innerHTML = valid_u.raw[0].gender;
        document.querySelector('.bct').setAttribute('data', valid_u.raw[0].gender)
    } else if (tag == 'my-bookings') {
        var b_list = map_data.get('my-bookings');
        var my_booking_list = document.querySelector('.my_booking_list');
        for (let loop = 0; loop < b_list.length; loop++) {
            var d_booked = new Date(b_list[loop].date_created), d_start = new Date(b_list[loop].date_start), d_end = new Date(b_list[loop].date_end), stats
            if (b_list[loop].status == "0") {
                stats =
                    `
                <span class="text-warning">PENDING</span>
                `;
            } else if (b_list[loop].status == "1") {
                stats =
                    `
                <span class="text-info">CONFIRMED</span>
                `;
            } else if (b_list[loop].status == "2") {
                stats =
                    `
                <span class="text-danger">CANCELLED</span>
                `;
            } else if (b_list[loop].status == "3") {
                stats =
                    `
                <span class="text-success">PICK UP</span>
                `;
            } else if (b_list[loop].status == "4") {
                stats =
                    `
                <span class="text-secondary">RETURNED</span>
                `;
            }
            my_booking_list.innerHTML += `
            <center>
            <tr class="text-center">
                <td>${b_list[loop].id}</td>
                <td>${d_booked.toLocaleDateString()}</td>
                <td>${d_start.toLocaleDateString()}</td>
                <td>${d_end.toLocaleDateString()}</td>
                <td>${stats}</td>
                <td>
                    <button d_id="${loop}" onclick="detail(this)" type="button" class="btn btn-link text-info ms-auto border-0" title="details" data-bs-toggle="modal" data-bs-target="#edt_cat"><i class="material-icons position-relative ms-auto text-lg me-1 my-auto">dehaze</i></button>
                </td>
            </tr>
            </center>
            `
        }
        $('#my_bookings').DataTable({
            dom: 'Bfrtip',
            language: {
                searchPlaceholder: "Search",
                search: "",
            },
            "bInfo": false,
            buttons: [],
            'columnDefs': [
                {
                    'searchable': false,
                    'targets': [-1],
                    bSortable: false,
                    aTargets: [-1, -2]
                },
            ]
        });
    }else if (tag == 'product') {
        console.log("hello world")
        var link = rep(window.location.pathname);
        var url = link.toLowerCase();
        var res = url.split("/");
        var pos = res.indexOf('product');
        var result = res[pos + 1];
        var onlyContainsNumbers = (str) => /^\d+$/.test(str);
        function on(){
            console.log(result)
            var all_bikes = map_data.get('all_bikes');
            var all_brands = map_data.get('all_brands');
            var all_categories = map_data.get('all_categories');
            var all_galleries = map_data.get('galleries');
            var bike = [], brand = [], category = [], galery = [], bike_id;
            for (var bikes of all_bikes) {
                result == bikes.id ? (bike.push(bikes), bike_id=bikes.id):""
            }
            for (var brands of all_brands) {
                bike[0].brand_id == brands.id ? brand.push(brands):""
            }
            for (var categories of all_categories) {
                console.log(categories.id)
                bike[0].category_id == categories.id ? category.push(categories):""
            }
            for (var galleries of all_galleries) {
                bike_id == galleries.bike_id ? galery.push(galleries):""
            }
            document.querySelector('.bike_name').innerHTML = bike[0].bike_model ? bike[0].bike_model : "N/A" 
            document.querySelector('.price').innerHTML =  bike[0].daily_rate ? bike[0].daily_rate : "N/A" 
            document.querySelector('.description').innerHTML = bike[0].description ? bike[0].description : "N/A" 
            document.querySelector('.category').innerHTML = category[0].category ? category[0].category : "N/A" 
            console.log(brand)
            document.querySelector('.brand').innerHTML = brand[0].name ? brand[0].name : "N/A" 
            document.querySelector('.product-avatar').innerHTML =
            `
                <img class="w-100 border-radius-lg shadow-lg mx-auto"
                src="${bike[0].avatar}" alt="chair">
            `
            var gal = document.querySelector('.galeries');
            gal.innerHTML = ""
            for (var galleries of all_galleries) {
                gal.innerHTML +=        
                `
               <div class="col-lg-4 col-md-6 mt-5 mt-md-1 mb-4" style="margin-bottom: 7vh !important;">
                   <div class="card" data-animation="true">
                       <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                           <a class="d-block blur-shadow-image">
                               <img src="${galleries.image}" class="img-fluid border-radius-lg" alt="Responsive image">
                           </a>
                           <div class="colored-shadow"
                               style="background-image: url(${galleries.image});">
                           </div>
                       </div>
                   </div>
               </div>
               `
            }









            var u = map_data.get('active_u');
            var unit_chicker = document.querySelector('.unit-chicker');
            function adds(){
                unit_chicker.innerHTML = ``
            }
            function not_adds(){
                unit_chicker.innerHTML = `
                <div class="row border-radius-md pb-4 p-3 mx-sm-0 mx-1 position-relative">
                    <div class="col-lg-3 mt-lg-n2 mt-2">
                        <div class="input-group input-group-static my-3">
                            <label>Date Start</label>
                            <input type="date" class="form-control date_start" onchange="startclear(this);">
                        </div>
                    </div>
                    <div class="col-lg-3 mt-lg-n2 mt-2">
                        <div class="input-group input-group-static my-3">
                            <label>Date end</label>
                            <input type="date" class="form-control date_end" onchange="endclear(this);">
                        </div>
                    </div>
                    <div class="col-lg-3 mt-lg-n2 chicker">
                        <label>&nbsp;</label>
                        <button type="button" class="btn bg-gradient-primary" style="margin-left: 7vh !important; bottom: 2vh !important;"
                            onclick="check_unit()">Check Availablity</button>
                    </div>
                    <span class="" id="sts"></span>
                </div>
                
                `
                var date_now = today(new Date())
                var date_start_picker = document.querySelector('.date_start');
                var date_end_picker = document.querySelector('.date_end');
                date_start_picker.setAttribute('min', date_now);
                date_start_picker.setAttribute('value', date_now);
                date_start_picker.setAttribute('max', date_now);
                date_end_picker.setAttribute('min', today(addDays(new Date(date_now), 1)));
                date_end_picker.setAttribute('value', today(addDays(new Date(date_now), 1)));
                $(".date_start").change((a) => {
                    if (a.target.value) {
                        date_end_picker.min = today(addDays(new Date(a.target.value), 1))
                    }
                })

                $(".date_end").change((a) => {
                    date_start_picker.max = today(deductDays(new Date(a.target.value), 1));
                })
            }
            u.status == 203 ? adds() : not_adds()
        }
        // make condition here if user admin client or guest
        onlyContainsNumbers(result) ? on() : console.log("display werror");
    }else if (tag == 'book') {
        var u = map_data.get('active_u');
        var link = rep(window.location.pathname);
        var url = link.toLowerCase();
        var res = url.split("/");
        var pos = res.indexOf('book');
        var result = res[pos + 1];
        var onlyContainsNumbers = (str) => /^\d+$/.test(str);
        function on(){
            console.log(result)
            var all_bikes = map_data.get('all_bikes');
            var all_brands = map_data.get('all_brands');
            var all_categories = map_data.get('all_categories');
            var all_galleries = map_data.get('galleries');
            var bike = [], brand = [], category = [], galery = [], bike_id;
            for (var bikes of all_bikes) {
                result == bikes.id ? (bike.push(bikes), bike_id=bikes.id):""
            }
            for (var brands of all_brands) {
                bike[0].brand_id == brands.id ? brand.push(brands):""
            }
            for (var categories of all_categories) {
                console.log(categories.id)
                bike[0].category_id == categories.id ? category.push(categories):""
            }
            for (var galleries of all_galleries) {
                bike_id == galleries.bike_id ? galery.push(galleries):""
            }
            document.querySelector('.bike_name').innerHTML = bike[0].bike_model ? bike[0].bike_model : "N/A" 
            document.querySelector('.price').innerHTML =  bike[0].daily_rate ? bike[0].daily_rate : "N/A" 
            document.querySelector('.description').innerHTML = bike[0].description ? bike[0].description : "N/A" 
            document.querySelector('.category').innerHTML = category[0].category ? category[0].category : "N/A" 
            console.log(brand)
            document.querySelector('.brand').innerHTML = brand[0].name ? brand[0].name : "N/A" 
            document.querySelector('.product-avatar').innerHTML =
            `
                <img class="w-100 border-radius-lg shadow-lg mx-auto"
                src="${bike[0].avatar}" alt="chair">
            `
            var gal = document.querySelector('.galeries');
            gal.innerHTML = ""
            for (var galleries of all_galleries) {
                gal.innerHTML +=        
                `
               <div class="col-lg-4 col-md-6 mt-5 mt-md-1 mb-4" style="margin-bottom: 7vh !important;">
                   <div class="card" data-animation="true">
                       <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                           <a class="d-block blur-shadow-image">
                               <img src="${galleries.image}" class="img-fluid border-radius-lg" alt="Responsive image">
                           </a>
                           <div class="colored-shadow"
                               style="background-image: url(${galleries.image});">
                           </div>
                       </div>
                   </div>
               </div>
               `
            }

            var unit_chicker = document.querySelector('.unit-chicker');
            function adds(){
                unit_chicker.innerHTML = ``
            }
            function not_adds(){
                unit_chicker.innerHTML = `
                <div class="row border-radius-md pb-4 p-3 mx-sm-0 mx-1 position-relative">
                    <div class="col-lg-3 mt-lg-n2 mt-2">
                        <div class="input-group input-group-static my-3">
                            <label>Date Start</label>
                            ${from[0]}
                        </div>
                    </div>
                    <div class="col-lg-3 mt-lg-n2 mt-2">
                        <div class="input-group input-group-static my-3">
                            <label>Date end</label>
                            ${to[0]}
                        </div>
                    </div>
                    <div class="col-lg-3 mt-lg-n2 chicker">
                        <label>&nbsp;</label>
                        <button type="button" class="btn bg-gradient-success" style="margin-left: 7vh !important; bottom: 2vh !important;"
                            onclick="check_unit()">BOOK NOW</button>
                    </div>
                    <span class="" id="sts"></span>
                </div>
                
                `
            }
            u.status == 203 ? adds() : not_adds()
            
        }
        // make condition here if user admin client or guest
        onlyContainsNumbers(result) && from[0] ? on() : (document.querySelector('.layer').innerHTML = `<h1>404 NOT FOUND </h1>`, document.querySelector('.sub-layer').innerHTML = ``);
    }else if (tag == 'About') {
        document.querySelector('.tc3').classList.add('bg-gradient-primary')
    }
}



window.addEventListener("load", first_load(), false);
