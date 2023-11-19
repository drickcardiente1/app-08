"use strict"
const layout = new Map([]);
const map_data = new Map([]);
const c_plate = new Map([]);
var from = [], to = []
const rep = ne => {
    var l_slice = ne.slice(-1);
    if (l_slice === "/") {
        let url = ne;
        url = url.slice(0, -1);
        return url;
    }
    else {
        return ne;
    }
}

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
    for (let procedure of static_template) {
        await templating(procedure.url, procedure.template);
    }
    c_plate.set(``,{tittle: `TE Motorbikes | Home`,tag: "Home",layer: layout.get('layer'),content: layout.get('home')})
    c_plate.set(`/categories`,{tittle: `TE Motorbikes | Categories`,tag: "Categories",layer: layout.get('layer'),content: layout.get('categories')})
    c_plate.set(`/about`,{tittle: `TE Motorbikes | About`,tag: "About",layer: layout.get('layer'),content: layout.get('about')})
    c_plate.set(`/sign-in`,{tittle: `TE Motorbikes | Sign-in`,tag: "Sign-in",layer: layout.get('layer'),content: layout.get('login')})
    c_plate.set(`/sign-up`,{tittle: `TE Motorbikes | Sign-up`,tag: "Sign-up",layer: layout.get('layer'),content: layout.get('signup')})
    c_plate.set(`/profile`,{tittle: `TE Motorbikes | My Account Details`,tag: "profile",layer: layout.get('layer'),content: layout.get('profile')})
    c_plate.set(`/my-bookings`,{tittle: `TE Motorbikes | My bookings`,tag: "my-bookings",layer: layout.get('layer'),content: layout.get('bookings')})
    c_plate.set(`/product`,{tittle: `TE Motorbikes | product`,tag: "product",layer: layout.get('layer'),content: layout.get('product')})
    c_plate.set(`/book`,{tittle: `TE Motorbikes | BOOK`,tag: "book",layer: layout.get('layer'),content: layout.get('bookings')})
};










