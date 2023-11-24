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
const gather = async (url, name) => {
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
    admin_template_data.set(`/${root_name}`,{tittle: `${page_tittle_main} | ADMIN | Dashboard`,tag: "dashboard",content: layout.get('dashboard')})
    admin_template_data.set(`/${root_name}/profile`,{tittle: `${page_tittle_main} | ADMIN | Dashboard`,tag: "profile",content: layout.get('profile')})
    admin_template_data.set(`/${root_name}/sign-in`,{tittle: `${page_tittle_main} | ADMIN | Sign-in`,layer: layout.get('layer-s-in')})
    admin_template_data.set(`/${root_name}/motorbikes`,{tittle: `${page_tittle_main} | ADMIN | BIKE LIST`,tag: "Motorbikes",content: layout.get('bike_list')})
    admin_template_data.set(`/${root_name}/motorbikes/add`,{tittle: `${page_tittle_main} | ADMIN | BIKE LIST`,tag: "Add Motorbike",content: layout.get('add_bike')})
    admin_template_data.set(`/${root_name}/bookinglist`,{tittle: `${page_tittle_main} | ADMIN | BOOKING LIST`,tag: "bookinglist",content: layout.get('booking_list')})
    admin_template_data.set(`/${root_name}/bookingreports`,{tittle: `${page_tittle_main} | ADMIN | BOOKING REPORTS`,tag: "bookingreports",content: layout.get('booking_report')})
    admin_template_data.set(`/${root_name}/clients`,{tittle: `${page_tittle_main} | ADMIN | Clients`,tag: "clients",content: layout.get('client_list')})
    admin_template_data.set(`/${root_name}/brandlist`,{tittle: `${page_tittle_main} | ADMIN | BRAND LIST`,tag: "brandlist",content: layout.get('brand_list')})
    admin_template_data.set(`/${root_name}/categorylist`,{tittle: `${page_tittle_main} | ADMIN | CATEGORY LIST`,tag: "categorylist",content: layout.get('category_list')})
};
const data_initializer = async()=> {
    var subjects = [
        { "url": "/query/bike_list", "name": "bikes" },
        { "url": "/query/clients_list", "name": "clients" },
        { "url": "/query/brands", "name": "brand_list" },
        { "url": "/query/categories", "name": "categories" },
        { "url": "/query/rent_list", "name": "rent_list" },
        { "url": "/query/bike_gallery", "name": "bike_gallery" },
        { "url": "/query/active_user", "name": "user" }
    ]
    for (let subj of subjects) {
        await gather(subj.url, subj.name);
    }
}
const sign_in = () => {
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
                        await analizer("/admin/");
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
const get_page = (tag) => {
    if (tag == 'dashboard') {
        var t_bikes = document.getElementsByClassName("total_motorbikes")[0];
        var d_bikes = document.getElementsByClassName("d_bikes")[0];
        var usrs = document.getElementsByClassName("usrs")[0];
        var brands = document.getElementsByClassName("brands")[0];
        var categories = document.getElementsByClassName("categories_board")[0];
        categories.innerHTML = "";
        var y = map1.get('categories')
        categories.innerHTML = y.length;
        brands.innerHTML = "";
        var x = map1.get('brand_list')
        brands.innerHTML = x.length;

        usrs.innerHTML = "";
        var u = map1.get("clients");
        usrs.innerHTML = u.length;


        t_bikes.innerHTML = "";
        var a = map1.get('bikes')
        t_bikes.innerHTML = a.length;


    }
    else if (tag == 'Motorbikes') {
        var a = map1.get('bikes')
        var categories = map1.get('categories');
        var brand_list = map1.get('brand_list');
        var t = document.getElementsByClassName("todisplay")[0];
        function gdt(dt) {
            var dc = new Date(dt)
            var day = String(dc.getDate()).padStart(2, '0');
            var month = String(dc.getMonth() + 1).padStart(2, '0');
            var year = String(dc.getFullYear());
            var hours = String(dc.getHours());
            var minutes = String(dc.getMinutes());
            return `${year}-${month}-${day} ${hours}:${minutes}`
        }
        for (let loop = 0; loop < a.length; loop++) {
            var crtd = gdt(a[loop].date_created);
            var brnd = "N/A", type = "N/A";
            for (let b = 0; b < brand_list.length; b++) {
                console.log(brand_list[b].name);
                if (a[loop].brand_id == brand_list[b].id) {
                    brnd = brand_list[b].name
                }
            }
            for (let c = 0; c < categories.length; c++) {
                if (a[loop].category_id == categories[c].id) {
                    type = categories[c].category
                }
            }
            t.innerHTML += `
            <div class="col-lg-4 col-md-6 mt-5 mt-md-1 mb-4" style="margin-bottom: 7vh !important;">
                <div class="card" data-animation="true">
                    <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                        <a class="d-block blur-shadow-image">
                            <img src="${a[loop].avatar}" class="img-fluid border-radius-lg" alt="Responsive image">
                        </a>
                        <div class="colored-shadow"
                            style="background-image: url(${a[loop].avatar});">
                        </div>
                    </div>
                    <div class="card-body text-center">
                        <div class="mt-n6 mx-auto">
                            <a d_id="${loop}" onclick="edt_b(this)" type="button" class="btn btn-link text-info ms-auto border-0" data-bs-toggle="modal" data-bs-target="#edbk"">
                                <i class="material-icons position-relative ms-auto text-lg me-1 my-auto">edit</i>
                            </a>
                            <a onclick="del_b(this)" d_id="${a[loop].id}" class="btn btn-link text-danger ms-auto border-0" data-bs-toggle="tooltip"
                                data-bs-placement="bottom" title="delete">
                                <i class="material-icons position-relative ms-auto text-lg me-1 my-auto">delete</i>
                            </a>
                        </div>
                        <div class="row mt-4">
                            <div class="col-6">
                                <div class="input-group input-group-static">
                                    <label> Bike Type </label>
                                    <input placeholder="${type}" type="text" class="form-control" disabled>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="input-group input-group-static">
                                    <label> Bike Brand </label>
                                    <input placeholder="${brnd}" type="text" class="form-control" disabled>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-6">
                                <div class="input-group input-group-static">
                                    <label> Bike Model</label>
                                    <input placeholder="${a[loop].bike_model}" type="text" class="form-control" disabled>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="input-group input-group-static">
                                    <label> Date Created </label>
                                    <input placeholder="${crtd}" type="text" class="form-control" disabled>
                                </div>
                            </div>
                        </div>
                        <div class="input-group input-group-dynamic">
                    </div>
                </div>
            </div>
            `
        }
        var bike_search = document.querySelector('.bike_search');
        bike_search.addEventListener('keyup', e => {
            if (e.target.value == "") {
                t.innerHTML = "";
                for (let loop = 0; loop < a.length; loop++) {
                    var crtd = gdt(a[loop].date_created);
                    var brnd, type;
                    for (let b = 0; b < brand_list.length; b++) {
                        if (a[loop].brand_id == brand_list[b].id) {
                            brnd = brand_list[b].name
                        }
                    }

                    for (let c = 0; c < categories.length; c++) {
                        if (a[loop].category_id == categories[c].id) {
                            type = categories[c].category
                        }
                    }
                    t.innerHTML += `
                    <div class="col-lg-4 col-md-6 mt-5 mt-md-1 mb-4" style="margin-bottom: 7vh !important;">
                        <div class="card" data-animation="true">
                            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                <a class="d-block blur-shadow-image">
                                    <img src="${a[loop].avatar}" alt="img-blur-shadow"
                                        class="img-fluid shadow border-radius-lg">
                                </a>
                                <div class="colored-shadow"
                                    style="background-image: url(${a[loop].avatar});">
                                </div>
                            </div>
                            <div class="card-body text-center">
                                <div class="mt-n6 mx-auto">
                                    <a d_id="${loop}" onclick="edt_b(this)" type="button" class="btn btn-link text-info ms-auto border-0" data-bs-toggle="modal" data-bs-target="#edbk"">
                                        <i class="material-icons position-relative ms-auto text-lg me-1 my-auto">edit</i>
                                    </a>
                                    <a onclick="del_b(this)" d_id="${a[loop].id}" class="btn btn-link text-danger ms-auto border-0" data-bs-toggle="tooltip"
                                        data-bs-placement="bottom" title="delete">
                                        <i class="material-icons position-relative ms-auto text-lg me-1 my-auto">delete</i>
                                    </a>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-6">
                                        <div class="input-group input-group-static">
                                            <label> Bike Type </label>
                                            <input placeholder="${type}" type="text" class="form-control" disabled>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="input-group input-group-static">
                                            <label> Bike Brand </label>
                                            <input placeholder="${brnd}" type="text" class="form-control" disabled>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-6">
                                        <div class="input-group input-group-static">
                                            <label> Bike Model</label>
                                            <input placeholder="${a[loop].bike_model}" type="text" class="form-control" disabled>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="input-group input-group-static">
                                            <label> Date Created </label>
                                            <input placeholder="${crtd}" type="text" class="form-control" disabled>
                                        </div>
                                    </div>
                                </div>
                                <div class="input-group input-group-dynamic">
                            </div>
                        </div>
                    </div>
                    `
                }
            } else {
                t.innerHTML = "";
                var tosearch = [];
                var to_map = [...map1.entries()][0][1];
                for (let m = 0; m < to_map.length; m++) {
                    var dc = new Date(to_map[m].date_created)
                    var day = String(dc.getDate()).padStart(2, '0');
                    var month = String(dc.getMonth() + 1).padStart(2, '0');
                    var year = String(dc.getFullYear());
                    var hours = String(dc.getHours());
                    var minutes = String(dc.getMinutes());
                    var bike_model = to_map[m].bike_model, brand, category, date_created = `${year}-${month}-${day} ${hours}:${minutes}`, id = to_map[m].id;
                    for (let c = 0; c < categories.length; c++) {
                        if (to_map[m].category_id == categories[c].id) {
                            category = categories[c].category;
                        }
                    }
                    for (let b = 0; b < brand_list.length; b++) {

                        if (to_map[m].brand_id == brand_list[b].id) {
                            brand = brand_list[b].name;
                        }
                    }
                    tosearch.push({ 'id': id, 'model': bike_model.toLowerCase(), 'type': category.toLowerCase(), 'brand': brand.toLowerCase(), 'date_created': date_created })
                }
                var tg_val = String(e.target.value)
                let by_bike_model = tosearch.filter(function (tosearch) {
                    var tsm = String(tosearch.model);
                    return tsm.includes(tg_val.toLowerCase());
                }).map(function (tosearch) {
                    return tosearch.id;
                })
                let by_category = tosearch.filter(function (tosearch) {
                    var tsm = String(tosearch.type);
                    return tsm.includes(tg_val.toLowerCase());
                }).map(function (tosearch) {
                    return tosearch.id;
                })
                let by_brand = tosearch.filter(function (tosearch) {
                    var tsm = String(tosearch.brand);
                    return tsm.includes(tg_val.toLowerCase());
                }).map(function (tosearch) {
                    return tosearch.id;
                })
                let by_date = tosearch.filter(function (tosearch) {
                    var tsm = String(tosearch.date_created);
                    return tsm.includes(tg_val.toLowerCase());
                }).map(function (tosearch) {
                    return tosearch.id;
                })
                function removedoplicates(arr) {
                    return arr.filter((el, index) => arr.indexOf(el) === index)
                }
                var combinedArray1 = by_bike_model.concat(by_category);
                var combinedArray2 = by_brand.concat(by_date);
                var combinedArray = combinedArray1.concat(combinedArray2);
                var combined = removedoplicates(combinedArray)
                for (let x = 0; x < combined.length; x++) {
                    for (let loop = 0; loop < a.length; loop++) {
                        if (combined[x] == a[loop].id) {
                            var crtd = gdt(a[loop].date_created);
                            var brnd, type;
                            for (let b = 0; b < brand_list.length; b++) {
                                if (a[loop].brand_id == brand_list[b].id) {
                                    brnd = brand_list[b].name
                                }
                            }
                            for (let c = 0; c < categories.length; c++) {
                                if (a[loop].category_id == categories[c].id) {
                                    type = categories[c].category
                                }
                            }
                            t.innerHTML += `
                            <div class="col-lg-4 col-md-6 mt-5 mt-md-1 mb-4" style="margin-bottom: 7vh !important;">
                                <div class="card" data-animation="true">
                                    <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                        <a class="d-block blur-shadow-image">
                                            <img src="${a[loop].avatar}" alt="img-blur-shadow"
                                                class="img-fluid shadow border-radius-lg">
                                        </a>
                                        <div class="colored-shadow"
                                            style="background-image: url(${a[loop].avatar});">
                                        </div>
                                    </div>
                                    <div class="card-body text-center">
                                            <div class="mt-n6 mx-auto">
                                                <a d_id="${loop}" onclick="edt_b(this)" type="button" class="btn btn-link text-info ms-auto border-0" data-bs-toggle="modal" data-bs-target="#edbk"">
                                                    <i class="material-icons position-relative ms-auto text-lg me-1 my-auto">edit</i>
                                                </a>
                                                <a onclick="del_b(this)" d_id="${a[loop].id}" class="btn btn-link text-danger ms-auto border-0" data-bs-toggle="tooltip"
                                                    data-bs-placement="bottom" title="delete">
                                                    <i class="material-icons position-relative ms-auto text-lg me-1 my-auto">delete</i>
                                                </a>
                                            </div>
                                        <div class="row mt-4">
                                            <div class="col-6">
                                                <div class="input-group input-group-static">
                                                    <label> Bike Type </label>
                                                    <input placeholder="${type}" type="text" class="form-control" disabled>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="input-group input-group-static">
                                                    <label> Bike Brand </label>
                                                    <input placeholder="${brnd}" type="text" class="form-control" disabled>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mt-4">
                                            <div class="col-6">
                                                <div class="input-group input-group-static">
                                                    <label> Bike Model</label>
                                                    <input placeholder="${a[loop].bike_model}" type="text" class="form-control" disabled>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="input-group input-group-static">
                                                    <label> Date Created </label>
                                                    <input placeholder="${crtd}" type="text" class="form-control" disabled>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="input-group input-group-dynamic">
                                    </div>
                                </div>
                            </div>
                            `
                        }
                    }
                }
            }
        });
    }
    else if (tag == 'bookinglist') {
        filter_remove();
    } else if (tag == 'bookingreports') {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var this_month = String(today.getMonth() + 1).padStart(2, '0');
        var past_month = String(today.getMonth() + 1).padStart(2, '0');
        var thisyyyy = today.getFullYear() - 1;
        var lastyyyy = today.getFullYear();
        var sstrt = document.getElementById('d_start');
        var eeend = document.getElementById('d_end');
        sstrt.value = `${thisyyyy}-${past_month}-${dd}`;
        $('#d_start').attr('max', `${lastyyyy}-${this_month}-${dd}`);
        eeend.value = `${lastyyyy}-${this_month}-${dd}`;
        $('#d_end').attr('min', `${thisyyyy}-${past_month}-${dd}`);
        $("#d_start").change((a) => {
            if (a.target.value) {
                var tocompare = document.getElementById('d_end');
                var this_date = new Date(a.target.value)
                var added1day = addDays(this_date, 2)
                var added_day = String(added1day.getDate()).padStart(2, '0');
                var this_m = String(added1day.getMonth() + 1).padStart(2, '0');
                var year = added1day.getFullYear();
                var d2move = `${year}-${this_m}-${added_day}`
                if (d2move >= tocompare.value) {
                    tocompare.value = d2move;
                    tocompare.min = d2move;
                } else {
                    $('#d_end').attr('min', d2move);
                }
            }
        })
        $("#d_end").change((a) => {
            if (a.target.value) {
                var tocompare = document.getElementById('d_start');
                var this_date = new Date(a.target.value)
                var deduct2day = deductDays(this_date, 2)
                var deducted_day = String(deduct2day.getDate()).padStart(2, '0');
                var this_m = String(deduct2day.getMonth() + 1).padStart(2, '0');
                var year = deduct2day.getFullYear();
                var d2move = `${year}-${this_m}-${deducted_day}`
                $('#d_start').attr('max', d2move);
            }
        })
        $('#examp').DataTable({
            dom: 'Bfrtip',
            "bInfo": false,
            "bPaginate": false,
            buttons: [],
            searching: false,
        });
    }else if (tag == 'clients') {
        // saba-diha
        try{
            var clients = map1.get('users')
            var table = document.getElementsByClassName('clients_list')[0]
            for (let c = 0 ; c < clients.length; c++){
                var dc = new Date(clients[c].date_created), d_up = new Date(clients[c].date_updated), l_ln = new Date(clients[c].last_login), addr, gndr;
                if(clients[c].address == ""){
                    addr = "N/A";
                }else{
                    addr = clients[c].address
                }

                if(clients[c].gender == ""){    
                    gndr = "N/A";
                }else{
                    gndr = clients[c].gender
                }
                table.innerHTML += `
                <center>
                <tr class="text-center">
                    <td>${clients[c].id}</td>
                    <td>${clients[c].firstname}</td>
                    <td>${clients[c].lastname}</td>
                    <td>${gndr}</td>
                    <td>${clients[c].contact}</td>
                    <td>${clients[c].email}</td>
                    <td>${addr}</td>
                    <td>${l_ln.toLocaleDateString()}</td>
                    <td>${dc.toLocaleDateString()}</td>
                    <td>${d_up.toLocaleDateString()}</td>
                    <td>
                        <button onclick='next("/admin/clients/${clients[c].id}")' type="button" class="btn btn-link text-info ms-auto border-0" title="edit"><i class="material-icons position-relative ms-auto text-lg me-1 my-auto">edit</i></button>
                        <a onclick="del_cl(this)" d_id="${clients[c].id}" class="btn btn-link text-danger ms-auto border-0" title="delete">
                            <i class="material-icons position-relative ms-auto text-lg me-1 my-auto">delete</i>
                        </a>
                    </td>
                </tr>
                </center>
                `
            }
            
            $('#example3').DataTable({
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
        }catch{
            //abcd
            var conf = window.location.pathname
            
            var url = conf.toLowerCase();
            var res = url.split("/");
            var pos = res.indexOf('clients');
            var result = res[pos+1];
            var x = map1.get('users')
            var info = [];
            for(let cl = 0; cl < x.length; cl++){
                if(x[cl].id == result){
                    info.push(x[cl])
                }
            }
            console.log(info);
            function today(td) {
                var this_date = new Date(td)
                var day = String(this_date.getDate()).padStart(2, '0');
                var m = String(this_date.getMonth() + 1).padStart(2, '0');
                var year = this_date.getFullYear();
                return `${year}-${m}-${day}`;
            }
            var add, gnd;
            if(info[0].address == ""){
                add = "N/A"
            }else{
                add = info[0].address
            }

            if(info[0].gender == ""){
                gnd = "N/A"
            }else{
                gnd = info[0].gender
            }

            var display_f_name = document.getElementsByClassName('display_full_name')[0]
            var display_type = document.getElementsByClassName('display_type')[0]
            display_f_name.innerHTML = `${info[0].firstname} ${info[0].lastname}`
            document.querySelector('.cl_avatar').setAttribute('src', info[0].avatar)
            document.querySelector('.cp').setAttribute('d_id', info[0].id)
            display_type.innerHTML = "client";
            document.getElementById("display_id").placeholder = `${info[0].id}`;
            document.getElementById("f_name").placeholder = `${info[0].firstname}`;
            document.getElementById("l_name").placeholder = `${info[0].lastname}`;
            document.getElementById("u_name").placeholder = `${info[0].email}`;
            document.getElementById("last_login").placeholder = `${today(info[0].last_login)}`;
            document.getElementById("date_added").placeholder = `${today(info[0].date_created)}`;
            document.getElementById("date_updated").placeholder = `${today(info[0].date_updated)}`;
            document.querySelector('.cl_inf').setAttribute('data_id', result)
            document.querySelector('.updid').setAttribute('data_id', result)
            document.getElementById("address").placeholder = `${add}`;
            document.querySelector('.bct7').setAttribute('data', gnd)
            document.querySelector('.bct7').innerHTML = gnd;
            document.getElementById("contact").placeholder = `${info[0].contact}`;
        }
    }
    else if (tag == 'brandlist') {
        var brands = map1.get('brand_list')
        var table = document.getElementsByClassName('brand_list')[0]
        for (let b = 0; b < brands.length; b++) {
            var stats, dc = new Date(brands[b].date_created), dp = new Date(brands[b].date_updated);
            if (brands[b].status == "0") {
                stats = "inactive"
            } else if (brands[b].status == "1") {
                stats = "active"
            }
            table.innerHTML += `
            <center>
            <tr class="text-center">
                <td>${brands[b].id}</td>
                <td>${brands[b].name}</td>
                <td>${dc.toLocaleDateString()}</td>
                <td>${dp.toLocaleDateString()}</td>
                <td>${stats}</td>
                <td>
                    <button d_id="${brands[b].id}" onclick="edit_br(this)" type="button" class="btn btn-link text-info ms-auto border-0" title="edit" data-bs-toggle="modal" data-bs-target="#edt_m"><i class="material-icons position-relative ms-auto text-lg me-1 my-auto">edit</i></button>
                    <a onclick="del_br(this)" d_id="${brands[b].id}" class="btn btn-link text-danger ms-auto border-0" title="delete">
                        <i class="material-icons position-relative ms-auto text-lg me-1 my-auto">delete</i>
                    </a>
                </td>
            </tr>
            </center>
            `
        }
        $('#example').DataTable({
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
    }else if (tag == 'categorylist') {
        var categories = map1.get('categories')
        var table = document.getElementsByClassName('category_list')[0]
        for (let c = 0; c < categories.length; c++) {
            var stats, dc = new Date(categories[c].date_created), dp = new Date(categories[c].date_updated);
            if (categories[c].status == "0") {
                stats = "inactive"
            } else if (categories[c].status == "1") {
                stats = "active"
            }
            table.innerHTML += `
            <center>
            <tr class="text-center">
                <td>${categories[c].id}</td>
                <td>${categories[c].category}</td>
                <td>${dc.toLocaleDateString()}</td>
                <td>${dp.toLocaleDateString()}</td>
                <td>${stats}</td>
                <td>
                    <button d_id="${categories[c].id}" onclick="edit_cat(this)" type="button" class="btn btn-link text-info ms-auto border-0" title="edit" data-bs-toggle="modal" data-bs-target="#edt_cat"><i class="material-icons position-relative ms-auto text-lg me-1 my-auto">edit</i></button>
                    <a onclick="remove_cat(this)" d_id="${categories[c].id}" class="btn btn-link text-danger ms-auto border-0" title="delete">
                        <i class="material-icons position-relative ms-auto text-lg me-1 my-auto">delete</i>
                    </a>
                </td>
            </tr>
            </center>
            `
        }
        $('#example2').DataTable({
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
    }else if (tag == 'profile') {
        console.log("hellow profile")
        var x = map1.get('user')
        var display_f_name = document.getElementsByClassName('display_full_name')[0]
        var display_type = document.getElementsByClassName('display_type')[0]
        document.querySelector('.my-profile').setAttribute('src',x[0].avatar)
        display_f_name.innerHTML = `${x[0].firstname} ${x[0].lastname}`
        var tp;
        if (x[0].type = 1) {
            tp = "admin"
        } else {
            tp = "client"
        }
        function today(td) {
            var this_date = new Date(td)
            var day = String(this_date.getDate()).padStart(2, '0');
            var m = String(this_date.getMonth() + 1).padStart(2, '0');
            var year = this_date.getFullYear();
            return `${year}-${m}-${day}`;
        }
        display_type.innerHTML = tp;
        document.getElementById("display_id").placeholder = `${x[0].id}`;
        document.getElementById("f_name").placeholder = `${x[0].firstname}`;
        document.getElementById("l_name").placeholder = `${x[0].lastname}`;
        document.getElementById("u_name").placeholder = `${x[0].username}`;
        document.getElementById("last_login").placeholder = `${today(x[0].last_login)}`;
        document.getElementById("date_added").placeholder = `${today(x[0].date_added)}`;
        document.getElementById("date_updated").placeholder = `${today(x[0].date_updated)}`;
    } else if (tag == 'Add Motorbike') {
        $('#onkp').keypress(function (e) {
            if (this.value.length == 0 && e.which == 48) {
                return false;
            }
            if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                return false;
            }
        });
        var x = map1.get('categories')
        var x2 = map1.get('brand_list')
        var target = document.getElementsByClassName('bct')[0];
        var target2 = document.getElementsByClassName('bct2')[0];
        var target3 = document.getElementsByClassName('bct3')[0];
        target3.setAttribute('data_id', 1)
        target.innerHTML = x[0].category;
        target.setAttribute('data_id', x[0].id)
        target2.innerHTML = x2[0].name;
        target2.setAttribute('data_id', x2[0].id)
        var tb_bt = document.getElementsByClassName('bt')[0];
        var tb_bt2 = document.getElementsByClassName('bt2')[0];

        for (var l = 0; l < x.length; l++) {
            tb_bt.innerHTML += `<li><a class="dropdown-item border-radius-md" href="javascript:;" data_id="${x[l].id}" onclick="bcat(this)">${x[l].category}</a></li>`
        }
        for (var l = 0; l < x.length; l++) {
            tb_bt2.innerHTML += `<li><a class="dropdown-item border-radius-md" href="javascript:;" data_id="${x2[l].id}" onclick="bcat2(this)">${x2[l].name}</a></li>`
        }
    }
    else {
        console.log("else")
    }
}
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
const page_handler = async url => {
    var sub_url = url.toLowerCase();
    await data_initializer().then(() => {
        var curent_url = rep(sub_url);
        const entry = admin_template_data.get(curent_url);
        document.title = entry.tittle;
        history.pushState(
          null,
          entry.tittle,
          location.protocol + "//" + location.host + curent_url + location.hash
        );
        document.querySelector(".bdy").innerHTML = entry.content
        get_page(entry.tag);
    });
}
const analizer = async(url)=>{
    await start().then(()=>{
        (async () => {
            await $.ajax({
                url: '/query/active_user',
                method: "POST",
                dataType: "JSON",
                success: function (data) {
                    if (data.status == 202) {
                      var layer = document.querySelector(".layer");
                      layer.innerHTML = "";
                      layer.innerHTML = layout.get("layer-index");
                      page_handler(url);
                    } else {
                      var locate = window.location.pathname.toLowerCase();
                      var layer = document.querySelector(".layer");
                      const entry = admin_template_data.get(rep(locate));
                      document.title = entry.tittle;
                      history.pushState(null, entry.tittle, rep(locate));
                      layer.innerHTML += entry.layer;
                    }
                },
                error: function (request, error) {
                    console.log(error)
                },
            });
        })();
    })
}
window.addEventListener("load", analizer(window.location.pathname), false);
