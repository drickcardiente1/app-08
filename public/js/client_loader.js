"use strict"


function getFile(U) {
    var X = new XMLHttpRequest();
    X.open('GET', U, false);
    X.send();
    return X.responseText;
}
const layout = new Map([]);
const map_data = new Map([]);
var from = [], to = []

async function firstFunction(){
    console.log("starting")
    await $.ajax({
        url: "/template/client-layer",
        method: "POST",
        dataType: "JSON",
        success: function (data) {
            console.log(data)
        },
        error: function (request, error) {
            alert(error);
        },
    });
    console.log("next");
    await $.ajax({
        url: "/template/client-home",
        method: "POST",
        dataType: "JSON",
        success: function (data) {
            console.log(data)
        },
        error: function (request, error) {
            alert(error);
        },
    });
    console.log("exiting");
}


(async () => {
    await firstFunction()
    console.log("hello world 2")
})();




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

function datefrom_to(){
    console.log(from, to)
}


// const c_plate = new Map([

//     [
//         ``,
//         {
//             tittle: `TE Motorbikes | Home`,
//             tag: "Home",
//             layer: getFile("../../pages/client_partials/layer.html"),
//             content: getFile("../../pages/client_partials/home_content.html"),
//         },
//     ],

//     [
//         `/categories`,
//         {
//             tittle: `TE Motorbikes | Categories`,
//             tag: "Categories",
//             layer: getFile("../../pages/client_partials/layer.html"),
//             content: getFile("../../pages/client_partials/categories_content.html"),
//         },
//     ],


//     [
//         `/about`,
//         {
//             tittle: `TE Motorbikes | About`,
//             tag: "About",
//             layer: getFile("../../pages/client_partials/layer.html"),
//             content: getFile("../../pages/client_partials/about_content.html"),
//         },
//     ],

//     [
//         `/sign-in`,
//         {
//             tittle: `TE Motorbikes | Sign-in`,
//             tag: "Sign-in",
//             layer: getFile("../../pages/client_partials/layer.html"),
//             content: getFile("../../pages/client_partials/log-in.html"),
//         },
//     ],

//     [
//         `/sign-up`,
//         {
//             tittle: `TE Motorbikes | Sign-up`,
//             tag: "Sign-up",
//             layer: getFile("../../pages/client_partials/layer.html"),
//             content: getFile("../../pages/client_partials/sign-up.html"),
//         },
//     ],

//     [
//         `/profile`,
//         {
//             tittle: `TE Motorbikes | My Account Details`,
//             tag: "profile",
//             layer: getFile("../../pages/client_partials/layer.html"),
//             content: getFile("../../pages/client_partials/profile.html"),
//         },
//     ],

//     [
//         `/my-bookings`,
//         {
//             tittle: `TE Motorbikes | My bookings`,
//             tag: "my-bookings",
//             layer: getFile("../../pages/client_partials/layer.html"),
//             content: getFile("../../pages/client_partials/my_bookings.html"),
//         },
//     ],

//     [
//         `/product`,
//         {
//             tittle: `TE Motorbikes | product`,
//             tag: "product",
//             layer: getFile("../../pages/client_partials/layer.html"),
//             content: getFile("../../pages/client_partials/product.html"),
//         },
//     ],

//     [
//         `/book`,
//         {
//             tittle: `TE Motorbikes | BOOK`,
//             tag: "book",
//             layer: getFile("../../pages/client_partials/layer.html"),
//             content: getFile("../../pages/client_partials/product.html"),
//         },
//     ],
// ]);

// function startclear(ths) {
//     if (ths.value == '') {
//         ths.value = today(new Date());
//     }
// }


// function endclear(ths) {
//     if (ths.value == '') {
//         document.querySelector('.date_start').value = today(new Date());;
//         ths.value = today(addDays(new Date(), 1))
//         ths.min = today(addDays(new Date(), 1))
//     }
// }

// function looper1() {
//     var starts = document.querySelector('.date_start').value;
//     var ends = document.querySelector('.date_end').value;
//     var home_result = document.querySelector('.home_result');
//     var to_load = map_data.get('available_bikes')
//     console.log(to_load)
//     from = []
//     to = []
//     from.push(starts)
//     to.push(ends)
//     home_result.innerHTML =
//         `
//     <div class="row pt-lg-6">
//         <div class="col-lg-3">
//             <div class="position-sticky pb-lg-5 pb-3 mt-lg-0 mt-5 ps-2" style="top: 100px">
//                 <h3>Available Motorbikes</h3>
//                 <h6 class="text-secondary font-weight-normal pe-3">From : ${starts} <br>
//                     To : ${ends} </h6>
//             </div>
//         </div>
//         <div class="col-lg-9">
//             <div class="row mt-3 looper">
//             </div>
//         </div>
//     </div>
//     `
//     var u = map_data.get('active_u');
//     for (let loop = 0; loop < to_load.length; loop++) {
//         document.querySelector('.looper').innerHTML +=
//             `
//         <div class="col-md-4 mt-md-0 mt-4">
//             <a onclick="get_page('/book/${to_load[loop].id}'); datefrom_to();" href="javascript:;" >
//                 <div class="card move-on-hover">
//                     <img class="w-100"
//                         src="${to_load[loop].avatar}"
//                         loading="lazy" alt="chat">
//                 </div>
//                 <div class="mt-2 ms-2">
//                     <h6 class="mb-0">${to_load[loop].bike_model}</h6>
//                 </div>
//             </a>
//         </div>
//         `;
//     }
//     function add_loop(){
//         for (let loop = 0; loop < to_load.length; loop++) {
//             document.querySelector('.looper').innerHTML +=
//                 `
//             <div class="col-md-4 mt-md-0 mt-4">
//                 <a onclick="get_page('/book/${to_load[loop].id}'); datefrom_to();" href="javascript:;" >
//                     <div class="card move-on-hover">
//                         <img class="w-100"
//                             src="${to_load[loop].avatar}"
//                             loading="lazy" alt="chat">
//                     </div>
//                     <div class="mt-2 ms-2">
//                         <h6 class="mb-0">${to_load[loop].bike_model}</h6>
//                     </div>
//                 </a>
//             </div>
//             `;
//         }
//         functi
//     }
// }