function sidebar_format() {
    var valid_u = map_data.get('active_u');
    if (valid_u.status == 202) {
        document.querySelector('.prf').innerHTML =
            `
            <img alt="Image"
            src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/material-design-system/presentation/account/error-404.jpg"
            class="avatar">
            <div class="ms-3">
                <h6 class="mb-0 d-block text-md text-white" style="color: blue !important;">${valid_u.raw[0].firstname.toUpperCase()} ${valid_u.raw[0].lastname.toUpperCase()}</h6>
                <span class="text-sm text-white opacity-8">ACCOUNT TYPE : CLIENT</span>
            </div>
        `
        document.querySelector('.profile_context').innerHTML =
            `
            <hr class="horizontal dark my-3">
            <center>
                <div class="buttons mb-0">
                    <button type="button" onclick="get_page('/profile')" class="btn btn-rounded btn-outline-secondary">Manage Account</button>
                </div>
            </center>
            <hr class="horizontal dark my-3" style="margin-top: 0 !important;">
            <center>
                <div class="buttons">
                    <button type="button" onclick="get_page('/my-bookings')" class="btn btn-rounded btn-outline-secondary">My Booking</button>
                </div>
            </center>
            <hr class="horizontal dark my-3" style="margin-top: 0 !important;">
            <center>
                <div class="buttons">
                    <button type="button" onclick='sign_out_admin()' class="btn btn-rounded btn-outline-secondary">Sign out</button>
                </div>
            </center>
            <hr class="horizontal dark my-3"  style="margin-top: 0 !important;">
        `
    } else if (valid_u.status == 203) {
        document.querySelector('.prf').innerHTML =
            `
            <img alt="Image"
            src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/material-design-system/presentation/account/error-404.jpg"
            class="avatar">
            <div class="ms-3">
                <h6 style="color: blue !important;" class="mb-0 d-block text-white">${valid_u.raw[0].firstname.toUpperCase()} ${valid_u.raw[0].lastname.toUpperCase()}</h6>
                <span class="text-sm text-white opacity-8">ACCOUNT TYPE : ADMIN</span>
            </div>

        `
        document.querySelector('.profile_context').innerHTML =
            `
            <hr class="horizontal dark my-3">
                <center>
                    <div class="buttons">
                        <button type="button" onclick="window.location.href='/admin'" class="btn btn-rounded bg-gradient-primary mt-4">Admin page</button>
                    </div>
                </center>
            <hr class="horizontal dark my-3">
            <center>
                    <div class="buttons">
                        <button type="button" onclick='sign_out_admin()' class="btn btn-rounded btn-outline-secondary mt-4 ms-2">Sign out</button>
                    </div>
                </center>
            <hr class="horizontal dark my-3">
        `
    } else {
        document.querySelector('.prf').innerHTML =
            `
        <div class="ms-3">
            <h6 class="mb-0 d-block text-white">Guest</h6>
        </div>
        `
        document.querySelector('.profile_context').innerHTML =
            `
        <center>
            <div class="buttons">
                <p>Sign in or Sign up</p>
                <button type="button" onclick="get_page('/sign-in')" class="btn btn-rounded bg-gradient-primary mt-4">Sign in</button>
                <button type="button" onclick="get_page('/sign-up')" class="btn btn-rounded btn-outline-secondary mt-4 ms-2">Sign up</button>
            </div>
        </center>
        `
    }
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
        var link = rep(window.location.pathname);
        var url = link.toLowerCase();
        var res = url.split("/");
        var pos = res.indexOf('product');
        var result = res[pos + 1];
        var onlyContainsNumbers = (str) => /^\d+$/.test(str);
        function on(){
            var all_bikes = map_data.get('all_bikes');
            var all_brands = map_data.get('all_brands');
            var all_categories = map_data.get('all_categories');
            var all_galleries = map_data.get('galleries');
            var bike = [], brand = [], category = [], galery = [], bike_id;
            (async () => {
                for (var bikes of all_bikes) {
                    await result == bikes.id ? (bike.push(bikes), bike_id=bikes.id): ""
                }
            })();
            for (var brands of all_brands) {
                bike[0].brand_id == brands.id ? brand.push(brands):""
            }
            for (var categories of all_categories) {
                bike[0].category_id == categories.id ? category.push(categories):""
            }
            for (var galleries of all_galleries) {
                bike_id == galleries.bike_id ? galery.push(galleries):""
            }
            document.querySelector('.bike_name').innerHTML = bike[0].bike_model ? bike[0].bike_model : "N/A" 
            document.querySelector('.price').innerHTML =  bike[0].daily_rate ? bike[0].daily_rate : "N/A" 
            document.querySelector('.description').innerHTML = bike[0].description ? bike[0].description : "N/A" 
            document.querySelector('.category').innerHTML = category[0].category ? category[0].category : "N/A" 
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
        onlyContainsNumbers(result) ? on() : "";
    }else if (tag == 'book') {
        var u = map_data.get('active_u');
        var link = rep(window.location.pathname);
        var url = link.toLowerCase();
        var res = url.split("/");
        var pos = res.indexOf('book');
        var result = res[pos + 1];
        var onlyContainsNumbers = (str) => /^\d+$/.test(str);
        function on(){
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
                bike[0].category_id == categories.id ? category.push(categories):""
            }
            for (var galleries of all_galleries) {
                bike_id == galleries.bike_id ? galery.push(galleries):""
            }
            document.querySelector('.bike_name').innerHTML = bike[0].bike_model ? bike[0].bike_model : "N/A" 
            document.querySelector('.price').innerHTML =  bike[0].daily_rate ? bike[0].daily_rate : "N/A" 
            document.querySelector('.description').innerHTML = bike[0].description ? bike[0].description : "N/A" 
            document.querySelector('.category').innerHTML = category[0].category ? category[0].category : "N/A" 
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
            url: "/auth/client-login",
            method: "POST",
            data: { um: nm, pd: pd },
            dataType: "JSON",
            success: function (data) {
                if (data.status == 202) {
                    map_data.set('active_u', data.raw)
                    initializer();
                    get_page('/');
                    first_load();
                } else if (data.status == 203) {
                    window.location.href = '/admin'
                }
                else {
                    map_data.set('active_u', '')
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

function looper1() {
    var starts = document.querySelector('.date_start').value;
    var ends = document.querySelector('.date_end').value;
    var home_result = document.querySelector('.home_result');
    var to_load = map_data.get('available_bikes')
    from = []
    to = []
    from.push(starts)
    to.push(ends)
    home_result.innerHTML =
        `
    <div class="row pt-lg-6">
        <div class="col-lg-3">
            <div class="position-sticky pb-lg-5 pb-3 mt-lg-0 mt-5 ps-2" style="top: 100px">
                <h3>Available Motorbikes</h3>
                <h6 class="text-secondary font-weight-normal pe-3">From : ${starts} <br>
                    To : ${ends} </h6>
            </div>
        </div>
        <div class="col-lg-9">
            <div class="row mt-3 looper">
            </div>
        </div>
    </div>
    `
    var u = map_data.get('active_u');
    for (let loop = 0; loop < to_load.length; loop++) {
        document.querySelector('.looper').innerHTML +=
            `
        <div class="col-md-4 mt-md-0 mt-4">
            <a onclick="get_page('/book/${to_load[loop].id}'); datefrom_to();" href="javascript:;" >
                <div class="card move-on-hover">
                    <img class="w-100"
                        src="${to_load[loop].avatar}"
                        loading="lazy" alt="chat">
                </div>
                <div class="mt-2 ms-2">
                    <h6 class="mb-0">${to_load[loop].bike_model}</h6>
                </div>
            </a>
        </div>
        `;
    }
    function add_loop(){
        for (let loop = 0; loop < to_load.length; loop++) {
            document.querySelector('.looper').innerHTML +=
                `
            <div class="col-md-4 mt-md-0 mt-4">
                <a onclick="get_page('/book/${to_load[loop].id}'); datefrom_to();" href="javascript:;" >
                    <div class="card move-on-hover">
                        <img class="w-100"
                            src="${to_load[loop].avatar}"
                            loading="lazy" alt="chat">
                    </div>
                    <div class="mt-2 ms-2">
                        <h6 class="mb-0">${to_load[loop].bike_model}</h6>
                    </div>
                </a>
            </div>
            `;
        }
        functi
    }
}

function book_mode(){
    var check_var = false;
    request_all_b();
    var all_bikes = map_data.get('all_bikes');
    for (let loop = 0; loop < all_bikes.length; loop++) {
        if (all_bikes[loop].id == result2) {
            check_var = true;
        }
    }
    check_var ? book_page() : "";
}







function get_page(relocate) {
    var link = rep(relocate);
    var url = link.toLowerCase();
    var entry = c_plate.get(url);
    var res = url.split("/");
    var pos = res.indexOf('product');
    var result = res[pos + 1];
    var pos2 = res.indexOf('book');
    var result2 = res[pos2 + 1];
    var onlyContainsNumbers = (str) => /^\d+$/.test(str);

    function normal_mode(){
        document.title = entry.tittle;
        history.pushState(null, entry.tittle, relocate);
        document.querySelector('.layer').innerHTML = entry.layer;
        document.querySelector('.content').innerHTML = entry.content;
        sidebar_format();
        page_data_loader(entry.tag);
    }
    function product_page(){
        var product_entry = c_plate.get('/product');
        document.title = product_entry.tittle + `| ${result}`;
        history.pushState(null, product_entry.tittle, `/product/${result}`);
        document.querySelector('.layer').innerHTML = product_entry.layer;
        document.querySelector('.content').innerHTML = product_entry.content;
        sidebar_format();
        page_data_loader(product_entry.tag);
    }
    function product_mode(){
        var check_var = false;
        request_all_b();
        var all_bikes = map_data.get('all_bikes');
        for (let loop = 0; loop < all_bikes.length; loop++) {
            if (all_bikes[loop].id == result) {
                check_var = true;
            }
        }
        check_var ? product_page() : "";
    }

    var onlyContainsNumbers = (str) => /^\d+$/.test(str);
    entry ? normal_mode() : onlyContainsNumbers(result)? product_mode() : onlyContainsNumbers(result2)? book_mode() : "";
}

async function check_availble() {
    var starts = document.querySelector('.date_start').value;
    var ends = document.querySelector('.date_end').value;
    await $.ajax({
        url: "/client_query/available_bikes",
        data: { start: starts, ends: ends },
        method: "POST",
        dataType: "JSON",
        success: function (data) {
            map_data.set('available_bikes', data.data);
            looper1();
        },
        error: function (request, error) {
            alert(error);
        },
    });
}

async function request_actor() {
    await $.ajax({
        url: '/client_query/u_active',
        method: "POST",
        dataType: "JSON",
        success: function (data) {
            map_data.set('active_u', data)
        },
        error: function (request, error) {
            alert(error);
        },
    });
}

async function request_my_bookings() {
    await $.ajax({
        url: '/client_query/my_bookings',
        method: "POST",
        dataType: "JSON",
        success: function (data) {
            map_data.set('my-bookings', data.raw);
        },
        error: function (request, error) {
            alert(error);
        },
    });
}

async function request_all_b() {
    await $.ajax({
        url: '/client_query/all_bikes',
        method: "POST",
        dataType: "JSON",
        success: function (data) {
            map_data.set('all_bikes', data.raw);
        },
        error: function (request, error) {
            alert(error);
        },
    });
}

async function request_all_brands() {
    await $.ajax({
        url: '/client_query/all_brands',
        method: "POST",
        dataType: "JSON",
        success: function (data) {
            map_data.set('all_brands', data.raw);
        },
        error: function (request, error) {
            alert(error);
        },
    });
}

async function request_all_categories() {
    await $.ajax({
        url: '/client_query/all_categories',
        method: "POST",
        dataType: "JSON",
        success: function (data) {
            map_data.set('all_categories', data.raw);
        },
        error: function (request, error) {
            alert(error);
        },
    });
}

async function request_galleries() {
    await $.ajax({
        url: '/client_query/galleries',
        method: "POST",
        dataType: "JSON",
        success: function (data) {
            map_data.set('galleries', data.raw);
        },
        error: function (request, error) {
            alert(error);
        },
    });
}


async function initializer() {
    await request_actor();
    await request_my_bookings();
    await request_all_b();
    await request_all_brands();
    await request_all_categories();
    await request_galleries();
    var actor = map_data.get('active_u');
    if(actor.status == 202){
        document.querySelector('.sub-layer').innerHTML = layout.get('msg')
    }else{
        document.querySelector('.sub-layer').innerHTML = ""
    }
}


async function first_load() {
    await start()
    await initializer();
    get_page(window.location.pathname)
}

window.addEventListener("load", first_load(), true);

