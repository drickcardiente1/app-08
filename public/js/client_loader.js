"use strict"
const layout = new Map([]);
const map_data = new Map([]);
const c_plate = new Map([]);
var from = [], to = []
var intervalID;
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
    c_plate.set(``, { tittle: `JNJ Motorbikes | Home`, tag: "Home", layer: layout.get('layer'), content: layout.get('home') })
    c_plate.set(`/categories`, { tittle: `JNJ Motorbikes | Categories`, tag: "Categories", layer: layout.get('layer'), content: layout.get('categories') })
    c_plate.set(`/about`, { tittle: `JNJ Motorbikes | About`, tag: "About", layer: layout.get('layer'), content: layout.get('about') })
    c_plate.set(`/sign-in`, { tittle: `JNJ Motorbikes | Sign-in`, tag: "Sign-in", layer: layout.get('layer'), content: layout.get('login') })
    c_plate.set(`/sign-up`, { tittle: `JNJ Motorbikes | Sign-up`, tag: "Sign-up", layer: layout.get('layer'), content: layout.get('signup') })
    c_plate.set(`/profile`, { tittle: `JNJ Motorbikes | My Account Details`, tag: "profile", layer: layout.get('layer'), content: layout.get('profile') })
    c_plate.set(`/my-bookings`, { tittle: `JNJ Motorbikes | My bookings`, tag: "my-bookings", layer: layout.get('layer'), content: layout.get('bookings') })
    c_plate.set(`/product`, { tittle: `JNJ Motorbikes | product`, tag: "product", layer: layout.get('layer'), content: layout.get('product') })
    c_plate.set(`/book`, { tittle: `JNJ Motorbikes | BOOK`, tag: "book", layer: layout.get('layer'), content: layout.get('product') })
};
function startclear(ths) {
    if (ths.value == '') {
        ths.value = today(new Date());
    }
}
function endclear(ths) {
    if (ths.value == '') {
        document.querySelector('.date_start').value = today(new Date());;
        ths.value = today(addDays(new Date(), 1))
        ths.min = today(addDays(new Date(), 1))
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
        var actor = map_data.get("actor");
        actor.status == 202 || actor.status == 203 ? initializer("/") : "";
    } else if (tag == 'Sign-up') {
        var actor = map_data.get("actor");
        actor.status == 202 || actor.status == 203
          ? initializer("/")
          : $("#reg").keypress(function (event) {
              if (event.which == 13) {
                event.preventDefault();
                s_up();
              }
            });
    } else if (tag == 'Categories') {
        document.querySelector('.tc2').classList.add('bg-gradient-primary')
        var odd_even = document.querySelector('.odd-even');
        var all_bikes = map_data.get('all_bikes').raw;
        var all_categories = map_data.get("all_categories").raw;
        console.log(all_bikes)
        console.log(all_categories)
        var bikes = [];
        for (let loop = 0; loop < all_categories.length; loop++) {

            for (let loop2 = 0; loop2 < all_bikes.length; loop2++) {
                if (all_categories[loop].id == all_bikes[loop2].category_id) {
                    bikes.push(all_bikes[loop2])
                }
            };

            if (bikes.length != 0) {
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
        var valid_u = map_data.get("actor");
        valid_u = valid_u.raw
        document.querySelector('.display_full_name').innerHTML = `${valid_u[0].firstname.toUpperCase()} ${valid_u[0].lastname.toUpperCase()}`;
        document.querySelector('.disp-id').placeholder = valid_u[0].id;
        document.querySelector('.f_name').placeholder = valid_u[0].firstname;
        document.querySelector('.l_name').placeholder = valid_u[0].lastname;
        document.querySelector('.date_updated').placeholder = today(new Date(valid_u[0].date_updated));
        document.querySelector('.date_added').placeholder = today(new Date(valid_u[0].date_created));
        document.querySelector('.last_login').placeholder = today(new Date(valid_u[0].last_login));
        document.querySelector('.u_name').placeholder = valid_u[0].email;
        document.querySelector('.address').placeholder = valid_u[0].address;
        document.querySelector('.contact').placeholder = valid_u[0].contact;
        document.querySelector('.bct').innerHTML = valid_u[0].gender;
        document.querySelector('.bct').setAttribute('data', valid_u[0].gender)
        document.querySelector('.avt').src = valid_u[0].avatar;
    } else if (tag == 'my-bookings') {
        var b_list = map_data.get('my-bookings').raw;
        console.log(b_list)
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
        $("#my_bookings").DataTable({
          dom: "Bfrtip",
          language: {
            searchPlaceholder: "Search",
            search: "",
          },
          bInfo: false,
          buttons: [],
          columnDefs: [
            {
              searchable: false,
              targets: [-1],
              bSortable: false,
              aTargets: [-1, -2],
            },
          ],
        });
    } else if (tag == 'product') {
        var link = rep(window.location.pathname);
        var url = link.toLowerCase();
        var res = url.split("/");
        var pos = res.indexOf('product');
        var result = res[pos + 1];
        var onlyContainsNumbers = (str) => /^\d+$/.test(str);
        function on() {
            var all_bikes = map_data.get('all_bikes').raw;
            var all_brands = map_data.get('all_brands').raw;
            var all_categories = map_data.get('all_categories').raw;
            var all_galleries = map_data.get('galleries').raw;
            var bike = [], brand = [], category = [], galery = [], bike_id;
            for (var bikes of all_bikes) {
                result == bikes.id ? (bike.push(bikes), bike_id = bikes.id) : ""
            }
            for (var brands of all_brands) {
                bike[0].brand_id == brands.id ? brand.push(brands) : ""
            }
            for (var categories of all_categories) {
                console.log(categories.id)
                bike[0].category_id == categories.id ? category.push(categories) : ""
            }
            for (var galleries of all_galleries) {
                bike_id == galleries.bike_id ? galery.push(galleries) : ""
            }
            document.querySelector('.bike_name').innerHTML = bike[0].bike_model ? bike[0].bike_model : "N/A"
            document.querySelector('.price').innerHTML = bike[0].daily_rate ? bike[0].daily_rate : "N/A"
            document.querySelector('.price').setAttribute("data", bike[0].daily_rate ? bike[0].daily_rate : 0)
            document.querySelector('.description').innerHTML = bike[0].description ? bike[0].description : "N/A"
            document.querySelector('.category').innerHTML = category.length >= 1 ? category[0].category : "N/A"
            console.log(brand)
            document.querySelector('.brand').innerHTML = brand.length >= 1 ? brand[0].name : "N/A"
            document.querySelector('.product-avatar').innerHTML =
                `
                <img class="w-100 border-radius-lg shadow-lg mx-auto"
                src="${bike[0].avatar}" alt="chair">
            `
            var gal = document.querySelector('.galeries');
            gal.innerHTML = ""
            for (var galleries of galery) {
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
            var actor = map_data.get('actor');
            console.log(actor);
            var unit_chicker = document.querySelector('.unit-chicker');
            function adds() {
                unit_chicker.innerHTML = ``
            }
            function not_adds() {
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
            actor.status == 203 ? adds() : not_adds();
        }
        // make condition here if user admin client or guest
        onlyContainsNumbers(result) ? on() : "";
    } else if (tag == 'book') {
        var actor = map_data.get('actor');
        var link = rep(window.location.pathname);
        var url = link.toLowerCase();
        var res = url.split("/");
        var pos = res.indexOf('book');
        var result = res[pos + 1];
        var onlyContainsNumbers = (str) => /^\d+$/.test(str);
        function on() {
            var all_bikes = map_data.get('all_bikes').raw;
            var all_brands = map_data.get('all_brands').raw;
            var all_categories = map_data.get('all_categories').raw;
            var all_galleries = map_data.get('galleries').raw;
            var bike = [], brand = [], category = [], galery = [], bike_id;
            for (var bikes of all_bikes) {
                result == bikes.id ? (bike.push(bikes), bike_id = bikes.id) : ""
            }
            for (var brands of all_brands) {
                bike[0].brand_id == brands.id ? brand.push(brands) : ""
            }
            for (var categories of all_categories) {
                bike[0].category_id == categories.id ? category.push(categories) : ""
            }
            for (var galleries of all_galleries) {
                bike_id == galleries.bike_id ? galery.push(galleries) : ""
            }
            document.querySelector('.bike_name').innerHTML = bike[0].bike_model ? bike[0].bike_model : "N/A"
            document.querySelector('.price').innerHTML = bike[0].daily_rate ? bike[0].daily_rate : "N/A"
            document.querySelector('.price').setAttribute("data", bike[0].daily_rate ? bike[0].daily_rate : 0)
            document.querySelector('.description').innerHTML = bike[0].description ? bike[0].description : "N/A"

            document.querySelector('.category').innerHTML = category.length >= 1 ? category[0].category : "N/A"
            document.querySelector('.brand').innerHTML = brand.length >= 1 ? brand[0].name : "N/A"

            document.querySelector('.product-avatar').innerHTML =
                `
                <img class="w-100 border-radius-lg shadow-lg mx-auto"
                src="${bike[0].avatar}" alt="chair">
            `
            var gal = document.querySelector('.galeries');
            gal.innerHTML = ""
            for (var galleries of galery) {
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
            function adds() {
                unit_chicker.innerHTML = ``
            }
            function not_adds() {
                unit_chicker.innerHTML = `
                <div class="row border-radius-md pb-4 p-3 mx-sm-0 mx-1 position-relative">
                    <div class="col-lg-3 mt-lg-n2 mt-2">
                        <div class="input-group input-group-static my-3">
                            <div class="input-group input-group-static my-3">
                            <label>Date Start</label>
                            <input value="${from[0]}" type="date" class="form-control date_start" disabled>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 mt-lg-n2 mt-2">
                        <div class="input-group input-group-static my-3">
                            <div class="input-group input-group-static my-3">
                            <label>Date Start</label>
                            <input value="${to[0]}" type="date" class="form-control date_end" disabled>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 mt-lg-n2 chicker">
                        <label>&nbsp;</label>
                        <button type="button" class="btn bg-gradient-success" style="margin-left: 7vh !important; bottom: 2vh !important;"
                            onclick=" book()">BOOK NOW</button>
                    </div>
                    <span class="" id="sts"></span>
                </div>
                
                `
            }
            actor.status == 203 ? adds() : not_adds()

        }
        // make condition here if user admin client or guest
        onlyContainsNumbers(result) && from[0] ? on() : initializer('/');
    } else if (tag == 'About') {
        document.querySelector('.tc3').classList.add('bg-gradient-primary')
    }
}
async function sbmt_in() {
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
        loading();
      var data = new FormData();
      console.log(nm, pd);
      data.append("um", nm);
      data.append("pd", pd);
      console.log(data);
      await fetch("/auth/client-login", {
        method: "POST",
        body: data,
      })
        .then((response) => response.json())
          .then((data) => {
                swal.close();
              if (data.status == 202) {
                    initializer("/");
              }else if (data.status == 203) {
                    window.location.href = "/admin";
              } else {
                  Swal.fire(`No users Found`)
              }
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
    if (to_load.length == 0) {
      home_result.innerHTML = `<center><h4>NO AVAILABLE MOTORBIKE FROM : ${starts} TO :${ends}</h4><center>`;
    } else {
      home_result.innerHTML = `
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
    `;
      var u = map_data.get("active_u");
      for (let loop = 0; loop < to_load.length; loop++) {
        document.querySelector(".looper").innerHTML += `
        <div class="col-md-4 mt-md-0 mt-4">
            <a onclick="get_page('/book/${to_load[loop].id}');" href="javascript:;" >
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
      function add_loop() {
        for (let loop = 0; loop < to_load.length; loop++) {
          document.querySelector(".looper").innerHTML += `
            <div class="col-md-4 mt-md-0 mt-4">
                <a onclick="initializer('/book/${to_load[loop].id}'); datefrom_to();" href="javascript:;" >
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
        functi;
      }
    }
}

function loading(){
    Swal.fire({
        title: "<i>PLEASE WAIT</i>",
        html: `<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>`,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showCancelButton: false,
        showConfirmButton: false,
    });
}




async function check_unit() {
    loading()
  var link = window.location.pathname;
  var url = link.toLowerCase();
  var res = url.split("/");
  var pos = res.indexOf("product");
  var result = res[pos + 1];
  var id = result;
  var starts = document.querySelector(".date_start").value;
  var ends = document.querySelector(".date_end").value;
  var form = new FormData();
  form.append("start", starts);
  form.append("ends", ends);
  await fetch("/client_query/available_bikes", {
    method: "POST",
    body: form,
  })
    .then((data) => data.json())
    .then((val) => {
        swal.close()
      var to_check_exist = val.data;
      var exist = false;
      for (let loop = 0; loop < to_check_exist.length; loop++) {
        console.log(to_check_exist[loop].id);
        if (id == to_check_exist[loop].id) {
          exist = true;
        }
      }
      if (exist == true) {
        document.querySelector(".date_start").setAttribute("disabled", "");
        document.querySelector(".date_end").setAttribute("disabled", "");
        var s_badge = "badge badge-success";
        var chicker = document.querySelector(".chicker");
        chicker.innerHTML = `
        <button type="button" class="btn bg-gradient-success" style="margin-left: 7vh !important; bottom: -2.6vh !important;"
        onclick="book()">BOOK NOW</button>
        `;
        var sts = document.querySelector("#sts");
        sts.classList.add(...s_badge.split(" "));
        sts.innerHTML = "AVAILABLE";
      } else {
        var s_badge = "badge badge-danger";
        var sts = document.querySelector("#sts");
        sts.classList.add(...s_badge.split(" "));
        sts.innerHTML = "UNAVAILABLE";
      }
    });
}
function book_mode() {
    var check_var = false;
    var all_bikes = map_data.get('all_bikes');
    console.log(all_bikes);
    for (let loop = 0; loop < all_bikes.length; loop++) {
        if (all_bikes[loop].id == result2) {
            check_var = true;
        }
    }
    check_var ? book_page() : "";
}
function keyDown(e) {
    var e = window.event || e;
    var key = e.keyCode;
    if (key == 32) {
        e.preventDefault();
    }
}
function checkWhitespace(event) {
    var data = event.clipboardData.getData("text/plain");
    var isNullOrContainsWhitespace = (!data || data.length === 0 || /\s/g.test(data));
    if (isNullOrContainsWhitespace) {
        event.preventDefault();
    }

}
function onlyNumberKey(evt) {
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
        return false;
    return true;
}
async function send() {
    var msg = document.querySelector('.msg');
    var msg_box = document.querySelector('.msg-box');
    if(msg.value != ""){
        await $.ajax({
            url: "/client_query/send-msg",
            data: { "message": msg.value },
            method: "POST",
            dataType: "JSON",
            success: function (data) {
                console.log(data)
                if (data.status == 202) {
                    showmsg();
                    read_msg();
                } else {
                    msg_box.innerHTML =
                        `
                    <div class="row justify-content-end mb-4 text-center">
                        <div class="card-body pt-sm-3 pt-0 m-box scrollbar-y text-white" style="border-radius: 25px 25px 25px 25px; background-color: #344767 !important;">
                        <h5>Please Refresh Page</h5>
                        </div>
                    </div>
                    `
                }
                msg.value = "";
            },
            error: function (request, error) {
                msg_box.innerHTML = "OFFLINE"
            },
        });
    }
}
function adminmsg(user) {
    var date = new Date(user.date_send)
    var box_msg = document.querySelector('.msg-box');
    box_msg.innerHTML +=
        `
    <div class="row justify-content-end mb-4" style="width: 100% !important; margin-left: 2vh !important;">
        <div class="card-body pt-sm-3 pt-0 m-box scrollbar-y text-white" style="border-radius: 25px 25px 0 25px; background-color: #344767 !important;">
            <p class="text-sm">${user.messages}</</p>
            <p>ADMIN</p>
        </div>
        <p style="color: black !important;">${date.toUTCString().replace(' GMT', '')}</p>
    </div>
    `
}
function clientmsg(user) {
    var date = new Date(user.date_send)
    var box_msg = document.querySelector('.msg-box');
    box_msg.innerHTML +=
        `
    <div class="row justify-content-start mb-4" style="width: 100% !important;">
        <div class="card-body pt-sm-3 pt-0 m-box scrollbar-y text-white" style="border-radius: 25px 25px 25px 0px; background-color: #344767 !important;">
            <p class="text-sm">${user.messages}</p>
            <p>ME</p>
        </div>
        <p style="color: black !important;">${date.toUTCString().replace(' GMT', '')}</p>
    </div>
    `
}
async function showmsg() {
    document.querySelector('.msg-box').innerHTML = "";
    await $.ajax({
        url: "/client_query/show-msg",
        method: "POST",
        dataType: "JSON",
        success: function (data) {
            for (var user of data) {
                user.sender == "" ? adminmsg(user) : clientmsg(user);
            }
            document.location = '#messages'
        },
        error: function (request, error) {
            location.reload();
        },
    });
}
function read_msg() {
    console.log("check")
    $.ajax({
        url: "/client_query/check-msg",
        method: "POST",
        dataType: "JSON",
        success: function (data) {
            if (data.status == 202) {
                document.querySelector(".indicate").innerHTML = ""
            }
        },
        error: function (request, error) {
            location.reload();
        },
    });
}
async function msg() {
    var tab = document.querySelector('#cl-msg');
    tab.classList.add('show');
    document.querySelector(".indicate").innerHTML = ""
    await showmsg()
    read_msg();
}
function cl_msg_close() {
    var tab = document.querySelector('#cl-msg');
    tab.classList.remove('show');
}
function bcat(ths) {
    var target = document.getElementsByClassName('bct')[0];
    var vr = ths.getAttribute('data');
    target.innerHTML = "";
    target.innerHTML = ths.innerHTML;
    target.setAttribute('data', vr);
}
function bcat_reg(ths) {
    var target = document.getElementsByClassName('bct_reg')[0];
    var vr = ths.getAttribute('data');
    target.innerHTML = "";
    target.innerHTML = ths.innerHTML;
    target.setAttribute('data', vr);
}
function detail(e) {
    var all_bikes = map_data.get('all_bikes').raw;
    var all_brands = map_data.get('all_brands').raw;
    var all_categories = map_data.get('all_categories').raw;
    var b_list = map_data.get('my-bookings').raw;
    var valid_u = map_data.get('actor');
    var id = e.getAttribute('d_id')
    var d_start = new Date(b_list[id].date_start), d_end = new Date(b_list[id].date_end), stats, footing;
    var bike = [];
    var brand = [];
    var category = [];

    for (let loop = 0; loop < all_bikes.length; loop++) {
        if (all_bikes[loop].id == b_list[id].bike_id) {
            bike.push(all_bikes[loop]);
        }
    }
    function find(id) {
        for (let loop = 0; loop < all_categories.length; loop++) {
            console.log(bike)
            if (all_categories[loop].id == id) {
                category.push(all_categories[loop]);
            }
        }
    }
    function find2(id) {
        for (let loop = 0; loop < all_brands.length; loop++) {
            if (all_brands[loop].id == bike[0].brand_id) {
                brand.push(all_brands[loop]);
            }
        }
    }
    bike.length >= 1 ? find(bike[0].category_id) : category.push('');
    bike.length >= 1 ? find2(bike[0].brand_id) : brand.push('');
    var style_1 =
        `
    <button style="float: left;" type="button" name="button" class="btn bg-gradient-info m-0 ms-2" data-bs-dismiss="modal">CLOSE</button>
    `;
    if (b_list[id].status == "0") {
        stats =
            `
        <p><b>Booking Status<br></b> <span class="badge badge-warning">PENDING</span></p>
        `;
        footing =
            `
        <button style="float: left;" type="button" name="button" class="btn bg-gradient-info m-0 ms-2" data-bs-dismiss="modal">CLOSE</button>
        <button onclick="canbook(this)" d_id="${b_list[id].id}" style="float: right;" type="button" name="button" class="btn bg-gradient-dark m-0 ms-2" data-bs-dismiss="modal">CANCEL BOOKING</button>
        `
    } else if (b_list[id].status == "1") {
        stats =
            `
        <p><b>Booking Status<br></b> <span class="badge badge-info">CONFIRMED</span></p>
        `;
        footing = style_1;
    } else if (b_list[id].status == "2") {
        stats =
            `
        <p><b>Booking Status<br></b> <span class="badge badge-danger">CANCELLED</span></p>
        `;
        footing = style_1;
    } else if (b_list[id].status == "3") {
        stats =
            `
        <p><b>Booking Status<br></b> <span class="badge badge-success">PICK UP</span></p>
        `;
        footing = style_1;
    } else if (b_list[id].status == "4") {
        stats =
            `
        <p><b>Booking Status<br></b> <span class="badge badge-secondary">RETURNED</span></p>
        `;
        footing = style_1;
    }
    document.querySelector('.booked-info').innerHTML =
        `
    <div class="conitaner-fluid px-3 py-2">
        <div class="row">
            <div class="col-md-6" style="color: black !important;">
                <p><b>Client Name<br></b> ${valid_u.raw[0].firstname} ${valid_u.raw[0].lastname}</p>
                <p><b>Client Contact<br></b> ${valid_u.raw[0].contact}</p>
                <p><b>Client Address<br></b> ${valid_u.raw[0].address}</p>
                <p><b>Rent Pick up Date<br></b>${d_start.toLocaleDateString()}</p>
                <p><b>Rent Return Date<br></b> ${d_end.toLocaleDateString()}</p>
                ${stats}
            </div>
            <div class="col-md-6" style="color: black !important;">
                <p><b>Bike Category<br></b> ${category[0].category}</p>
                <p><b>Bike Brand<br></b> ${brand[0].name}</p>
                <p><b>Bike Model<br></b> ${bike.length >= 1 ? bike[0].bike_model : ""}</p>
                <p><b>Bike Daily Rate<br></b> ${bike.length >= 1 ? bike[0].daily_rate : ""}</p>
                <p><b>Day/s to Rent<br></b> ${b_list[id].rent_days}</p>
                <p><b>Client Payable Amount<br></b> ${b_list[id].amount_topay}</p>
            </div>
        </div>
    </div>
    `;
    document.querySelector('.footing').innerHTML =
        `
    ${footing}
    `;
}
function canbook(e) {
    var id = e.getAttribute('d_id');
    $.ajax({
        url: "/client_query/cancel-book",
        method: "POST",
        data: { id: id },
        dataType: "JSON",
        success: function (data) {
            if (data.status == 202) {
                initializer("/my-bookings");
            }
        },
        error: function (request, error) {
            console.log(error)
        },
    });
}
async function sign_out_admin() {
  await fetch("/auth/logout", {
    method: "POST",
  }).then(() => {
        clearInterval(intervalID);
        initializer("/");
  });
};
function updatepwd() {
    var old_p = document.getElementById('old_p');
    var new_p = document.getElementById('nw_p');
    var confnew_p = document.getElementById('confnw_p');

    if (old_p.value == "") {
        Swal.fire(
            'Please input Current password',
        )
    } else {
        $.ajax({
            url: "/client_query/validate_oldpass",
            method: "POST",
            data: { old_p: old_p.value },
            dataType: "JSON",
            success: function (data) {
                if (data.status == 202) {
                    var p = String(new_p.value);
                    if (p == "") {
                        Swal.fire(
                            'New password must not be null',
                        )
                    } else if (p.length < 7) {
                        document.getElementById("min").style.color = "red";
                    }
                    else if (p.search(/[a-z]/i) < 0) {
                        document.getElementById("st").style.color = "red";
                    }
                    else if (p.search(/[0-9]/i) < 0) {
                        document.getElementById("num").style.color = "red";
                    }
                    else {
                        if (confnew_p.value == new_p.value) {
                            $.ajax({
                                url: "/client_query/validate_newpass",
                                method: "POST",
                                data: { new_p: new_p.value },
                                dataType: "JSON",
                                success: function (data) {
                                    if (data.status == 202) {
                                        $.ajax({
                                            url: "/client_query/updatepd",
                                            method: "POST",
                                            data: { new_p: new_p.value },
                                            dataType: "JSON",
                                            success: function (data) {
                                                if (data.status == 202) {
                                                    old_p.value = "";
                                                    new_p.value = "";
                                                    confnew_p.value = "";
                                                    initializer('/profile')
                                                }
                                            }
                                        });
                                    } else {
                                        Swal.fire(
                                            'Now password must not same with old password',
                                        )
                                    }
                                }
                            });
                        } else {
                            document.getElementById("conf").style.color = "red";
                        }
                    }
                } else {
                    Swal.fire(
                        'Current password did not match',
                    )
                }
            },
            error: function (request, error) {
                console.log("error");
            },
        });
    }
}
async function s_up() {
    var f_name = document.querySelector('.name').value;
    var l_name = document.querySelector('.last_name').value;
    var addr = document.querySelector('.address').value;
    var cont_num = document.querySelector('.contact_number').value;
    var u_name = document.querySelector('.user_name').value;
    var pwd = document.querySelector('.pwd').value;
    var gend = document.querySelector('.bct_reg').getAttribute('data');
    var name_error = document.querySelector('.name_error');
    var last_name_error = document.querySelector('.last_name_error')
    var address_error = document.querySelector('.address_error')
    var contact_number_error = document.querySelector('.contact_number_error')
    var user_name_error = document.querySelector('.user_name_error')
    var pwd_error = document.querySelector('.pwd_error')
    var cond = document.querySelector('.condition')
    cond.innerHTML = ""
    name_error.innerHTML = "";
    last_name_error.innerHTML = "";
    address_error.innerHTML = "";
    contact_number_error.innerHTML = "";
    user_name_error.innerHTML = "";
    pwd_error.innerHTML = "";
    var flag = true;
    if (!document.querySelector('.conditions').checked) {
        flag = false;
        cond.innerHTML = "Please accept Terms and Conditions"
    }
    if (f_name == "") {
        flag = false;
        name_error.innerHTML = "Please fill out this field";
    }
    if (l_name == "") {
        flag = false;
        last_name_error.innerHTML = "Please fill out this field";
    }
    if (addr == "") {
        flag = false;
        address_error.innerHTML = "Please fill out this field";
    }
    if (cont_num == "") {
        flag = false;
        contact_number_error.innerHTML = "Please fill out this field";
    } else if (cont_num.length < 11) {
        flag = false;
        contact_number_error.innerHTML = "Min 11 numbers";
    }
    if (u_name == "") {
        flag = false;
        user_name_error.innerHTML = "Please fill out this field";
    } else if (u_name.length < 6) {
        flag = false;
        user_name_error.innerHTML = "Min 7 characters";
    } else {
        var validate_uname = $.ajax({
            async: false,
            url: "/client_query/check_uname",
            data: { username: u_name },
            type: 'POST',
        }).responseJSON;
        if (validate_uname.stats != 202) {
            flag = false;
            user_name_error.innerHTML = "Username is already taken";
        }
    }
    if (pwd == "") {
        flag = false;
        pwd_error.innerHTML = "Please fill out this field";
    } else if (pwd.length < 6) {
        flag = false;
        pwd_error.innerHTML = "Min 7 characters";
    }
    else if (pwd.search(/[a-z]/i) < 0) {
        flag = false;
        pwd_error.innerHTML = "Atleast one letter (recommended)";
    }
    else if (pwd.search(/[0-9]/i) < 0) {
        flag = false;
        pwd_error.innerHTML = "Atleast 1 number";
    }
    if (flag == true) {
        loading()
        await $.ajax({
            url: "/client_query/reg_client",
            method: "POST",
            data: { firstname: f_name, lastname: l_name, username: u_name, address: addr, contact: cont_num, gender: gend, password: pwd },
            dataType: "JSON",
            success: function (data) {
                if (data.status == 202) {
                    swal.close();
                  (async () => {
                    var data = new FormData();
                    data.append("um", u_name);
                    data.append("pd", pwd);
                    console.log(data);
                    await fetch("/auth/client-login", {
                      method: "POST",
                      body: data,
                    }).then(() => {
                      initializer("/");
                    });
                  })();
                }
            },
            error: function (request, error) {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Network Error",
                    showConfirmButton: false,
                    timer: 1500
                });
            },
        });
    }else{
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Form error",
            showConfirmButton: false,
            timer: 1500
        });
    }
}
function update_info_client() {
    var valid_u = map_data.get('active_u');
    var f_name = document.querySelector('.f_name');
    var l_name = document.querySelector('.l_name');
    var u_name = document.querySelector('.u_name');
    var add = document.querySelector('.address');
    var contact_num = document.querySelector('.contact');
    var c_gender = document.querySelector('.bct').getAttribute('data');
    var f, l, u, a, c, flag = true, less = true, less2 = true;
    if (f_name.value == "") {
        f = f_name.placeholder;
    } else {
        f = f_name.value;
    }
    if (l_name.value == "") {
        l = l_name.placeholder
    } else {
        l = l_name.value
    }
    if (u_name.value == "") {
        u = u_name.placeholder
    } else if (u_name.value.length < 7) {
        u = u_name.placeholder
        less = false;
    } else {
        var validate_uname = $.ajax({
            async: false,
            url: "/client_query/validate_uname",
            data: { id: valid_u.raw[0].id, username: u_name.value },
            type: 'POST',
        }).responseJSON;
        if (validate_uname.stats == 202) {
            u = u_name.value;
        } else {
            u = u_name.placeholder
            flag = false;
        }
    }
    if (add.value == "") {
        a = add.placeholder
    } else {
        a = add.value
    }
    if (contact_num.value == "") {
        c = contact_num.placeholder
    } else if (contact_num.value.length < 11) {
        c = contact_num.placeholder
        less2 = false;
    } else {
        c = contact_num.value
    }
    if (flag == false) {
        Swal.fire(
            'Username is already taken',
        )
    } else if (less == false) {
        document.querySelector('.uname_error').innerHTML = "Min 6 characters"
    } else if (less2 == false) {
        document.querySelector('.num_error').innerHTML = "Min 11 characters"
    } else {
        $.ajax({
            url: "/client_query/update_client_info",
            method: "POST",
            data: { firstname: f, lastname: l, username: u, address: a, contact: c, gender: c_gender },
            dataType: "JSON",
            success: function (data) {
                if (data.status == 202) {
                    initializer("/profile");
                }
            },
            error: function (request, error) {
                console.log(error)
            },
        });
    }
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
    function normal_mode() {
        document.title = entry.tittle;
        history.pushState(null, entry.tittle, relocate);
        document.querySelector('.layer').innerHTML = entry.layer;
        document.querySelector('.content').innerHTML = entry.content;
        page_data_loader(entry.tag);
    }
    function product_page() {
        var product_entry = c_plate.get('/product');
        document.title = product_entry.tittle + `| ${result}`;
        history.pushState(null, product_entry.tittle, `/product/${result}`);
        document.querySelector('.layer').innerHTML = product_entry.layer;
        document.querySelector('.content').innerHTML = product_entry.content;
        page_data_loader(product_entry.tag);
    }
    function book_page() {
        var product_entry = c_plate.get('/book');
        document.title = product_entry.tittle + `| ${result}`;
        history.pushState(null, product_entry.tittle, `/book/${result2}`);
        document.querySelector('.layer').innerHTML = product_entry.layer;
        document.querySelector('.content').innerHTML = product_entry.content;
        page_data_loader(product_entry.tag);
    }

    function book_mode() {
        var check_var = false;
        var all_bikes = map_data.get('all_bikes').raw;
        for (let loop = 0; loop < all_bikes.length; loop++) {
            console.log(all_bikes[loop].id)
            if (all_bikes[loop].id == result2) {
                check_var = true;
            }
        }
        check_var ? book_page() : console.log("error this");
    }

    function product_mode() {
        var check_var = false;
        request_all_b();
        var all_bikes = map_data.get('all_bikes').raw;
        for (let loop = 0; loop < all_bikes.length; loop++) {
            if (all_bikes[loop].id == result) {
                check_var = true;
            }
        }
        check_var ? product_page() : "";
    }

    var onlyContainsNumbers = (str) => /^\d+$/.test(str);
    entry ? normal_mode() : onlyContainsNumbers(result) ? product_mode() : onlyContainsNumbers(result2) ? book_mode() : "";
}
async function check_availble() {
    var starts = document.querySelector('.date_start').value;
    var ends = document.querySelector('.date_end').value;
    loading();
    await $.ajax({
        url: "/client_query/available_bikes",
        data: { start: starts, ends: ends },
        method: "POST",
        dataType: "JSON",
        success: function (data) {
            map_data.set('available_bikes', data.data);
            swal.close()
            looper1();
        },
        error: function (request, error) {
            location.reload();
        },
    });
}
async function request_actor() {
    var user = await fetch("/client_query/u_active", { method: "POST", })
    return user.json();
}
async function request_my_bookings() {
    var my_booking = await fetch("/client_query/my_bookings", { method: "POST" });
    return my_booking.json();
}
async function request_all_b() {
  var all_bikes = await fetch("/client_query/all_bikes", { method: "POST" });
  return all_bikes.json();
}
async function request_all_brands() {
    var all_brands = await fetch("/client_query/all_brands", { method: "POST" });
    return all_brands.json();
}
async function request_all_categories() {
    var all_categories = await fetch("/client_query/all_categories", { method: "POST" });
    return all_categories.json();
}
async function request_galleries() {
    var galleries = await fetch("/client_query/galleries", { method: "POST" });
    return galleries.json();
}
function msgnotif() {
    $.ajax({
        url: "/client_query/notif-msg",
        method: "POST",
        dataType: "JSON",
        success: function (data) {
            if (data.status == 202) {
                document.querySelector(".indicate").innerHTML =
                    `
                <span
                    class="position-absolute top-5 start-100 translate-middle badge rounded-pill bg-danger border border-white small py-1 px-2">
                    <span class="small">${data.unread}</span>
                </span>
                `
            }
        },
        error: function (request, error) {
            location.reload();
        },
    });
}

async function initializer(url) {
    document.querySelector(".sub-layer").innerHTML = "";
    document.querySelector(".side-layer").innerHTML = "";
    loader_animation();
    await start();
    var my_bookings = await request_my_bookings();
    var all_bikes = await request_all_b();
    var all_brands = await request_all_brands();
    var all_categories = await request_all_categories();
    var all_galeries = await request_galleries();
    var actor = await request_actor();
    map_data.set(`my-bookings`, my_bookings)
      .set(`all_bikes`, all_bikes)
      .set(`all_brands`, all_brands)
      .set(`all_categories`, all_categories)
      .set(`galleries`, all_galeries)
      .set(`actor`, actor);
    function form202(){
        format202(actor)
        intervalID = setInterval(msgnotif, 1000);
    }
    actor.status == 202 ? form202() : actor.status == 203 ? format203(actor) : format404();
    get_page(url);
}
async function book() {
    var valid_u = map_data.get('actor');
    console.log(valid_u)
    if (valid_u.status != 202) {
        get_page("/sign-in");
    } else {
        var link = rep(window.location.pathname);
        var url = link.toLowerCase();
        var res = url.split("/");
        var pos = res.indexOf('product');
        var rs1 = res[pos + 1];
        var pos2 = res.indexOf('book');
        var rs2 = res[pos2 + 1];
        var start = document.querySelector('.date_start').value
        var end = document.querySelector('.date_end').value
        var price = document.querySelector('.price').getAttribute('data')
        await Swal.fire({
            title: "Insert Drivers License",
            input: "file",
            inputAttributes: {
                accept: "image/jpeg, image/png, image/jpg",
                "aria-label": "Select Image",
            },
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(result)
                if (result.value != null) {
                    var data = new FormData();
                    data.append('license', result.value);
                    data.append('start', start);
                    data.append('end', end);
                    data.append('price', price);
                    data.append('bike_id', rs1 ? rs1 : rs2);
                    (async () => {
                        await fetch('/client_query/book', {
                            method: 'POST',
                            body: data
                        }).then(res => {
                            initializer("/my-bookings");
                        }).catch(() => {
                            window.location.reload()
                        })
                    })()
                } else {
                    console.log("something");
                }
            }
        });
    }
}


function cancupx() {
    document.querySelector(".input-prof").value = "";
}

function change_prof() {
    var c_user = map_data.get("actor").raw;
    document.querySelector(".curent_img").innerHTML = `
      <img style="height: 50% !important; width: 100% !important;" src="${c_user[0].avatar}">
      `;

    var input_prof = document.querySelector(".input-prof");
    input_prof.addEventListener("change", function () {
        var img = input_prof.files;
        if (img.length >= 1) {
            const fileReader = new FileReader();
            fileReader.onload = (event) => {
                document.querySelector(".curent_img").innerHTML = `
                      <img style="height: 50% !important; width: 100% !important;" src="${event.target.result}">
                  `;
            };
            fileReader.readAsDataURL(img[0]);
        } else {
            document.querySelector(".curent_img").innerHTML = `
                      <img style="height: 50% !important; width: 100% !important;" src="${c_user[0].avatar}">
                  `;
        }
    });
}

function update_my_prof() {
    var input_prof = document.querySelector(".input-prof");
    var img = input_prof.files;
    loading()
    if (img.length != 0) {
        // add loader here
        var data = new FormData();
        data.append("myprofile", input_prof.files[0]);
        fetch("/client_query/my-prof_update", {
            method: "POST",
            body: data,
        })
            .then((res) => {
                swal.close()
                initializer("/profile/");
            })
            .catch((rs) => {
                Swal.fire("Failed to upload profile");
                // and here
                input_prof.value = "";
            });
    } else {
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "No Image Deticted",
            showConfirmButton: false,
            timer: 1500,
        });
    }
}