// function sidebar_format() {
//     var valid_u = map_data.get('active_u');
//     if (valid_u.status == 202) {
//         document.querySelector('.prf').innerHTML =
//             `
//             <img alt="Image"
//             src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/material-design-system/presentation/account/error-404.jpg"
//             class="avatar">
//             <div class="ms-3">
//                 <h6 class="mb-0 d-block text-md text-white" style="color: blue !important;">${valid_u.raw[0].firstname.toUpperCase()} ${valid_u.raw[0].lastname.toUpperCase()}</h6>
//                 <span class="text-sm text-white opacity-8">ACCOUNT TYPE : CLIENT</span>
//             </div>
//         `
//         document.querySelector('.profile_context').innerHTML =
//             `
//             <hr class="horizontal dark my-3">
//             <center>
//                 <div class="buttons mb-0">
//                     <button type="button" onclick="get_page('/profile')" class="btn btn-rounded btn-outline-secondary">Manage Account</button>
//                 </div>
//             </center>
//             <hr class="horizontal dark my-3" style="margin-top: 0 !important;">
//             <center>
//                 <div class="buttons">
//                     <button type="button" onclick="get_page('/my-bookings')" class="btn btn-rounded btn-outline-secondary">My Booking</button>
//                 </div>
//             </center>
//             <hr class="horizontal dark my-3" style="margin-top: 0 !important;">
//             <center>
//                 <div class="buttons">
//                     <button type="button" onclick='sign_out_admin()' class="btn btn-rounded btn-outline-secondary">Sign out</button>
//                 </div>
//             </center>
//             <hr class="horizontal dark my-3"  style="margin-top: 0 !important;">
//         `
//     } else if (valid_u.status == 203) {
//         document.querySelector('.prf').innerHTML =
//             `
//             <img alt="Image"
//             src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/material-design-system/presentation/account/error-404.jpg"
//             class="avatar">
//             <div class="ms-3">
//                 <h6 style="color: blue !important;" class="mb-0 d-block text-white">${valid_u.raw[0].firstname.toUpperCase()} ${valid_u.raw[0].lastname.toUpperCase()}</h6>
//                 <span class="text-sm text-white opacity-8">ACCOUNT TYPE : ADMIN</span>
//             </div>

//         `
//         document.querySelector('.profile_context').innerHTML =
//             `
//             <hr class="horizontal dark my-3">
//                 <center>
//                     <div class="buttons">
//                         <button type="button" onclick="window.location.href='/admin'" class="btn btn-rounded bg-gradient-primary mt-4">Admin page</button>
//                     </div>
//                 </center>
//             <hr class="horizontal dark my-3">
//             <center>
//                     <div class="buttons">
//                         <button type="button" onclick='sign_out_admin()' class="btn btn-rounded btn-outline-secondary mt-4 ms-2">Sign out</button>
//                     </div>
//                 </center>
//             <hr class="horizontal dark my-3">
//         `
//     } else {
//         document.querySelector('.prf').innerHTML =
//             `
//         <div class="ms-3">
//             <h6 class="mb-0 d-block text-white">Guest</h6>
//         </div>
//         `
//         document.querySelector('.profile_context').innerHTML =
//             `
//         <center>
//             <div class="buttons">
//                 <p>Sign in or Sign up</p>
//                 <button type="button" onclick="get_page('/sign-in')" class="btn btn-rounded bg-gradient-primary mt-4">Sign in</button>
//                 <button type="button" onclick="get_page('/sign-up')" class="btn btn-rounded btn-outline-secondary mt-4 ms-2">Sign up</button>
//             </div>
//         </center>
//         `
//     }
// }

// function page_data_loader(tag) {
//     if (tag == 'Home') {
//         document.querySelector('.tc').classList.add('bg-gradient-primary')
//         var date_now = today(new Date())
//         var date_start_picker = document.querySelector('.date_start');
//         var date_end_picker = document.querySelector('.date_end');
//         date_start_picker.setAttribute('min', date_now);
//         date_start_picker.setAttribute('value', date_now);
//         date_start_picker.setAttribute('max', date_now);
//         date_end_picker.setAttribute('min', today(addDays(new Date(date_now), 1)));
//         date_end_picker.setAttribute('value', today(addDays(new Date(date_now), 1)));

//         $(".date_start").change((a) => {
//             if (a.target.value) {
//                 date_end_picker.min = today(addDays(new Date(a.target.value), 1))
//             }
//         })

//         $(".date_end").change((a) => {
//             date_start_picker.max = today(deductDays(new Date(a.target.value), 1));
//         })
//         var check_data = map_data.get('available_bikes')
//         if (check_data && check_data.length > 0) {
//             looper1();
//         }
//     } else if (tag == 'Sign-in') {
//         var valid_u = map_data.get('active_u');
//         if (valid_u.status == 202 || valid_u.status == 203) {
//             get_page('/');
//         }
//     } else if (tag == 'Sign-up') {
//         var valid_u = map_data.get('active_u');
//         if (valid_u.status == 202 || valid_u.status == 203) {
//             get_page('/');
//         } else {
//             $("#reg").keypress(function (event) {
//                 if (event.which == 13) {
//                     event.preventDefault();
//                     s_up();
//                 }
//             });
//         }
//     } else if (tag == 'Categories') {
//         document.querySelector('.tc2').classList.add('bg-gradient-primary')
//         var odd_even = document.querySelector('.odd-even');
//         var all_bikes = map_data.get('all_bikes');
//         var all_categories = map_data.get('all_categories');
//         var bikes = [];
//         for (let loop = 0; loop < all_categories.length; loop++) {

//             for (let loop2 = 0; loop2 < all_bikes.length; loop2++) {
//                 if(all_categories[loop].id == all_bikes[loop2].category_id){
//                     console.log(all_categories[loop].id )
//                     bikes.push(all_bikes[loop2])
//                 }
//             };

//             if(bikes.length != 0){
//                 odd_even.innerHTML += `
//                 <div class="col-lg-3">
//                     <div class="position-sticky pb-lg-5 pb-3 mt-lg-0 mt-5 ps-2" style="top: 100px">
//                         <h3>${all_categories[loop].category}</h3>
//                     </div>
//                 </div>
    
//                 <div class="col-lg-9">
//                     <div class="row mt-3 cat${all_categories[loop].id}">
//                     </div>
//                 </div>
//                 `
//                 for (let loop3 = 0; loop3 < bikes.length; loop3++) {
//                     var ct = document.querySelector(`.cat${all_categories[loop].id}`);
//                     ct.innerHTML +=            
//                     `
//                     <div class="col-md-4">
//                         <a onclick="get_page('/product/${bikes[loop3].id}');" href="javascript:;">
//                             <div class="card shadow-lg move-on-hover min-height-160 min-height-160">
//                                 <img class="w-100 my-auto"
//                                     src="${bikes[loop3].avatar}"
//                                     alt="newsletter">
//                             </div>
//                             <div class="mt-2 ms-2">
//                                 <h6 class="mb-0">${bikes[loop3].bike_model}</h6>
//                                 <p class="text-secondary text-sm font-weight-normal">${bikes[loop3].description}</p>
//                             </div>
//                         </a>
//                     </div>
//                     `
//                 };
//             }
//           console.log(bikes.length)
//           bikes = [];
//         }
//     } else if (tag == 'profile') {
//         var valid_u = map_data.get('active_u');
//         document.querySelector('.display_full_name').innerHTML = `${valid_u.raw[0].firstname.toUpperCase()} ${valid_u.raw[0].lastname.toUpperCase()}`;
//         document.querySelector('.disp-id').placeholder = valid_u.raw[0].id;
//         document.querySelector('.f_name').placeholder = valid_u.raw[0].firstname;
//         document.querySelector('.l_name').placeholder = valid_u.raw[0].lastname;
//         document.querySelector('.date_updated').placeholder = today(new Date(valid_u.raw[0].date_updated));
//         document.querySelector('.date_added').placeholder = today(new Date(valid_u.raw[0].date_created));
//         document.querySelector('.last_login').placeholder = today(new Date(valid_u.raw[0].last_login));
//         document.querySelector('.u_name').placeholder = valid_u.raw[0].email;
//         document.querySelector('.address').placeholder = valid_u.raw[0].address;
//         document.querySelector('.contact').placeholder = valid_u.raw[0].contact;
//         document.querySelector('.bct').innerHTML = valid_u.raw[0].gender;
//         document.querySelector('.bct').setAttribute('data', valid_u.raw[0].gender)
//     } else if (tag == 'my-bookings') {
//         var b_list = map_data.get('my-bookings');
//         var my_booking_list = document.querySelector('.my_booking_list');
//         for (let loop = 0; loop < b_list.length; loop++) {
//             var d_booked = new Date(b_list[loop].date_created), d_start = new Date(b_list[loop].date_start), d_end = new Date(b_list[loop].date_end), stats
//             if (b_list[loop].status == "0") {
//                 stats =
//                     `
//                 <span class="text-warning">PENDING</span>
//                 `;
//             } else if (b_list[loop].status == "1") {
//                 stats =
//                     `
//                 <span class="text-info">CONFIRMED</span>
//                 `;
//             } else if (b_list[loop].status == "2") {
//                 stats =
//                     `
//                 <span class="text-danger">CANCELLED</span>
//                 `;
//             } else if (b_list[loop].status == "3") {
//                 stats =
//                     `
//                 <span class="text-success">PICK UP</span>
//                 `;
//             } else if (b_list[loop].status == "4") {
//                 stats =
//                     `
//                 <span class="text-secondary">RETURNED</span>
//                 `;
//             }
//             my_booking_list.innerHTML += `
//             <center>
//             <tr class="text-center">
//                 <td>${b_list[loop].id}</td>
//                 <td>${d_booked.toLocaleDateString()}</td>
//                 <td>${d_start.toLocaleDateString()}</td>
//                 <td>${d_end.toLocaleDateString()}</td>
//                 <td>${stats}</td>
//                 <td>
//                     <button d_id="${loop}" onclick="detail(this)" type="button" class="btn btn-link text-info ms-auto border-0" title="details" data-bs-toggle="modal" data-bs-target="#edt_cat"><i class="material-icons position-relative ms-auto text-lg me-1 my-auto">dehaze</i></button>
//                 </td>
//             </tr>
//             </center>
//             `
//         }
//         $('#my_bookings').DataTable({
//             dom: 'Bfrtip',
//             language: {
//                 searchPlaceholder: "Search",
//                 search: "",
//             },
//             "bInfo": false,
//             buttons: [],
//             'columnDefs': [
//                 {
//                     'searchable': false,
//                     'targets': [-1],
//                     bSortable: false,
//                     aTargets: [-1, -2]
//                 },
//             ]
//         });
//     }else if (tag == 'product') {
//         console.log("hello world")
//         var link = rep(window.location.pathname);
//         var url = link.toLowerCase();
//         var res = url.split("/");
//         var pos = res.indexOf('product');
//         var result = res[pos + 1];
//         var onlyContainsNumbers = (str) => /^\d+$/.test(str);
//         function on(){
//             console.log(result)
//             var all_bikes = map_data.get('all_bikes');
//             var all_brands = map_data.get('all_brands');
//             var all_categories = map_data.get('all_categories');
//             var all_galleries = map_data.get('galleries');
//             var bike = [], brand = [], category = [], galery = [], bike_id;
//             for (var bikes of all_bikes) {
//                 result == bikes.id ? (bike.push(bikes), bike_id=bikes.id):""
//             }
//             for (var brands of all_brands) {
//                 bike[0].brand_id == brands.id ? brand.push(brands):""
//             }
//             for (var categories of all_categories) {
//                 console.log(categories.id)
//                 bike[0].category_id == categories.id ? category.push(categories):""
//             }
//             for (var galleries of all_galleries) {
//                 bike_id == galleries.bike_id ? galery.push(galleries):""
//             }
//             document.querySelector('.bike_name').innerHTML = bike[0].bike_model ? bike[0].bike_model : "N/A" 
//             document.querySelector('.price').innerHTML =  bike[0].daily_rate ? bike[0].daily_rate : "N/A" 
//             document.querySelector('.description').innerHTML = bike[0].description ? bike[0].description : "N/A" 
//             document.querySelector('.category').innerHTML = category[0].category ? category[0].category : "N/A" 
//             console.log(brand)
//             document.querySelector('.brand').innerHTML = brand[0].name ? brand[0].name : "N/A" 
//             document.querySelector('.product-avatar').innerHTML =
//             `
//                 <img class="w-100 border-radius-lg shadow-lg mx-auto"
//                 src="${bike[0].avatar}" alt="chair">
//             `
//             var gal = document.querySelector('.galeries');
//             gal.innerHTML = ""
//             for (var galleries of all_galleries) {
//                 gal.innerHTML +=        
//                 `
//                <div class="col-lg-4 col-md-6 mt-5 mt-md-1 mb-4" style="margin-bottom: 7vh !important;">
//                    <div class="card" data-animation="true">
//                        <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
//                            <a class="d-block blur-shadow-image">
//                                <img src="${galleries.image}" class="img-fluid border-radius-lg" alt="Responsive image">
//                            </a>
//                            <div class="colored-shadow"
//                                style="background-image: url(${galleries.image});">
//                            </div>
//                        </div>
//                    </div>
//                </div>
//                `
//             }