window.addEventListener("load", initializer(window.location.pathname), true);

function loader_animation (){
  document.querySelector(".layer").innerHTML = `
        <style>
        *,
    *:after,
    *:before {
        box-sizing: border-box;
        transform-style: preserve-3d;
    }

    body {
        display: grid;
        place-items: center;
        min-height: 100vh;
        font-family:  'Google Sans', sans-serif,system-ui;
    }

    :root {
        --size: 120;
        --coefficient: 1px;
        --timeline: 2.6s;
        --delay: 0.65s;
    --rotation-y: -24;
    --rotation-x: 28;
    --color-one: #3a0ca3;
    --color-two: #4361ee;
    --color-three: #4cc9f0;
    }

    .scene {
    position: relative;
    transform: translate3d(0, 0, 100vmin) rotateX(calc(var(--rotation-y, 0) * 1deg)) rotateY(calc(var(--rotation-x, 0) * 1deg)) rotateX(0deg);
    }

    body {
        transform-origin: 50% 50%;
        animation: scale var(--timeline) var(--delay) infinite linear;
    }

    @keyframes scale {
    0%, 10% {
        transform: scaleX(1) scaleY(1);
    }
        35%, 100% {
            transform: scaleX(0.5) scaleY(0.5);
        }
    }

    .shadow {
        width: calc(var(--size) * var(--coefficient));
        position: absolute;
        bottom: 0;
        aspect-ratio: 1;
        transform-origin: 50% 50%;
        background: hsl(210 80% 50% / 0.2);
        transform: rotateX(90deg) translate3d(0, 0, calc((var(--size) * (var(--coefficient) * -0.5)) - 1px)) scale(0.96);
        animation: squish-squosh var(--timeline) var(--delay) infinite, fade var(--timeline) var(--delay) infinite;
        background: black;
    }

    .loader {
        --depth: var(--size);
        --color: var(--color-one, #8338EC);
        width: calc(var(--depth) * var(--coefficient));
        aspect-ratio: 1;
        transform-origin: 50% 50%;
        animation: squish-squosh var(--timeline) var(--delay) infinite;
    }

    .spinner {
        animation: spin var(--timeline) var(--delay) infinite;
    }

    .jumper {
        animation: jump var(--timeline) var(--delay) infinite;
    }

    @keyframes squish-squosh {
        0%, 50%, 60% {
            scale:  1 1 1;
        }
        10%, 35% {
            scale: 1.2 0.8 1.2;
        }
        25% {
            scale: 0.8 1.2 0.8;
        }
        70% {
            scale: 1 1 2;
        }
        80% {
            scale: 2 1 2;
        }
        90%, 100% {
            scale: 2 2 2;
        }
    }


    @keyframes fade {
        0%, 10%, 40%, 50%, 60%, 100% {
            opacity: 1;
        }
        25% {
            opacity: 0.5;
        }
    }

    @keyframes spin {
        0%, 10% { rotate: 0deg; }
        30%, 100% { rotate: -360deg; }
    }
    @keyframes jump {
        0%, 10%, 35%, 50% {
            translate: 0 0;
        }
        25% {
            translate: 0 -150%;
        }
    }

    /* Cuboid boilerplate code */
    .cuboid {
    width: 100%;
    height: 100%;
    position: relative;
    }
    .cuboid__side {
    background: var(--color);
    position: absolute;
    }
    .cuboid__side:nth-of-type(1) {
    --b: 1.1;
    height: calc(var(--depth, 20) * var(--coefficient));
    width: 100%;
    top: 0;
    transform: translate(0, -50%) rotateX(90deg);
    }
    .cuboid__side:nth-of-type(2) {
    --b: 0.9;
    --color: var(--color-three, #FF006E);
    height: 100%;
    width: calc(var(--depth, 20) * var(--coefficient));
    top: 50%;
    right: 0;
    transform: translate(50%, -50%) rotateY(90deg);
    }
    .cuboid__side:nth-of-type(3) {
    --b: 1;
    width: 100%;
    height: calc(var(--depth, 20) * var(--coefficient));
    bottom: 0;
    transform: translate(0%, 50%) rotateX(90deg);
    }
    .cuboid__side:nth-of-type(4) {
    --b: 1;
    --color: var(--color-three, #FF006E);
    height: 100%;
    width: calc(var(--depth, 20) * var(--coefficient));
    left: 0;
    top: 50%;
    transform: translate(-50%, -50%) rotateY(90deg);
    }
    .cuboid__side:nth-of-type(5) {
    --b: 1;
    --color: var(--color-two, #3A86EF);
    height: 100%;
    width: 100%;
    transform: translate3d(0, 0, calc(var(--depth, 20) * (var(--coefficient) * 0.5)));
    top: 0;
    left: 0;
    }
    .cuboid__side:nth-of-type(6) {
    --b: 1.2;
    height: 100%;
    width: 100%;
    transform: translate3d(0, 0, calc(var(--depth, 20) * (var(--coefficient) * -0.5))) rotateY(180deg);
    top: 0;
    left: 0;
    }
    </style>
    <div class="scene">
        <div class="shadow"></div>
        <div class="jumper">
            <div class="spinner">
                <div class="scaler">
                    <div class="loader">
                        <div class="cuboid">
                            <div class="cuboid__side"></div>
                            <div class="cuboid__side"></div>
                            <div class="cuboid__side"></div>
                            <div class="cuboid__side"></div>
                            <div class="cuboid__side"></div>
                            <div class="cuboid__side"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `;
};
function format404() {
  document.querySelector(".side-layer").innerHTML = `
    <div class="fixed-plugin" id="to_repeat">
        <a class="fixed-plugin-button text-dark position-fixed px-3 py-2 conf_button" onclick="client_prof()">
            <i class="material-icons py-2">person</i>
        </a>
        <div class="card shadow-lg">
            <div class="card-header pb-0 pt-3">
                <div class="float-start">
                    <div class="d-flex align-items-center">
                        <div class="ms-3">
                            <h6 class="mb-0 d-block text-white">Guest</h6>
                        </div>
                    </div>
                </div>
                <div class="float-end mt-4">
                    <button class="btn btn-link text-dark p-0 fixed-plugin-close-button" onclick="client_prof_close()">
                        <i class="material-icons" id="clr">clear</i>
                    </button>
                </div>
            </div>
            <div class="card-body pt-sm-3 pt-0">
                <div>
                    <center>
                        <div class="buttons">
                            <p>Sign in or Sign up</p>
                            <button type="button" onclick="get_page('/sign-in')" class="btn btn-rounded bg-gradient-primary mt-4">Sign in</button>
                            <button type="button" onclick="get_page('/sign-up')" class="btn btn-rounded btn-outline-secondary mt-4 ms-2">Sign up</button>
                        </div>
                    </center>
                </div>
                <div class="mt-2 d-flex">
                    <h6 class="mb-0">Light / Dark</h6>
                    <div class="form-check form-switch ps-0 ms-auto my-auto">
                        <input class="form-check-input mt-1 ms-auto" type="checkbox" id="dark-version"
                            onclick="darkMode(this)" checked="true">
                    </div>
                </div>
                <hr class="horizontal dark my-3">
                <div class="mt-2 d-flex">
                    <h6 class="mb-0">Navbar Fixed</h6>
                    <div class="form-check form-switch ps-0 ms-auto my-auto">
                        <input class="form-check-input mt-1 ms-auto" type="checkbox" id="dark-version"
                            onclick="fixbar(this)" checked="true">
                    </div>
                </div>
                <hr class="horizontal dark my-sm-2">
                <div class="container-fluid ">
                    <div>
                        <div class=" mb-lg-0 mb-4">
                            <div class="text-sm text-center text-muted">
                                ©
                                <script>
                                    document.write(new Date().getFullYear())
                                </script>
                                JNJ MOTOBIKES made <i class="fa fa-heart" aria-hidden="true"></i> by
                                <a href="#" class="font-weight-bold" target="_blank">TEAM REAM</a>
                                for a better web.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}
function format203(data) {
    document.querySelector(".side-layer").innerHTML = `
        <div class="fixed-plugin" id="to_repeat">
            <a class="fixed-plugin-button text-dark position-fixed px-3 py-2 conf_button" onclick="client_prof()">
                <i class="material-icons py-2">person</i>
            </a>
            <div class="card shadow-lg">
                <div class="card-header pb-0 pt-3">
                    <div class="float-start">
                        <div class="d-flex align-items-center prf">
                            <img alt="Image"
                            src="${data.raw[0].avatar}"
                            class="avatar">
                            <div class="ms-3">
                                <h6 style="color: blue !important;" class="mb-0 d-block text-white">${data.raw[0].firstname.toUpperCase()} ${data.raw[0].lastname.toUpperCase()}</h6>
                                <span class="text-sm text-white opacity-8">ACCOUNT TYPE : ADMIN</span>
                            </div>
                        </div>
                    </div>
                    <div class="float-end mt-4">
                        <button class="btn btn-link text-dark p-0 fixed-plugin-close-button" onclick="client_prof_close()">
                            <i class="material-icons" id="clr">clear</i>
                        </button>
                    </div>
                </div>
                <div class="card-body pt-sm-3 pt-0">
                    <div>
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
                    </div>
                    <div class="mt-2 d-flex">
                        <h6 class="mb-0">Light / Dark</h6>
                        <div class="form-check form-switch ps-0 ms-auto my-auto">
                            <input class="form-check-input mt-1 ms-auto" type="checkbox" id="dark-version"
                                onclick="darkMode(this)" checked="true">
                        </div>
                    </div>
                    <hr class="horizontal dark my-3">
                    <div class="mt-2 d-flex">
                        <h6 class="mb-0">Navbar Fixed</h6>
                        <div class="form-check form-switch ps-0 ms-auto my-auto">
                            <input class="form-check-input mt-1 ms-auto" type="checkbox" id="dark-version"
                                onclick="fixbar(this)" checked="true">
                        </div>
                    </div>
                    <hr class="horizontal dark my-sm-2">
                    <div class="container-fluid ">
                        <div>
                            <div class=" mb-lg-0 mb-4">
                                <div class="text-sm text-center text-muted">
                                    ©
                                    <script>
                                        document.write(new Date().getFullYear())
                                    </script>
                                    JNJ MOTOBIKES made <i class="fa fa-heart" aria-hidden="true"></i> by
                                    <a href="#" class="font-weight-bold" target="_blank">TEAM REAM</a>
                                    for a better web.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
}
function format202(data) {
    document.querySelector(".side-layer").innerHTML = `
        <div class="fixed-plugin" id="to_repeat">
            <a class="fixed-plugin-button text-dark position-fixed px-3 py-2 conf_button" onclick="client_prof()">
                <i class="material-icons py-2">person</i>
            </a>
            <div class="card shadow-lg">
                <div class="card-header pb-0 pt-3">
                    <div class="float-start">
                        <div class="d-flex align-items-center">
                            <img alt="Image"
                                src="${data.raw[0].avatar}"
                                class="avatar">
                            <div class="ms-3">
                                <h6 class="mb-0 d-block text-md text-white" style="color: blue !important;">${data.raw[0].firstname.toUpperCase()} ${data.raw[0].lastname.toUpperCase()}</h6>
                                <span class="text-sm text-white opacity-8">ACCOUNT TYPE : CLIENT</span>
                            </div>
                        </div>
                    </div>
                    <div class="float-end mt-4">
                        <button class="btn btn-link text-dark p-0 fixed-plugin-close-button" onclick="client_prof_close()">
                            <i class="material-icons" id="clr">clear</i>
                        </button>
                    </div>
                </div>
                <div class="card-body pt-sm-3 pt-0">
                    <div>
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
                    </div>
                    <div class="mt-2 d-flex">
                        <h6 class="mb-0">Light / Dark</h6>
                        <div class="form-check form-switch ps-0 ms-auto my-auto">
                            <input class="form-check-input mt-1 ms-auto" type="checkbox" id="dark-version"
                                onclick="darkMode(this)" checked="true">
                        </div>
                    </div>
                    <hr class="horizontal dark my-3">
                    <div class="mt-2 d-flex">
                        <h6 class="mb-0">Navbar Fixed</h6>
                        <div class="form-check form-switch ps-0 ms-auto my-auto">
                            <input class="form-check-input mt-1 ms-auto" type="checkbox" id="dark-version"
                                onclick="fixbar(this)" checked="true">
                        </div>
                    </div>
                    <hr class="horizontal dark my-sm-2">
                    <div class="container-fluid ">
                        <div>
                            <div class=" mb-lg-0 mb-4">
                                <div class="text-sm text-center text-muted">
                                    ©
                                    <script>
                                        document.write(new Date().getFullYear())
                                    </script>
                                    JNJ MOTOBIKES made <i class="fa fa-heart" aria-hidden="true"></i> by
                                    <a href="#" class="font-weight-bold" target="_blank">TEAM REAM</a>
                                    for a better web.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    var sub_layer = document.querySelector(".sub-layer");
    sub_layer.innerHTML = layout.get("msg");
}