//             var u = map_data.get('active_u');
//             var unit_chicker = document.querySelector('.unit-chicker');
//             function adds(){
//                 unit_chicker.innerHTML = ``
//             }
//             function not_adds(){
//                 unit_chicker.innerHTML = `
//                 <div class="row border-radius-md pb-4 p-3 mx-sm-0 mx-1 position-relative">
//                     <div class="col-lg-3 mt-lg-n2 mt-2">
//                         <div class="input-group input-group-static my-3">
//                             <label>Date Start</label>
//                             <input type="date" class="form-control date_start" onchange="startclear(this);">
//                         </div>
//                     </div>
//                     <div class="col-lg-3 mt-lg-n2 mt-2">
//                         <div class="input-group input-group-static my-3">
//                             <label>Date end</label>
//                             <input type="date" class="form-control date_end" onchange="endclear(this);">
//                         </div>
//                     </div>
//                     <div class="col-lg-3 mt-lg-n2 chicker">
//                         <label>&nbsp;</label>
//                         <button type="button" class="btn bg-gradient-primary" style="margin-left: 7vh !important; bottom: 2vh !important;"
//                             onclick="check_unit()">Check Availablity</button>
//                     </div>
//                     <span class="" id="sts"></span>
//                 </div>
                
//                 `
//                 var date_now = today(new Date())
//                 var date_start_picker = document.querySelector('.date_start');
//                 var date_end_picker = document.querySelector('.date_end');
//                 date_start_picker.setAttribute('min', date_now);
//                 date_start_picker.setAttribute('value', date_now);
//                 date_start_picker.setAttribute('max', date_now);
//                 date_end_picker.setAttribute('min', today(addDays(new Date(date_now), 1)));
//                 date_end_picker.setAttribute('value', today(addDays(new Date(date_now), 1)));
//                 $(".date_start").change((a) => {
//                     if (a.target.value) {
//                         date_end_picker.min = today(addDays(new Date(a.target.value), 1))
//                     }
//                 })

//                 $(".date_end").change((a) => {
//                     date_start_picker.max = today(deductDays(new Date(a.target.value), 1));
//                 })
//             }
//             u.status == 203 ? adds() : not_adds()
//         }
//         // make condition here if user admin client or guest
//         onlyContainsNumbers(result) ? on() : console.log("display werror");
//     }else if (tag == 'book') {
//         var u = map_data.get('active_u');
//         var link = rep(window.location.pathname);
//         var url = link.toLowerCase();
//         var res = url.split("/");
//         var pos = res.indexOf('book');
//         var result = res[pos + 1];
//         var onlyContainsNumbers = (str) => /^\d+$/.test(str);
//         function on(){
//             console.log(result)
//             var all_bikes = map_data.get('all_bikes');
//             var all_brands = map_data.get('all_brands');
//             var all_categories = map_data.get('all_categories');
//             var all_galleries = map_data.get('galleries');
//             var bike = [], brand = [], category = [], galery = [], bike_id;
//             for (var bikes of all_bikes) {
//                 result == bikes.id ? (bike.push(bikes), bike_id=bikes.id):""
//             }
//             for (var brands of all_brands) {
//                 bike[0].brand_id == brands.id ? brand.push(brands):""
//             }
//             for (var categories of all_categories) {
//                 console.log(categories.id)
//                 bike[0].category_id == categories.id ? category.push(categories):""
//             }
//             for (var galleries of all_galleries) {
//                 bike_id == galleries.bike_id ? galery.push(galleries):""
//             }
//             document.querySelector('.bike_name').innerHTML = bike[0].bike_model ? bike[0].bike_model : "N/A" 
//             document.querySelector('.price').innerHTML =  bike[0].daily_rate ? bike[0].daily_rate : "N/A" 
//             document.querySelector('.description').innerHTML = bike[0].description ? bike[0].description : "N/A" 
//             document.querySelector('.category').innerHTML = category[0].category ? category[0].category : "N/A" 
//             console.log(brand)
//             document.querySelector('.brand').innerHTML = brand[0].name ? brand[0].name : "N/A" 
//             document.querySelector('.product-avatar').innerHTML =
//             `
//                 <img class="w-100 border-radius-lg shadow-lg mx-auto"
//                 src="${bike[0].avatar}" alt="chair">
//             `
//             var gal = document.querySelector('.galeries');
//             gal.innerHTML = ""
//             for (var galleries of all_galleries) {
//                 gal.innerHTML +=        
//                 `
//                <div class="col-lg-4 col-md-6 mt-5 mt-md-1 mb-4" style="margin-bottom: 7vh !important;">
//                    <div class="card" data-animation="true">
//                        <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
//                            <a class="d-block blur-shadow-image">
//                                <img src="${galleries.image}" class="img-fluid border-radius-lg" alt="Responsive image">
//                            </a>
//                            <div class="colored-shadow"
//                                style="background-image: url(${galleries.image});">
//                            </div>
//                        </div>
//                    </div>
//                </div>
//                `
//             }

//             var unit_chicker = document.querySelector('.unit-chicker');
//             function adds(){
//                 unit_chicker.innerHTML = ``
//             }
//             function not_adds(){
//                 unit_chicker.innerHTML = `
//                 <div class="row border-radius-md pb-4 p-3 mx-sm-0 mx-1 position-relative">
//                     <div class="col-lg-3 mt-lg-n2 mt-2">
//                         <div class="input-group input-group-static my-3">
//                             <label>Date Start</label>
//                             ${from[0]}
//                         </div>
//                     </div>
//                     <div class="col-lg-3 mt-lg-n2 mt-2">
//                         <div class="input-group input-group-static my-3">
//                             <label>Date end</label>
//                             ${to[0]}
//                         </div>
//                     </div>
//                     <div class="col-lg-3 mt-lg-n2 chicker">
//                         <label>&nbsp;</label>
//                         <button type="button" class="btn bg-gradient-success" style="margin-left: 7vh !important; bottom: 2vh !important;"
//                             onclick="check_unit()">BOOK NOW</button>
//                     </div>
//                     <span class="" id="sts"></span>
//                 </div>
                
//                 `
//             }
//             u.status == 203 ? adds() : not_adds()
            
//         }
//         // make condition here if user admin client or guest
//         onlyContainsNumbers(result) && from[0] ? on() : (document.querySelector('.layer').innerHTML = `<h1>404 NOT FOUND </h1>`, document.querySelector('.sub-layer').innerHTML = ``);
//     }else if (tag == 'About') {
//         document.querySelector('.tc3').classList.add('bg-gradient-primary')
//     }
// }
// function detail(e) {
//     var all_bikes = map_data.get('all_bikes');
//     var all_brands = map_data.get('all_brands');
//     var all_categories = map_data.get('all_categories');
//     var b_list = map_data.get('my-bookings');
//     var valid_u = map_data.get('active_u');
//     var id = e.getAttribute('d_id')
//     var d_start = new Date(b_list[id].date_start), d_end = new Date(b_list[id].date_end), stats, footing;
//     var bike = [];
//     var brand = [];
//     var category = [];

//     for (let loop = 0; loop < all_bikes.length; loop++) {
//         if (all_bikes[loop].id == b_list[id].bike_id) {
//             bike.push(all_bikes[loop]);
//         }
//     }
//     for (let loop = 0; loop < all_categories.length; loop++) {
//         if (all_categories[loop].id == bike[0].category_id) {
//             category.push(all_categories[loop]);
//         }
//     }
//     for (let loop = 0; loop < all_brands.length; loop++) {
//         if (all_brands[loop].id == bike[0].brand_id) {
//             brand.push(all_brands[loop]);
//         }
//     }
//     var style_1 =
//         `
//     <button style="float: left;" type="button" name="button" class="btn bg-gradient-info m-0 ms-2" data-bs-dismiss="modal">CLOSE</button>
//     `;
//     if (b_list[id].status == "0") {
//         stats =
//             `
//         <p><b>Booking Status<br></b> <span class="badge badge-warning">PENDING</span></p>
//         `;
//         footing =
//             `
//         <button style="float: left;" type="button" name="button" class="btn bg-gradient-info m-0 ms-2" data-bs-dismiss="modal">CLOSE</button>
//         <button onclick="canbook(this)" d_id="${b_list[id].id}" style="float: right;" type="button" name="button" class="btn bg-gradient-dark m-0 ms-2" data-bs-dismiss="modal">CANCEL BOOKING</button>
//         `
//     } else if (b_list[id].status == "1") {
//         stats =
//             `
//         <p><b>Booking Status<br></b> <span class="badge badge-info">CONFIRMED</span></p>
//         `;
//         footing = style_1;
//     } else if (b_list[id].status == "2") {
//         stats =
//             `
//         <p><b>Booking Status<br></b> <span class="badge badge-danger">CANCELLED</span></p>
//         `;
//         footing = style_1;
//     } else if (b_list[id].status == "3") {
//         stats =
//             `
//         <p><b>Booking Status<br></b> <span class="badge badge-success">PICK UP</span></p>
//         `;
//         footing = style_1;
//     } else if (b_list[id].status == "4") {
//         stats =
//             `
//         <p><b>Booking Status<br></b> <span class="badge badge-secondary">RETURNED</span></p>
//         `;
//         footing = style_1;
//     }
//     document.querySelector('.booked-info').innerHTML =
//         `
//     <div class="conitaner-fluid px-3 py-2">
//         <div class="row">
//             <div class="col-md-6" style="color: black !important;">
//                 <p><b>Client Name<br></b> ${valid_u.raw[0].firstname} ${valid_u.raw[0].lastname}</p>
//                 <p><b>Client Contact<br></b> ${valid_u.raw[0].contact}</p>
//                 <p><b>Client Address<br></b> ${valid_u.raw[0].address}</p>
//                 <p><b>Rent Pick up Date<br></b>${d_start.toLocaleDateString()}</p>
//                 <p><b>Rent Return Date<br></b> ${d_end.toLocaleDateString()}</p>
//                 ${stats}
//             </div>
//             <div class="col-md-6" style="color: black !important;">
//                 <p><b>Bike Category<br></b> ${category[0].category}</p>
//                 <p><b>Bike Brand<br></b> ${brand[0].name}</p>
//                 <p><b>Bike Model<br></b> ${bike[0].bike_model}</p>
//                 <p><b>Bike Daily Rate<br></b> ${bike[0].daily_rate}</p>
//                 <p><b>Day/s to Rent<br></b> ${b_list[id].rent_days}</p>
//                 <p><b>Client Payable Amount<br></b> ${b_list[id].amount_topay}</p>
//             </div>
//         </div>
//     </div>
//     `;
//     document.querySelector('.footing').innerHTML =
//         `
//     ${footing}
//     `;
// }

// function canbook(e) {
//     var id = e.getAttribute('d_id');
//     $.ajax({
//         url: "/client_query/cancel-book",
//         method: "POST",
//         data: { id: id },
//         dataType: "JSON",
//         success: function (data) {
//             if (data.status == 202) {
//                 Swal.fire(
//                     'Booking Cancelled Successfully',
//                 )
//                 initializer();
//                 get_page('/my-bookings');
//             }
//         },
//         error: function (request, error) {
//             console.log(error)
//         },
//     });
// }

// function update_info_client() {
//     var valid_u = map_data.get('active_u');
//     var f_name = document.querySelector('.f_name');
//     var l_name = document.querySelector('.l_name');
//     var u_name = document.querySelector('.u_name');
//     var add = document.querySelector('.address');
//     var contact_num = document.querySelector('.contact');
//     var c_gender = document.querySelector('.bct').getAttribute('data');
//     var f, l, u, a, c, flag = true, less = true, less2 = true;
//     if (f_name.value == "") {
//         f = f_name.placeholder;
//     } else {
//         f = f_name.value;
//     }
//     if (l_name.value == "") {
//         l = l_name.placeholder
//     } else {
//         l = l_name.value
//     }
//     if (u_name.value == "") {
//         u = u_name.placeholder
//     } else if (u_name.value.length < 7) {
//         u = u_name.placeholder
//         less = false;
//     } else {
//         var validate_uname = $.ajax({
//             async: false,
//             url: "/client_query/validate_uname",
//             data: { id: valid_u.raw[0].id, username: u_name.value },
//             type: 'POST',
//         }).responseJSON;
//         if (validate_uname.stats == 202) {
//             u = u_name.value;
//         } else {
//             u = u_name.placeholder
//             flag = false;
//         }
//     }
//     if (add.value == "") {
//         a = add.placeholder
//     } else {
//         a = add.value
//     }
//     if (contact_num.value == "") {
//         c = contact_num.placeholder
//     } else if (contact_num.value.length < 11) {
//         c = contact_num.placeholder
//         less2 = false;
//     } else {
//         c = contact_num.value
//     }
//     if (flag == false) {
//         Swal.fire(
//             'Username is already taken',
//         )
//     } else if (less == false) {
//         document.querySelector('.uname_error').innerHTML = "Min 6 characters"
//     } else if (less2 == false) {
//         document.querySelector('.num_error').innerHTML = "Min 11 characters"
//     } else {
//         $.ajax({
//             url: "/client_query/update_client_info",
//             method: "POST",
//             data: { firstname: f, lastname: l, username: u, address: a, contact: c, gender: c_gender },
//             dataType: "JSON",
//             success: function (data) {
//                 if (data.status == 202) {
//                     Swal.fire(
//                         'Users info succesfully updated',
//                     )
//                     initializer();
//                     get_page('/profile');
//                 }
//             },
//             error: function (request, error) {
//                 console.log(error)
//             },
//         });
//     }
// }

// function updatepwd() {
//     var old_p = document.getElementById('old_p');
//     var new_p = document.getElementById('nw_p');
//     var confnew_p = document.getElementById('confnw_p');

//     if (old_p.value == "") {
//         Swal.fire(
//             'Please input Current password',
//         )
//     } else {
//         $.ajax({
//             url: "/client_query/validate_oldpass",
//             method: "POST",
//             data: { old_p: old_p.value },
//             dataType: "JSON",
//             success: function (data) {
//                 if (data.status == 202) {
//                     var p = String(new_p.value);
//                     if (p == "") {
//                         Swal.fire(
//                             'New password must not be null',
//                         )
//                     } else if (p.length < 7) {
//                         document.getElementById("min").style.color = "red";
//                     }
//                     else if (p.search(/[a-z]/i) < 0) {
//                         document.getElementById("st").style.color = "red";
//                     }
//                     else if (p.search(/[0-9]/i) < 0) {
//                         document.getElementById("num").style.color = "red";
//                     }
//                     else {
//                         if (confnew_p.value == new_p.value) {
//                             $.ajax({
//                                 url: "/client_query/validate_newpass",
//                                 method: "POST",
//                                 data: { new_p: new_p.value },
//                                 dataType: "JSON",
//                                 success: function (data) {
//                                     if (data.status == 202) {
//                                         $.ajax({
//                                             url: "/client_query/updatepd",
//                                             method: "POST",
//                                             data: { new_p: new_p.value },
//                                             dataType: "JSON",
//                                             success: function (data) {
//                                                 if (data.status == 202) {
//                                                     Swal.fire(
//                                                         'password Updated',
//                                                     )
//                                                     old_p.value = "";
//                                                     new_p.value = "";
//                                                     confnew_p.value = "";
//                                                     get_page('/profile')
//                                                 }
//                                             }
//                                         });
//                                     } else {
//                                         Swal.fire(
//                                             'Now password must not same with old password',
//                                         )
//                                     }
//                                 }
//                             });
//                         } else {
//                             document.getElementById("conf").style.color = "red";
//                         }
//                     }
//                 } else {
//                     Swal.fire(
//                         'Current password did not match',
//                     )
//                 }
//             },
//             error: function (request, error) {
//                 console.log("error");
//             },
//         });
//     }
// }

// function bcat(ths) {
//     var target = document.getElementsByClassName('bct')[0];
//     var vr = ths.getAttribute('data');
//     target.innerHTML = "";
//     target.innerHTML = ths.innerHTML;
//     target.setAttribute('data', vr);
// }

// function bcat_reg(ths) {
//     var target = document.getElementsByClassName('bct_reg')[0];
//     var vr = ths.getAttribute('data');
//     target.innerHTML = "";
//     target.innerHTML = ths.innerHTML;
//     target.setAttribute('data', vr);
// }

// function get_page(relocate) {
//     var link = rep(relocate);
//     var url = link.toLowerCase();
//     var entry = c_plate.get(url);
//     var res = url.split("/");
//     var pos = res.indexOf('product');
//     var result = res[pos + 1];

//     var pos2 = res.indexOf('book');

//     var result2 = res[pos2 + 1];


//     var onlyContainsNumbers = (str) => /^\d+$/.test(str);




//     function normal_mode(){
//         console.log(relocate)
//         document.title = entry.tittle;
//         history.pushState(null, entry.tittle, relocate);
//         document.querySelector('.layer').innerHTML = entry.layer;
//         document.querySelector('.content').innerHTML = entry.content;
//         sidebar_format();
//         page_data_loader(entry.tag);
//     }
//     function product_page(){
//         var product_entry = c_plate.get('/product');
//         document.title = product_entry.tittle + `| ${result}`;
//         history.pushState(null, product_entry.tittle, `/product/${result}`);
//         document.querySelector('.layer').innerHTML = product_entry.layer;
//         document.querySelector('.content').innerHTML = product_entry.content;
//         sidebar_format();
//         // same diri
//         page_data_loader(product_entry.tag);
//     }
//     function book_page(){
//         var product_entry = c_plate.get('/book');
//         document.title = product_entry.tittle + `| ${result}`;
//         history.pushState(null, product_entry.tittle, `/book/${result2}`);
//         document.querySelector('.layer').innerHTML = product_entry.layer;
//         document.querySelector('.content').innerHTML = product_entry.content;
//         sidebar_format();
//         page_data_loader(product_entry.tag);
//     }


//     function book_mode(){
//         var check_var = false;
//         request_all_b();
//         var all_bikes = map_data.get('all_bikes');
//         for (let loop = 0; loop < all_bikes.length; loop++) {
//             console.log(all_bikes[loop].id)
//             if (all_bikes[loop].id == result2) {
//                 check_var = true;
//             }
//         }
//         console.log(check_var)
//         console.log("looping out")
//         check_var ? book_page() : console.log("error this");
//     }


//     function product_mode(){
//         var check_var = false;
//         request_all_b();
//         var all_bikes = map_data.get('all_bikes');
//         console.log("looping here")
//         for (let loop = 0; loop < all_bikes.length; loop++) {
//             console.log(all_bikes[loop].id)
//             if (all_bikes[loop].id == result) {
//                 check_var = true;
//             }
//         }
//         console.log("looping out")
//         check_var ? product_page() : console.log("error page");
//     }
//     entry ? normal_mode() : onlyContainsNumbers(result)? product_mode() : onlyContainsNumbers(result2)? book_mode() : console.log("error page");
//     // if(entry){
//     //     console.log(relocate)
//     //     document.title = entry.tittle;
//     //     history.pushState(null, entry.tittle, relocate);
//     //     document.querySelector('.layer').innerHTML = entry.layer;
//     //     document.querySelector('.content').innerHTML = entry.content;
//     //     sidebar_format();
//     //     page_data_loader(entry.tag);
//     // }else{
//     //     // trrr
//     //     try{
//     //         var url = link.toLowerCase();
//     //         var res = url.split("/");
//     //         var pos = res.indexOf('product');
//     //         var result = res[pos+1];
//     //         var onlyContainsNumbers = (str) => /^\d+$/.test(str);
//     //         if(onlyContainsNumbers(result) == true){
//     //             var check_var = false;
//     //             request_all_b();
//     //             var all_bikes = map_data.get('all_bikes');
//     //             for(let loop = 0; loop < all_bikes.length; loop++){
//     //                 if(all_bikes[loop].id == result){
//     //                     check_var = true;
//     //                 }
//     //             }
//     //             if(check_var){
//     //                 var product_entry = c_plate.get('/product');
//     //                 document.title = product_entry.tittle + `| ${result}`;
//     //                 history.pushState(null, product_entry.tittle, `/product/${result}`);
//     //                 document.querySelector('.layer').innerHTML = product_entry.layer;
//     //                 document.querySelector('.content').innerHTML = product_entry.content;
//     //                 sidebar_format();
//     //                 page_data_loader(product_entry.tag);
//     //             }else{
//     //                 error
//     //             }
//     //         }else{
//     //             error
//     //         }
//     //     }catch{
//     //         console.log("error")
//     //     }
//     // }
// }


// const rep = ne => {
//     var l_slice = ne.slice(-1);
//     if (l_slice === "/") {
//         let url = ne;
//         url = url.slice(0, -1);
//         return url;
//     }
//     else {
//         return ne;
//     }
// }

// function initializer() {
//     request_actor();
//     request_my_bookings();
//     request_all_b();
//     request_all_brands();
//     request_all_categories();
//     request_galleries();
//     var actor = map_data.get('active_u');
//     if(actor.status == 202){
//         document.querySelector('.sub-layer').innerHTML = getFile("../../pages/client_partials/msg.html")
//     }else{
//         document.querySelector('.sub-layer').innerHTML = ""
//     }
// }

// function first_load() {
//     initializer()
//     get_page(window.location.pathname)
// }

// window.addEventListener("load", first_load(), true);


// function sign_out_admin() {
//     $.ajax({
//         url: "/auth/logout",
//         method: "GET",
//         dataType: "JSON",
//         success: function (data) {
//             initializer();
//             get_page('/');
//         }
//     });
// }

// function sbmt_in() {
//     var nm = document.getElementById('uname').value;
//     var pd = document.getElementById('pwd').value;
//     if (!nm && pd) {
//         Swal.fire(
//             'Please input username',
//         )
//     }
//     if (!pd && nm) {
//         Swal.fire(
//             'Please input password',
//         )
//     }
//     if (!nm && !pd) {
//         Swal.fire(
//             'Please fill up filds',
//         )
//     }
//     if (nm && pd) {
//         $.ajax({
//             url: "/auth/client-login",
//             method: "POST",
//             data: { um: nm, pd: pd },
//             dataType: "JSON",
//             success: function (data) {
//                 if (data.status == 202) {
//                     map_data.set('active_u', data.raw)
//                     initializer();
//                     get_page('/');
//                 } else if (data.status == 203) {
//                     window.location.href = '/admin'
//                 }
//                 else {
//                     map_data.set('active_u', '')
//                     Swal.fire(
//                         'No user founds',
//                     )
//                 }
//             },
//             error: function (request, error) {
//                 alert(error);
//             },
//         });
//     }
// }

// function s_up() {
//     var f_name = document.querySelector('.name').value;
//     var l_name = document.querySelector('.last_name').value;
//     var addr = document.querySelector('.address').value;
//     var cont_num = document.querySelector('.contact_number').value;
//     var u_name = document.querySelector('.user_name').value;
//     var pwd = document.querySelector('.pwd').value;
//     var gend = document.querySelector('.bct_reg').getAttribute('data');

//     var name_error = document.querySelector('.name_error');
//     var last_name_error = document.querySelector('.last_name_error')
//     var address_error = document.querySelector('.address_error')
//     var contact_number_error = document.querySelector('.contact_number_error')
//     var user_name_error = document.querySelector('.user_name_error')
//     var pwd_error = document.querySelector('.pwd_error')
//     name_error.innerHTML = "";
//     last_name_error.innerHTML = "";
//     address_error.innerHTML = "";
//     contact_number_error.innerHTML = "";
//     user_name_error.innerHTML = "";
//     pwd_error.innerHTML = "";
//     var flag = true;
//     if (f_name == "") {
//         flag = false;
//         name_error.innerHTML = "Please fill out this field";
//     }
//     if (l_name == "") {
//         flag = false;
//         last_name_error.innerHTML = "Please fill out this field";
//     }
//     if (addr == "") {
//         flag = false;
//         address_error.innerHTML = "Please fill out this field";
//     }
//     if (cont_num == "") {
//         flag = false;
//         contact_number_error.innerHTML = "Please fill out this field";
//     } else if (cont_num.length < 11) {
//         flag = false;
//         contact_number_error.innerHTML = "Min 11 numbers";
//     }
//     if (u_name == "") {
//         flag = false;
//         user_name_error.innerHTML = "Please fill out this field";
//     } else if (u_name.length < 6) {
//         flag = false;
//         user_name_error.innerHTML = "Min 7 characters";
//     } else {
//         var validate_uname = $.ajax({
//             async: false,
//             url: "/client_query/check_uname",
//             data: { username: u_name },
//             type: 'POST',
//         }).responseJSON;
//         if (validate_uname.stats != 202) {
//             flag = false;
//             user_name_error.innerHTML = "Username is already taken";
//         }
//     }
//     console.log("hello world")
//     if (pwd == "") {
//         console.log(pwd.length)
//         flag = false;
//         pwd_error.innerHTML = "Please fill out this field";
//     } else if (pwd.length < 6) {
//         flag = false;
//         pwd_error.innerHTML = "Min 7 characters";
//     }
//     else if (pwd.search(/[a-z]/i) < 0) {
//         flag = false;
//         pwd_error.innerHTML = "Atleast one letter (recommended)";
//     }
//     else if (pwd.search(/[0-9]/i) < 0) {
//         flag = false;
//         pwd_error.innerHTML = "Atleast 1 number";
//     }
//     if (flag == true) {
//         $.ajax({
//             url: "/client_query/reg_client",
//             method: "POST",
//             data: { firstname: f_name, lastname: l_name, username: u_name, address: addr, contact: cont_num, gender: gend, password: pwd },
//             dataType: "JSON",
//             success: function (data) {
//                 if (data.status == 202) {
//                     Swal.fire(
//                         'Users Successfuly Registered',
//                     )
//                     $.ajax({
//                         url: "/auth/client-login",
//                         method: "POST",
//                         data: { um: u_name, pd: pwd },
//                         dataType: "JSON",
//                         success: function (data) {
//                             if (data.status == 202) {
//                                 map_data.set('active_u', data.raw)
//                                 initializer();
//                                 get_page('/');
//                             } else if (data.status == 203) {
//                                 window.location.href = '/admin'
//                             }
//                             else {
//                                 map_data.set('active_u', '')
//                                 Swal.fire(
//                                     'No user founds',
//                                 )
//                             }
//                         },
//                         error: function (request, error) {
//                             alert(error);
//                         },
//                     });
//                 }
//             },
//             error: function (request, error) {
//                 console.log(error)
//             },
//         });
//     }
//     // are nko
// }


// function request_actor() {
//     var u_active = $.ajax({
//         async: false,
//         url: '/client_query/u_active',
//         type: 'POST',
//     }).responseJSON;
//     map_data.set('active_u', u_active)
// }

// function request_my_bookings() {
//     var my_bookings = $.ajax({
//         async: false,
//         url: '/client_query/my_bookings',
//         type: 'POST',
//     }).responseJSON;
//     map_data.set('my-bookings', my_bookings.raw);
// }

// function request_all_b() {
//     var all_b = $.ajax({
//         async: false,
//         url: '/client_query/all_bikes',
//         type: 'POST',
//     }).responseJSON;
//     map_data.set('all_bikes', all_b.raw);
// }

// function request_all_brands() {
//     var all_brands = $.ajax({
//         async: false,
//         url: '/client_query/all_brands',
//         type: 'POST',
//     }).responseJSON;
//     map_data.set('all_brands', all_brands.raw);
// }

// function request_all_categories() {
//     var all_categories = $.ajax({
//         async: false,
//         url: '/client_query/all_categories',
//         type: 'POST',
//     }).responseJSON;
//     map_data.set('all_categories', all_categories.raw);
// }

// function request_galleries() {
//     var galleries = $.ajax({
//         async: false,
//         url: '/client_query/galleries',
//         type: 'POST',
//     }).responseJSON;
//     map_data.set('galleries', galleries.raw);
// }


// function check_unit() {
//     var link = window.location.pathname;
//     var url = link.toLowerCase();
//     var res = url.split("/");
//     var pos = res.indexOf('product');
//     var result = res[pos+1];
//     var id = result

//     var starts = document.querySelector('.date_start').value;
//     var ends = document.querySelector('.date_end').value;
//     var available_bikes = $.ajax({
//         async: false,
//         url: "/client_query/available_bikes",
//         data: { start: starts, ends: ends },
//         type: 'POST',
//         dataType: "JSON",
//     }).responseJSON;
//     var to_check_exist = available_bikes.data;
//     var exist = false;
//     for(let loop = 0; loop < to_check_exist.length; loop++){
//         console.log(to_check_exist[loop].id)
//         if(id == to_check_exist[loop].id){
//             exist = true;
//         }
//     }
//     if(exist == true){
//         var s_badge = "badge badge-success";
//         var chicker = document.querySelector('.chicker');
//         chicker.innerHTML = `
//         <button type="button" class="btn bg-gradient-success" style="margin-left: 7vh !important; bottom: -2.6vh !important;"
//         onclick="check_unit()">BOOK NOW</button>
//         `
//         var sts = document.querySelector('#sts');
//         sts.classList.add(...s_badge.split(" "));
//         sts.innerHTML = 'AVAILABLE';
//     }else{
//         var s_badge = "badge badge-danger";
//         var sts = document.querySelector('#sts');
//         sts.classList.add(...s_badge.split(" "));
//         sts.innerHTML = 'UNAVAILABLE';
//     }
// }

// function check_availble() {
//     var starts = document.querySelector('.date_start').value;
//     var ends = document.querySelector('.date_end').value;
//     var available_bikes = $.ajax({
//         async: false,
//         url: "/client_query/available_bikes",
//         data: { start: starts, ends: ends },
//         type: 'POST',
//         dataType: "JSON",
//     }).responseJSON;
//     map_data.set('available_bikes', available_bikes.data);
//     looper1();
// }

// function keyDown(e) {
//     var e = window.event || e;
//     var key = e.keyCode;
//     if (key == 32) {
//         e.preventDefault();
//     }
// }

// function checkWhitespace(event) {
//     var data = event.clipboardData.getData("text/plain");
//     var isNullOrContainsWhitespace = (!data || data.length === 0 || /\s/g.test(data));
//     if (isNullOrContainsWhitespace) {
//         event.preventDefault();
//     }

// }

// function onlyNumberKey(evt) {
//     var ASCIICode = (evt.which) ? evt.which : evt.keyCode
//     if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
//         return false;
//     return true;
// }

// function msg(){
//     // var valid_u = map_data.get('active_u');
//     var tab = document.querySelector('#cl-msg');
//     tab.classList.add('show');
//     com_client();
// }


// function cl_msg_close(){
//     var tab = document.querySelector('#cl-msg');
//     tab.classList.remove('show');
// }
// // var l = document.getElementsByTagName('a');
// // l[0].focus();

