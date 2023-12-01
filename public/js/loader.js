"use strict";
const page_tittle_main = "MOTOREBIKE RENTAL SYSTEM";
const root_name = "admin";
const sub_name = "";
const admin_template_data = new Map([]);
const layout = new Map([]);
const map1 = new Map([]);
var removd = [];
var filtered;
var v2;
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
      layout.set(name, data);
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
      map1.set(name, data.raw);
    },
    error: function (request, error) {
      alert(error);
    },
  });
};
const start = async () => {
  var static_template = [
    { url: "/adstemplate/add_bike", template: "add_bike" },
    { url: "/adstemplate/bike_list", template: "bike_list" },
    { url: "/adstemplate/booking_list", template: "booking_list" },
    { url: "/adstemplate/booking_report", template: "booking_report" },
    { url: "/adstemplate/brand_list", template: "brand_list" },
    { url: "/adstemplate/category_list", template: "category_list" },
    { url: "/adstemplate/client_list", template: "client_list" },
    { url: "/adstemplate/client_profile", template: "client_profile" },
    { url: "/adstemplate/dashboard", template: "dashboard" },
    { url: "/adstemplate/layer-index", template: "layer-index" },
    { url: "/adstemplate/layer-s-in", template: "layer-s-in" },
    { url: "/adstemplate/profile", template: "profile" },
  ];
  for (let procedure of static_template) {
    await templating(procedure.url, procedure.template);
  }
  admin_template_data.set(`/${root_name}`, {
    tittle: `${page_tittle_main} | ADMIN | Dashboard`,
    tag: "dashboard",
    content: layout.get("dashboard"),
  });
  admin_template_data.set(`/${root_name}/profile`, {
    tittle: `${page_tittle_main} | ADMIN | Dashboard`,
    tag: "profile",
    content: layout.get("profile"),
  });
  admin_template_data.set(`/${root_name}/sign-in`, {
    tittle: `${page_tittle_main} | ADMIN | Sign-in`,
    layer: layout.get("layer-s-in"),
  });
  admin_template_data.set(`/${root_name}/motorbikes`, {
    tittle: `${page_tittle_main} | ADMIN | BIKE LIST`,
    tag: "Motorbikes",
    content: layout.get("bike_list"),
  });
  admin_template_data.set(`/${root_name}/motorbikes/add`, {
    tittle: `${page_tittle_main} | ADMIN | BIKE LIST`,
    tag: "Add Motorbike",
    content: layout.get("add_bike"),
  });
  admin_template_data.set(`/${root_name}/bookinglist`, {
    tittle: `${page_tittle_main} | ADMIN | BOOKING LIST`,
    tag: "bookinglist",
    content: layout.get("booking_list"),
  });
  admin_template_data.set(`/${root_name}/bookingreports`, {
    tittle: `${page_tittle_main} | ADMIN | BOOKING REPORTS`,
    tag: "bookingreports",
    content: layout.get("booking_report"),
  });
  admin_template_data.set(`/${root_name}/clients`, {
    tittle: `${page_tittle_main} | ADMIN | Clients`,
    tag: "clients",
    content: layout.get("client_list"),
  });
  admin_template_data.set(`/${root_name}/brandlist`, {
    tittle: `${page_tittle_main} | ADMIN | BRAND LIST`,
    tag: "brandlist",
    content: layout.get("brand_list"),
  });
  admin_template_data.set(`/${root_name}/categorylist`, {
    tittle: `${page_tittle_main} | ADMIN | CATEGORY LIST`,
    tag: "categorylist",
    content: layout.get("category_list"),
  });
};
const data_initializer = async () => {
  var subjects = [
    { url: "/query/bike_list", name: "bikes" },
    { url: "/query/clients_list", name: "clients" },
    { url: "/query/brands", name: "brand_list" },
    { url: "/query/categories", name: "categories" },
    { url: "/query/rent_list", name: "rent_list" },
    { url: "/query/bike_gallery", name: "bike_gallery" },
    { url: "/query/active_user", name: "user" },
  ];
  for (let subj of subjects) {
    await gather(subj.url, subj.name);
  }
};
const sign_in = () => {
  loading();
  var nm = document.getElementById("uname").value;
  var pd = document.getElementById("pwd").value;
  if (!nm && pd) {
    Swal.fire("Please input username");
  }
  if (!pd && nm) {
    Swal.fire("Please input password");
  }
  if (!nm && !pd) {
    Swal.fire("Please fill up filds");
  }
  if (nm && pd) {
    $.ajax({
      url: "/auth/admin-login",
      method: "POST",
      data: { um: nm, pd: pd },
      dataType: "JSON",
      success: function (data) {
        if (data.status == 202) {
          swal.close();
          (async () => {
            await analizer("/admin/");
          })();
        } else {
          swal.close();
          Swal.fire("No user founds");
        }
      },
      error: function (request, error) {
        alert(error);
      },
    });
  }
};
const get_page = (tag) => {
  if (tag == "dashboard") {
    document.querySelector("#dashboard").classList.add("active");
    var t_bikes = document.getElementsByClassName("total_motorbikes")[0];
    var d_bikes = document.getElementsByClassName("d_bikes")[0];
    var usrs = document.getElementsByClassName("usrs")[0];
    var brands = document.getElementsByClassName("brands")[0];
    var categories = document.getElementsByClassName("categories_board")[0];
    categories.innerHTML = "";
    var y = map1.get("categories");
    categories.innerHTML = y.length;
    brands.innerHTML = "";
    var x = map1.get("brand_list");
    brands.innerHTML = x.length;
    usrs.innerHTML = "";
    var u = map1.get("clients");
    usrs.innerHTML = u.length;
    t_bikes.innerHTML = "";
    var a = map1.get("bikes");
    t_bikes.innerHTML = a.length;
  } else if (tag == "Motorbikes") {
    document.querySelector("#Motorbikes").classList.add("active");
    var a = map1.get("bikes");
    var categories = map1.get("categories");
    var brand_list = map1.get("brand_list");
    var t = document.getElementsByClassName("todisplay")[0];
    function gdt(dt) {
      var dc = new Date(dt);
      var day = String(dc.getDate()).padStart(2, "0");
      var month = String(dc.getMonth() + 1).padStart(2, "0");
      var year = String(dc.getFullYear());
      var hours = String(dc.getHours());
      var minutes = String(dc.getMinutes());
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    }
    for (let loop = 0; loop < a.length; loop++) {
      var crtd = gdt(a[loop].date_created);
      var brnd = "N/A",
        type = "N/A";
      for (let b = 0; b < brand_list.length; b++) {
        console.log(brand_list[b].name);
        if (a[loop].brand_id == brand_list[b].id) {
          brnd = brand_list[b].name;
        }
      }
      for (let c = 0; c < categories.length; c++) {
        if (a[loop].category_id == categories[c].id) {
          type = categories[c].category;
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
            `;
    }
    var bike_search = document.querySelector(".bike_search");
    bike_search.addEventListener("keyup", (e) => {
      if (e.target.value == "") {
        t.innerHTML = "";
        for (let loop = 0; loop < a.length; loop++) {
          var crtd = gdt(a[loop].date_created);
          var brnd, type;
          for (let b = 0; b < brand_list.length; b++) {
            if (a[loop].brand_id == brand_list[b].id) {
              brnd = brand_list[b].name;
            }
          }

          for (let c = 0; c < categories.length; c++) {
            if (a[loop].category_id == categories[c].id) {
              type = categories[c].category;
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
                    `;
        }
      } else {
        t.innerHTML = "";
        var tosearch = [];
        var to_map = [...map1.entries()][0][1];
        for (let m = 0; m < to_map.length; m++) {
          var dc = new Date(to_map[m].date_created);
          var day = String(dc.getDate()).padStart(2, "0");
          var month = String(dc.getMonth() + 1).padStart(2, "0");
          var year = String(dc.getFullYear());
          var hours = String(dc.getHours());
          var minutes = String(dc.getMinutes());
          var bike_model = to_map[m].bike_model,
            brand,
            category,
            date_created = `${year}-${month}-${day} ${hours}:${minutes}`,
            id = to_map[m].id;
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
          tosearch.push({
            id: id,
            model: bike_model.toLowerCase(),
            type: category.toLowerCase(),
            brand: brand.toLowerCase(),
            date_created: date_created,
          });
        }
        var tg_val = String(e.target.value);
        let by_bike_model = tosearch
          .filter(function (tosearch) {
            var tsm = String(tosearch.model);
            return tsm.includes(tg_val.toLowerCase());
          })
          .map(function (tosearch) {
            return tosearch.id;
          });
        let by_category = tosearch
          .filter(function (tosearch) {
            var tsm = String(tosearch.type);
            return tsm.includes(tg_val.toLowerCase());
          })
          .map(function (tosearch) {
            return tosearch.id;
          });
        let by_brand = tosearch
          .filter(function (tosearch) {
            var tsm = String(tosearch.brand);
            return tsm.includes(tg_val.toLowerCase());
          })
          .map(function (tosearch) {
            return tosearch.id;
          });
        let by_date = tosearch
          .filter(function (tosearch) {
            var tsm = String(tosearch.date_created);
            return tsm.includes(tg_val.toLowerCase());
          })
          .map(function (tosearch) {
            return tosearch.id;
          });
        function removedoplicates(arr) {
          return arr.filter((el, index) => arr.indexOf(el) === index);
        }
        var combinedArray1 = by_bike_model.concat(by_category);
        var combinedArray2 = by_brand.concat(by_date);
        var combinedArray = combinedArray1.concat(combinedArray2);
        var combined = removedoplicates(combinedArray);
        for (let x = 0; x < combined.length; x++) {
          for (let loop = 0; loop < a.length; loop++) {
            if (combined[x] == a[loop].id) {
              var crtd = gdt(a[loop].date_created);
              var brnd, type;
              for (let b = 0; b < brand_list.length; b++) {
                if (a[loop].brand_id == brand_list[b].id) {
                  brnd = brand_list[b].name;
                }
              }
              for (let c = 0; c < categories.length; c++) {
                if (a[loop].category_id == categories[c].id) {
                  type = categories[c].category;
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
                            `;
            }
          }
        }
      }
    });
  } else if (tag == "bookinglist") {
    document.querySelector("#bookinglist").classList.add("active");
    filter_remove();
  } else if (tag == "bookingreports") {
    document.querySelector("#bookingreports").classList.add("active");
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var this_month = String(today.getMonth() + 1).padStart(2, "0");
    var past_month = String(today.getMonth() + 1).padStart(2, "0");
    var thisyyyy = today.getFullYear() - 1;
    var lastyyyy = today.getFullYear();
    var sstrt = document.getElementById("d_start");
    var eeend = document.getElementById("d_end");
    sstrt.value = `${thisyyyy}-${past_month}-${dd}`;
    $("#d_start").attr("max", `${lastyyyy}-${this_month}-${dd}`);
    eeend.value = `${lastyyyy}-${this_month}-${dd}`;
    $("#d_end").attr("min", `${thisyyyy}-${past_month}-${dd}`);
    $("#d_start").change((a) => {
      if (a.target.value) {
        var tocompare = document.getElementById("d_end");
        var this_date = new Date(a.target.value);
        var added1day = addDays(this_date, 2);
        var added_day = String(added1day.getDate()).padStart(2, "0");
        var this_m = String(added1day.getMonth() + 1).padStart(2, "0");
        var year = added1day.getFullYear();
        var d2move = `${year}-${this_m}-${added_day}`;
        if (d2move >= tocompare.value) {
          tocompare.value = d2move;
          tocompare.min = d2move;
        } else {
          $("#d_end").attr("min", d2move);
        }
      }
    });
    $("#d_end").change((a) => {
      if (a.target.value) {
        var tocompare = document.getElementById("d_start");
        var this_date = new Date(a.target.value);
        var deduct2day = deductDays(this_date, 2);
        var deducted_day = String(deduct2day.getDate()).padStart(2, "0");
        var this_m = String(deduct2day.getMonth() + 1).padStart(2, "0");
        var year = deduct2day.getFullYear();
        var d2move = `${year}-${this_m}-${deducted_day}`;
        $("#d_start").attr("max", d2move);
      }
    });
    $("#examp").DataTable({
      dom: "Bfrtip",
      bInfo: false,
      bPaginate: false,
      buttons: [],
      searching: false,
    });
  } else if (tag == "clients") {
    document.querySelector("#clients").classList.add("active");
    // saba-diha
    try {
      var clients = map1.get("clients");
      var table = document.getElementsByClassName("clients_list")[0];
      for (let c = 0; c < clients.length; c++) {
        var dc = new Date(clients[c].date_created),
          d_up = new Date(clients[c].date_updated),
          l_ln = new Date(clients[c].last_login),
          addr,
          gndr;
        if (clients[c].address == "") {
          addr = "N/A";
        } else {
          addr = clients[c].address;
        }

        if (clients[c].gender == "") {
          gndr = "N/A";
        } else {
          gndr = clients[c].gender;
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
                        <button onclick='analizer("/admin/clients/${
                          clients[c].id
                        }")' type="button" class="btn btn-link text-info ms-auto border-0" title="edit"><i class="material-icons position-relative ms-auto text-lg me-1 my-auto">edit</i></button>
                        <a onclick="del_cl(this)" d_id="${
                          clients[c].id
                        }" class="btn btn-link text-danger ms-auto border-0" title="delete">
                            <i class="material-icons position-relative ms-auto text-lg me-1 my-auto">delete</i>
                        </a>
                    </td>
                </tr>
                </center>
                `;
      }

      $("#example3").DataTable({
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
    } catch {
      //abcd
      var conf = window.location.pathname;

      var url = conf.toLowerCase();
      var res = url.split("/");
      var pos = res.indexOf("clients");
      var result = res[pos + 1];
      var x = map1.get("clients");
      var info = [];
      for (let cl = 0; cl < x.length; cl++) {
        if (x[cl].id == result) {
          info.push(x[cl]);
        }
      }
      console.log(info);
      function today(td) {
        var this_date = new Date(td);
        var day = String(this_date.getDate()).padStart(2, "0");
        var m = String(this_date.getMonth() + 1).padStart(2, "0");
        var year = this_date.getFullYear();
        return `${year}-${m}-${day}`;
      }
      var add, gnd;
      if (info[0].address == "") {
        add = "N/A";
      } else {
        add = info[0].address;
      }

      if (info[0].gender == "") {
        gnd = "N/A";
      } else {
        gnd = info[0].gender;
      }

      var display_f_name =
        document.getElementsByClassName("display_full_name")[0];
      var display_type = document.getElementsByClassName("display_type")[0];
      display_f_name.innerHTML = `${info[0].firstname} ${info[0].lastname}`;
      document.querySelector(".cl_avatar").setAttribute("src", info[0].avatar);
      document.querySelector(".cp").setAttribute("d_id", info[0].id);
      display_type.innerHTML = "client";
      document.getElementById("display_id").placeholder = `${info[0].id}`;
      document.getElementById("f_name").placeholder = `${info[0].firstname}`;
      document.getElementById("l_name").placeholder = `${info[0].lastname}`;
      document.getElementById("u_name").placeholder = `${info[0].email}`;
      document.getElementById("last_login").placeholder = `${today(
        info[0].last_login
      )}`;
      document.getElementById("date_added").placeholder = `${today(
        info[0].date_created
      )}`;
      document.getElementById("date_updated").placeholder = `${today(
        info[0].date_updated
      )}`;
      document.querySelector(".cl_inf").setAttribute("data_id", result);
      document.querySelector(".updid").setAttribute("data_id", result);
      document.getElementById("address").placeholder = `${add}`;
      document.querySelector(".bct7").setAttribute("data", gnd);
      document.querySelector(".bct7").innerHTML = gnd;
      document.getElementById("contact").placeholder = `${info[0].contact}`;
    }
  } else if (tag == "brandlist") {
    document.querySelector("#brandlist").classList.add("active");
    var brands = map1.get("brand_list");
    var table = document.getElementsByClassName("brand_list")[0];
    for (let b = 0; b < brands.length; b++) {
      var stats,
        dc = new Date(brands[b].date_created),
        dp = new Date(brands[b].date_updated);
      if (brands[b].status == "0") {
        stats = "inactive";
      } else if (brands[b].status == "1") {
        stats = "active";
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
                    <button d_id="${
                      brands[b].id
                    }" onclick="edit_br(this)" type="button" class="btn btn-link text-info ms-auto border-0" title="edit" data-bs-toggle="modal" data-bs-target="#edt_m"><i class="material-icons position-relative ms-auto text-lg me-1 my-auto">edit</i></button>
                    <a onclick="del_br(this)" d_id="${
                      brands[b].id
                    }" class="btn btn-link text-danger ms-auto border-0" title="delete">
                        <i class="material-icons position-relative ms-auto text-lg me-1 my-auto">delete</i>
                    </a>
                </td>
            </tr>
            </center>
            `;
    }
    $("#example").DataTable({
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
  } else if (tag == "categorylist") {
    document.querySelector("#categorylist").classList.add("active");
    var categories = map1.get("categories");
    var table = document.getElementsByClassName("category_list")[0];
    for (let c = 0; c < categories.length; c++) {
      var stats,
        dc = new Date(categories[c].date_created),
        dp = new Date(categories[c].date_updated);
      if (categories[c].status == "0") {
        stats = "inactive";
      } else if (categories[c].status == "1") {
        stats = "active";
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
                    <button d_id="${
                      categories[c].id
                    }" onclick="edit_cat(this)" type="button" class="btn btn-link text-info ms-auto border-0" title="edit" data-bs-toggle="modal" data-bs-target="#edt_cat"><i class="material-icons position-relative ms-auto text-lg me-1 my-auto">edit</i></button>
                    <a onclick="remove_cat(this)" d_id="${
                      categories[c].id
                    }" class="btn btn-link text-danger ms-auto border-0" title="delete">
                        <i class="material-icons position-relative ms-auto text-lg me-1 my-auto">delete</i>
                    </a>
                </td>
            </tr>
            </center>
            `;
    }
    $("#example2").DataTable({
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
  } else if (tag == "profile") {
    var x = map1.get("user");
    var display_f_name =
      document.getElementsByClassName("display_full_name")[0];
    var display_type = document.getElementsByClassName("display_type")[0];
    document.querySelector(".my-profile").setAttribute("src", x[0].avatar);
    display_f_name.innerHTML = `${x[0].firstname} ${x[0].lastname}`;
    var tp;
    if ((x[0].type = 1)) {
      tp = "admin";
    } else {
      tp = "client";
    }
    function today(td) {
      var this_date = new Date(td);
      var day = String(this_date.getDate()).padStart(2, "0");
      var m = String(this_date.getMonth() + 1).padStart(2, "0");
      var year = this_date.getFullYear();
      return `${year}-${m}-${day}`;
    }
    display_type.innerHTML = tp;
    document.getElementById("display_id").placeholder = `${x[0].id}`;
    document.getElementById("f_name").placeholder = `${x[0].firstname}`;
    document.getElementById("l_name").placeholder = `${x[0].lastname}`;
    document.getElementById("u_name").placeholder = `${x[0].username}`;
    document.getElementById("last_login").placeholder = `${today(
      x[0].last_login
    )}`;
    document.getElementById("date_added").placeholder = `${today(
      x[0].date_added
    )}`;
    document.getElementById("date_updated").placeholder = `${today(
      x[0].date_updated
    )}`;
  } else if (tag == "Add Motorbike") {
    $("#onkp").keypress(function (e) {
      if (this.value.length == 0 && e.which == 48) {
        return false;
      }
      if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        return false;
      }
    });
    var x = map1.get("categories");
    var x2 = map1.get("brand_list");
    var target = document.getElementsByClassName("bct")[0];
    var target2 = document.getElementsByClassName("bct2")[0];
    var target3 = document.getElementsByClassName("bct3")[0];
    target3.setAttribute("data_id", 1);
    target.innerHTML = x[0].category;
    target.setAttribute("data_id", x[0].id);
    target2.innerHTML = x2[0].name;
    target2.setAttribute("data_id", x2[0].id);
    var tb_bt = document.getElementsByClassName("bt")[0];
    var tb_bt2 = document.getElementsByClassName("bt2")[0];

    for (var l = 0; l < x.length; l++) {
      tb_bt.innerHTML += `<li><a class="dropdown-item border-radius-md" href="javascript:;" data_id="${x[l].id}" onclick="bcat(this)">${x[l].category}</a></li>`;
    }
    for (var l = 0; l < x.length; l++) {
      tb_bt2.innerHTML += `<li><a class="dropdown-item border-radius-md" href="javascript:;" data_id="${x2[l].id}" onclick="bcat2(this)">${x2[l].name}</a></li>`;
    }
  } else {
    console.log("else");
  }
};
const rep = (ne) => {
  const l_slice = ne.slice(-1);
  if (l_slice === "/") {
    let url = ne;
    url = url.slice(0, -1);
    return url;
  } else {
    return ne;
  }
};
const page_handler = async (url) => {
  var sub_url = url.toLowerCase();
  activetag_remove();
  var curent_url = rep(sub_url);
  const entry = admin_template_data.get(curent_url);
  var res = url.split("/");
  var pos = res.indexOf("clients");
  var result = res[pos + 1];
  var onlyContainsNumbers = (str) => /^\d+$/.test(str);

  const pagnination_mode = () => {
    var clients = map1.get('clients')
    var id
    for (let client of clients) {
      if (client.id == result) {
        id = client.id
      }
    }
    const pagnination_start = () => {
        var tittle = `${page_tittle_main} | ADMIN | CLIENT | ${id}`;
        document.title = tittle;
        history.pushState(
          null,
          tittle,
          location.protocol + "//" + location.host + curent_url + location.hash
        );
        document.querySelector(".bdy").innerHTML = layout.get('client_profile');
        get_page("clients");
    };
    onlyContainsNumbers(id)? pagnination_start(): document.querySelector(".bdy").innerHTML = `<h1>CLIENT NOT FOUND</h1>`;
  }
  const norm_mode = () => {
    try {
      document.title = entry.tittle;
      history.pushState(null,entry.tittle,location.protocol + "//" + location.host + curent_url + location.hash);
      document.querySelector(".bdy").innerHTML = entry.content;
      get_page(entry.tag);
    } catch {
      document.querySelector(".bdy").innerHTML = `<h1>PAGE NOT FOUND</h1>`;
    }
  };

  onlyContainsNumbers(result) ? pagnination_mode() : norm_mode();
};
const activetag_remove = () => {
  var a = document.getElementsByClassName("a");
  for (let i = 0; i < a.length; i++) {
    a[i].classList.remove("active");
  }
};
const analizer = async (url) => {
  loader_animation()
  await start().then(() => {
    (async () => {
      await $.ajax({
        url: "/query/active_user",
        method: "POST",
        dataType: "JSON",
        success: function (data) {
          if (data.status == 202) {
            (async () => {
              await data_initializer().then(() => {
                var layer = document.querySelector(".layer");
                layer.innerHTML = "";
                layer.innerHTML = layout.get("layer-index");
                page_handler(url);
              });
            })();
          } else {
            var locate = `/${root_name}/sign-in`;
            var layer = document.querySelector(".layer");
            layer.innerHTML = ""
            const entry = admin_template_data.get(rep(locate));
            document.title = entry.tittle;
            history.pushState(null, entry.tittle, rep(locate));
            layer.innerHTML += entry.layer;
          }
        },
        error: function (request, error) {
          console.log(error);
        },
      });
    })();
  });
};
function val_nb() {
  var err = false;
  var bike_category = document.getElementsByClassName("bct")[0].getAttribute("data_id");
  var brand_category = document.getElementsByClassName("bct2")[0].getAttribute("data_id");
  var status = document.getElementsByClassName("bct3")[0].getAttribute("data_id");
  var daily_rate = document.getElementById("onkp").value;
  var model = document.getElementById("mdl").value;
  var discription = document.getElementById("disc").value;
  var err2 = document.getElementsByClassName("lb2")[0];
    var err3 = document.getElementsByClassName("lb3")[0];
  // are nko
  err2.innerHTML = "";
  err3.innerHTML = "";

  // are sa b
  if (daily_rate == "") {
    err = true;
    err2.innerHTML = "Please input daily rate";
  }
  if (model == "") {
    err = true;
    err3.innerHTML = "Please input model";
  }
  // galery: mult_img.files[0]
  if (!err) {
    can();
    Swal.fire({
      title: "Please Wait !",
      html: '<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>',
      allowOutsideClick: false,
      showConfirmButton: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
    var singel = document.querySelector(".sing-img");
    var mult_img = document.querySelector(".mult-img");
    var data = new FormData();
    for (let loop = 0; loop < mult_img.files.length; loop++) {
      data.append("Galeries", mult_img.files[loop]);
    }
    data.append("Default", singel.files[0]);
    data.append("bike_category", bike_category);
    data.append("brand_category", brand_category);
    data.append("status", status);
    data.append("daily_rate", daily_rate);
    data.append("model", model);
    data.append("discription", discription);
    fetch("/query/addbike", {
      method: "POST",
      body: data,
    })
      .then((res) => {
        analizer("/admin/motorbikes/add");
        Swal.close();
      })
      .catch((rs) => {
        recan();
        Swal.fire("Failed to upload profile");
        // and here
        singel.value = "";
      });
  }
}

function edt_b(ths) {
  var t_id = ths.getAttribute("d_id");
  $("#onkp").keypress(function (e) {
    if (this.value.length == 0 && e.which == 48) {
      return false;
    }
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
      return false;
    }
  });
  can();

  var x = map1.get("categories");
  var x2 = map1.get("brand_list");
  var x4 = map1.get("bikes");

  var target = document.getElementsByClassName("bct")[0];
  var target2 = document.getElementsByClassName("bct2")[0];
  var target3 = document.getElementsByClassName("bct3")[0];

  var cat;
  var br;
  var tf;
  for (let l = 0; l < x.length; l++) {
    if (x[l].id == x4[t_id].category_id) {
      cat = x[l].category;
    }
  }
  for (let l = 0; l < x2.length; l++) {
    if (x2[l].id == x4[t_id].brand_id) {
      br = x2[l].name;
    }
  }
  if (br == undefined) {
    br = "N/A";
  }
  if (cat == undefined) {
    cat = "N/A";
  }
  if (x4[t_id].status) {
    tf = "Active";
  } else {
    tf = "InActive";
  }

  target.setAttribute("data_id", x4[t_id].category_id);
  target.innerHTML = cat;

  target2.setAttribute("data_id", x4[t_id].brand_id);
  target2.innerHTML = br;

  target3.setAttribute("data_id", x4[t_id].status);
  target3.innerHTML = tf;

  var tb_bt = document.getElementsByClassName("bt")[0];
  var tb_bt2 = document.getElementsByClassName("bt2")[0];
  console.log(x4[t_id]);

  var gal = document.querySelector(".galeries");
  gal.innerHTML = "";
  var bike_gallery = map1.get("bike_gallery");
  for (let loop = 0; loop < bike_gallery.length; loop++) {
    if (bike_gallery[loop].bike_id == x4[t_id].id) {
      gal.innerHTML += `
            <div class="col-lg-4 col-md-6 mt-5 mt-md-1 mb-4 remember${bike_gallery[loop].id}" style="margin-bottom: 7vh !important;">
                <div class="card" data-animation="true">
                    <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                        <a class="d-block blur-shadow-image">
                            <img src="${bike_gallery[loop].image}" class="img-fluid border-radius-lg" alt="Responsive image">
                        </a>
                        <div class="colored-shadow"
                            style="background-image: url(${bike_gallery[loop].image});">
                        </div>
                    </div>
                    <div class="card-body text-center">
                        <div class="mt-n6 mx-auto">
                            <a onclick="re_model(this)" d_id="${bike_gallery[loop].id}" tittle="SET AS DEFAULT" type="button" class="btn btn-link text-info ms-auto border-0" >
                                <i class="material-icons position-relative ms-auto text-lg me-1 my-auto">autorenew</i>
                            </a>
                            <a onclick="re_del(this)" d_id="${bike_gallery[loop].id}" tittle="REMOVE" class="btn btn-link text-danger ms-auto border-0">
                                <i class="material-icons position-relative ms-auto text-lg me-1 my-auto">delete</i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            `;
    }
  }
  // document.querySelector('.galeries').innerHTML

  document.querySelector(".disp").innerHTML = `
    <h5 class="modal-title thisbike" d_id="${x4[t_id].id}"  id="exampleModalLabel">BIKE #: ${x4[t_id].id}</h5>
    `;
  document.querySelector(".avt-1").src = x4[t_id].avatar;
  document.querySelector(".avt-2").src = x4[t_id].avatar;
  document.getElementById("onkp").placeholder = x4[t_id].daily_rate;
  document.getElementById("mdl").placeholder = x4[t_id].bike_model;
  document.getElementById("disc").placeholder = x4[t_id].description;
  var localdtctd = new Date(x4[t_id].date_created);
  var localdtupdt = new Date(x4[t_id].date_updated);
  document.getElementById("created").placeholder = localdtctd.toDateString();
  document.getElementById("updated").placeholder = localdtupdt.toDateString();

  var sbm = document.getElementById("sbm");
  sbm.setAttribute("onclick", "scsup(this)");
  sbm.setAttribute("mbk_id", x4[t_id].id);

  tb_bt.innerHTML = "";
  tb_bt2.innerHTML = "";
  for (var l = 0; l < x.length; l++) {
    tb_bt.innerHTML += `<li><a class="dropdown-item border-radius-md" href="javascript:;" data_id="${x[l].id}" onclick="bcat(this)">${x[l].category}</a></li>`;
  }
  for (var l = 0; l < x2.length; l++) {
    tb_bt2.innerHTML += `<li><a class="dropdown-item border-radius-md" href="javascript:;" data_id="${x2[l].id}" onclick="bcat2(this)">${x2[l].name}</a></li>`;
  }
}
async function scsup(ths) {
  can();
  var bk_id = ths.getAttribute("mbk_id");
  var bct = document.getElementsByClassName("bct")[0];
  var bct2 = document.getElementsByClassName("bct2")[0];
  var bct3 = document.getElementsByClassName("bct3")[0];
  var cat = bct.getAttribute("data_id");
  var brn = bct2.getAttribute("data_id");
  var trfl = bct3.getAttribute("data_id");
  var dsc = document.getElementById("disc");
  var dr = document.getElementById("onkp");
  var mdl = document.getElementById("mdl");
  var avatar = document.querySelector(".avt-1").src;
  var discription;
  var daily_rate;
  var model;
  {
    !dsc.value ? (discription = dsc.placeholder) : (discription = dsc.value);
  }
  {
    !dr.value ? (daily_rate = dr.placeholder) : (daily_rate = dr.value);
  }
  {
    !mdl.value ? (model = mdl.placeholder) : (model = mdl.value);
  }
  var mult_img = document.querySelector(".mult-gal");
  var data = new FormData();
  Swal.fire({
    title: "Please Wait !",
    html: '<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>',
    allowOutsideClick: false,
    showConfirmButton: false,
    onBeforeOpen: () => {
      Swal.showLoading();
    },
  });
  for (let loop = 0; loop < mult_img.files.length; loop++) {
    data.append("Galeries", mult_img.files[loop]);
  }
  console.log(removd);
  function ad_removed() {
    for (let loop = 0; loop < removd.length; loop++) {
      data.append("to_delate", removd[loop]);
    }
  }
  console.log(removd.length);
  removd ? ad_removed() : data.append("to_delate", undefined);
  data.append("id", bk_id);
  data.append("cat", cat);
  data.append("brn", brn);
  data.append("trfl", trfl);
  data.append("discription", discription);
  data.append("avatar", avatar);
  data.append("daily_rate", daily_rate);
  data.append("model", model);

  await fetch("/query/bike_update", {
    method: "POST",
    body: data,
  })
    .then((res) => {
      if (res.status == 202) {
        recan();
        analizer("/admin/motorbikes/");
        // Swal.fire({
        //   position: "top-end",
        //   icon: "success",
        //   title: "Bike UPDATED SUCCESSFULLY",
        //   showConfirmButton: false,
        //   timer: 1500,
        // });
      } else {
        analizer("/admin/motorbikes/");
        recan();
      }
    })
    .catch((rs) => {
      recan();
      Swal.fire("Failed to update Bike");
      mult_img.value = "";
    });
  removd = [];
}

function to_display_filtered_values(data, e_target) {
  var t = document.getElementsByClassName("booking_list")[0];
  function gdt(dt) {
    var dc = new Date(dt);
    var day = String(dc.getDate()).padStart(2, "0");
    var month = String(dc.getMonth() + 1).padStart(2, "0");
    var year = String(dc.getFullYear());
    return `${year}-${month}-${day}`;
  }
  var clients = map1.get("clients");
  t.innerHTML = "";
  var tosearch = [];
  var to_map = data;
  for (let m = 0; m < to_map.length; m++) {
    var book_id = to_map[m].id,
      client_name,
      date_booked = gdt(to_map[m].date_created),
      pick_up = gdt(to_map[m].date_start),
      returned = gdt(to_map[m].date_end),
      rend_days = to_map[m].rent_days,
      balance = to_map[m].balance;
    for (let c = 0; c < clients.length; c++) {
      if (clients[c].id == to_map[m].client_id) {
        client_name = `${clients[c].firstname} ${clients[c].lastname}`;
      }
    }
    tosearch.push({
      id: book_id,
      client_name: client_name.toLowerCase(),
      date_booked: date_booked,
      date_pickup: pick_up,
      date_return: returned,
      rent_days: rend_days,
      balance: balance,
    });
  }
  var tg_val = String(e_target);
  let by_id = tosearch
    .filter(function (tosearch) {
      var tsm = String(tosearch.id);
      return tsm.includes(tg_val.toLowerCase());
    })
    .map(function (tosearch) {
      return tosearch.id;
    });
  let by_name = tosearch
    .filter(function (tosearch) {
      var tsm = String(tosearch.client_name);
      return tsm.includes(tg_val.toLowerCase());
    })
    .map(function (tosearch) {
      return tosearch.id;
    });
  let by_date_booked = tosearch
    .filter(function (tosearch) {
      var tsm = String(tosearch.date_booked);
      return tsm.includes(tg_val.toLowerCase());
    })
    .map(function (tosearch) {
      return tosearch.id;
    });
  let by_date_puckup = tosearch
    .filter(function (tosearch) {
      var tsm = String(tosearch.date_pickup);
      return tsm.includes(tg_val.toLowerCase());
    })
    .map(function (tosearch) {
      return tosearch.id;
    });
  let by_date_return = tosearch
    .filter(function (tosearch) {
      var tsm = String(tosearch.date_return);
      return tsm.includes(tg_val.toLowerCase());
    })
    .map(function (tosearch) {
      return tosearch.id;
    });
  let by_rent_days = tosearch
    .filter(function (tosearch) {
      var tsm = String(tosearch.rent_days);
      return tsm.includes(tg_val.toLowerCase());
    })
    .map(function (tosearch) {
      return tosearch.id;
    });
  let by_balance = tosearch
    .filter(function (tosearch) {
      var tsm = String(tosearch.balance);
      return tsm.includes(tg_val.toLowerCase());
    })
    .map(function (tosearch) {
      return tosearch.id;
    });
  function removedoplicates(arr) {
    return arr.filter((el, index) => arr.indexOf(el) === index);
  }
  var combined = [];
  var combination = [
    by_id,
    by_name,
    by_date_booked,
    by_date_puckup,
    by_date_return,
    by_rent_days,
    by_balance,
  ];

  for (let comb = 0; comb < combination.length; comb++) {
    combined = combined.concat(combination[comb]);
  }
  var to_display = [];
  var combined_clear = removedoplicates(combined);
  if (combined_clear.length == 0) {
    t.innerHTML = "";
  } else {
    for (let td = 0; td < combined_clear.length; td++) {
      for (let m = 0; m < to_map.length; m++) {
        if (combined_clear[td] == to_map[m].id) {
          to_display.push(to_map[m]);
        }
      }
    }
    rl_lop(to_display);
  }
}
function fire(ths) {
  can();
  var d_id = ths.getAttribute("d_id");
  var client_name = [],
    bike_id = [],
    status,
    i_info = [];
  var clients = map1.get("clients");
  var rent_list = map1.get("rent_list");
  var bikes = map1.get("bikes");

  for (let rl = 0; rl < rent_list.length; rl++) {
    if (rent_list[rl].id == d_id) {
      i_info.push(rent_list[rl]);
    }
  }
  for (let nm = 0; nm < clients.length; nm++) {
    if (clients[nm].id == i_info[0].client_id) {
      client_name.push(clients[nm]);
    }
  }
  for (let b = 0; b < bikes.length; b++) {
    if (bikes[b].id == i_info[0].bike_id) {
      bike_id.push(bikes[b]);
    }
  }
  if (i_info[0].status == "0") {
    status = "PENDING";
  }
  if (i_info[0].status == "1") {
    status = "CONFIRMED";
  }
  if (i_info[0].status == "2") {
    status = "CANCELLED";
  }
  if (i_info[0].status == "3") {
    status = "PICKED-UP";
  }
  if (i_info[0].status == "4") {
    status = "RETURNED";
  }
  function gdt(dt) {
    var dc = new Date(dt);
    var day = String(dc.getDate()).padStart(2, "0");
    var month = String(dc.getMonth() + 1).padStart(2, "0");
    var year = String(dc.getFullYear());
    return `${year}-${month}-${day}`;
  }

  document.querySelector("#id_tab").value = i_info[0].id;
  var s_name = document.getElementById("link3");
  var b_name = document.querySelector("#link2");
  var balance = document.querySelector("#balance");
  var c_name = document.querySelector("#nme");
  var a1 = document.querySelector("#a1");
  var a2 = document.querySelector("#a2");
  var d_start = document.querySelector("#d_start");
  var d_ends = document.querySelector("#d_ends");
  var d_booked = document.querySelector("#d_booked");
  var d_update = document.querySelector("#d_update");
  var r_d = document.querySelector("#r_d");
  var date1 = new Date(gdt(i_info[0].date_start));
  var date2 = new Date(gdt(i_info[0].date_end));
  var Difference_In_Time = date2.getTime() - date1.getTime();
  var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

  a1.placeholder = i_info[0].amount_received;
  a2.placeholder = i_info[0].amount_topay;
  a1.value = i_info[0].amount_received;
  a2.value = i_info[0].amount_topay;
  r_d.value = Difference_In_Days;
  d_start.value = gdt(i_info[0].date_start);
  d_ends.value = gdt(i_info[0].date_end);
  d_booked.value = gdt(i_info[0].date_created);
  d_update.value = gdt(i_info[0].date_updated);
  c_name.setAttribute("d_id", client_name[0].id);
  s_name.setAttribute("d_id", i_info[0].status);
  b_name.setAttribute("d_id", bike_id[0].id);
  balance.value = a2.value - a1.value;
  c_name.value = `${client_name[0].firstname} ${client_name[0].lastname}`;
  s_name.innerHTML = `${status}`;
  b_name.placeholder = `${bike_id[0].bike_model}`;

  $("#a1").keypress(function (e) {
    if (this.value.length == 0 && e.which == 48) {
      return false;
    }
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
      return false;
    }
  });

  a1.addEventListener("keyup", (e) => {
    if (e.target.value == "") {
      balance.value = a2.value - a1.value;
    } else {
      balance.value = a2.value - a1.value;
    }
  });

  a2.addEventListener("keyup", (e) => {
    if (e.target.value == "") {
      balance.value = a2.value - a1.value;
    } else {
      balance.value = a2.value - a1.value;
    }
  });
  $("#a2").keypress(function (e) {
    if (this.value.length == 0 && e.which == 48) {
      return false;
    }
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
      return false;
    }
  });
}
function toset(ths, target) {
  var tg = document.getElementById(target);
  var d_id = ths.getAttribute("d_id");
  tg.setAttribute("d_id", d_id);
  tg.innerHTML = ths.innerHTML;
}
function rl_lop(data) {
  function gdt(dt) {
    var dc = new Date(dt);
    var day = String(dc.getDate()).padStart(2, "0");
    var month = String(dc.getMonth() + 1).padStart(2, "0");
    var year = String(dc.getFullYear());
    return `${year}-${month}-${day}`;
  }
  var clients = map1.get("clients");
  var t = document.getElementsByClassName("booking_list")[0];
  t.innerHTML = "";

  for (let loop = 0; loop < data.length; loop++) {
    var client,
      avatar,
      date_booked = gdt(data[loop].date_created),
      date_pick_up = gdt(data[loop].date_start),
      date_return = gdt(data[loop].date_end),
      status;
    for (let u = 0; u < clients.length; u++) {
      if (data[loop].client_id == clients[u].id) {
        client = `${clients[u].firstname} ${clients[u].lastname}`;
        avatar = clients[u].avatar;
      }
    }
    console.log(avatar);
    if (data[loop].status == "0") {
      status = `
                <button disabled class="btn btn-icon-only btn-rounded btn-outline-warning mb-0 me-2 btn-sm d-flex align-items-center justify-content-center">
                    <i class="material-icons text-sm" aria-hidden="true">more_horiz</i>
                </button>
            `;
    }
    if (data[loop].status == "1") {
      status = `
                <button disabled class="btn btn-icon-only btn-rounded btn-outline-info mb-0 me-2 btn-sm d-flex align-items-center justify-content-center">
                    <i class="material-icons text-sm" aria-hidden="true">check</i>
                </button>
            `;
    }
    if (data[loop].status == "2") {
      status = `
                <button disabled class="btn btn-icon-only btn-rounded btn-outline-danger mb-0 me-2 btn-sm d-flex align-items-center justify-content-center">
                    <i class="material-icons text-sm" aria-hidden="true">clear</i>
                </button>
            `;
    }
    if (data[loop].status == "3") {
      status = `
                <button disabled class="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center">
                    <i class="material-icons text-sm" aria-hidden="true">graphic_eq</i>
                </button>
            `;
    }
    if (data[loop].status == "4") {
      status = `
                <button disabled class="btn btn-icon-only btn-rounded btn-outline-secondary mb-0 me-2 btn-sm d-flex align-items-center justify-content-center">
                    <i class="material-icons text-sm" aria-hidden="true">keyboard_return</i>
                </button>
            `;
    }
    t.innerHTML += `
        <tr>
            <td>
                <div class="d-flex align-items-center">
                    <p class="text-xs font-weight-normal ms-2 mb-0">${data[loop].id}
                    </p>
                </div>
            </td>
            <td class="text-xs font-weight-normal">
                <div class="d-flex align-items-center">
                    <img src="${avatar}" class="avatar avatar-xs me-2" alt="user image">
                    <span>${client}</span>
                </div>
            </td>
            <td class="font-weight-normal">
                <span class="my-2 text-xs">${date_booked}</span>
            </td>
            <td class="text-xs font-weight-normal">${date_pick_up}</td>
            <td class="text-xs font-weight-normal">
                <span class="my-2 text-xs">${date_return}</span>
            </td>
            <td class="text-xs font-weight-normal">
                <span class="my-2 text-xs">${data[loop].rent_days}</span>
            </td>
            <td class="text-xs font-weight-normal">
                <span class="my-2 text-xs">${data[loop].balance}</span>
            </td>
            <td class="text-xs font-weight-normal">
            ${status}
            </td>
            <td class="text-sm">
                <a d_id="${data[loop].id}" href="javascript:;" onclick="(fire(this))" data-bs-toggle="modal" data-bs-target="#blst">
                    <i class="material-icons text-secondary position-relative text-lg"
                        style="color: skyblue !important;">
                        edit
                    </i>
                </a>
                <a href="javascript:;" data-bs-toggle="tooltip"
                    data-bs-original-title="Delete product">
                    <i data="${data[loop].id}" onclick="dell_booklist(this)"
                        class="material-icons text-secondary position-relative text-lg"
                        style="color: red !important;">
                        delete
                    </i>
                </a>
            </td>
        </tr>
        `;
  }
}
function upd_bl() {
  var id = document.querySelector("#id_tab");
  var status_id = document.querySelector("#link3");
  var receaved = document.querySelector("#a1");
  var topay = document.querySelector("#a2");
  var balance = document.querySelector("#balance");
  var r_d = document.querySelector("#r_d");
  var status = status_id.getAttribute("d_id");
  $.ajax({
    url: "/query/booking_update",
    method: "POST",
    data: {
      id: id.value,
      status: status,
      receaved: receaved.value,
      topay: topay.value,
      balance: balance.value,
      r_d: r_d.value,
    },
    
    dataType: "JSON",
    success: function (data) {
      if (data.status == 202) {
        if (data.status == 202) {
          analizer("/admin/bookinglist");
        }
      }
    },
    error: function (request, error) {
      alert(error);
    },
  });
}

function to_proccess(val) {
  var booking_search = document.querySelector(".booking_search");
  booking_search.addEventListener("keyup", (e) => {
    var t = document.getElementsByClassName("booking_list")[0];
    if (e.target.value == "") {
      rl_lop(val);
    } else {
      to_display_filtered_values(val, e.target.value);
    }
  });
}
function filter_remove() {
  filtered = 5;
  rl_lop(map1.get("rent_list"));
  to_proccess(map1.get("rent_list"));
}
function re_model(e) {
  var bike_gallery = map1.get("bike_gallery");
  var id = e.getAttribute("d_id");
  for (let loop = 0; loop < bike_gallery.length; loop++) {
    if (id == bike_gallery[loop].id) {
      document.querySelector(".avt-1").src = bike_gallery[loop].image;
      document.querySelector(".avt-2").src = bike_gallery[loop].image;
    }
  }
}
function cancup() {
  removd = [];
  document.getElementById("onkp").value = "";
  document.getElementById("mdl").value = "";
  document.getElementById("disc").value = "";
  recan();
}
function cancup1() {
  recan();
}
function cancup2() {
  document.querySelector(".bn").value = "";
  recan();
}
function cancup3() {
  document.querySelector(".bnme").value = "";
  recan();
}
function cancup4() {
  document.querySelector(".cat_name").value = "";
  document.querySelector(".cat_disc").value = "";
  recan();
}
function cancup5() {
  document.querySelector(".cnme").value = "";
  document.getElementById("cat_disc").value = "";
  recan();
}
function cancupx() {
  document.querySelector(".input-prof").value = "";
  recan();
}
function bcat(ths) {
    var target = document.getElementsByClassName('bct')[0];
    var vr = ths.getAttribute('data_id');
    target.innerHTML = "";
    target.innerHTML = ths.innerHTML;
    target.setAttribute('data_id', vr)
    console.log(ths.innerHTML);
}
function bcat2(ths) {
    var target = document.getElementsByClassName('bct2')[0];
    var vr = ths.getAttribute('data_id');
    target.innerHTML = "";
    target.innerHTML = ths.innerHTML;
    target.setAttribute('data_id', vr)
    console.log(ths.innerHTML);
}
function bcat3(ths) {
    var target = document.getElementsByClassName('bct3')[0];
    var vr = ths.getAttribute('data_id');
    target.innerHTML = "";
    target.innerHTML = ths.innerHTML;
    target.setAttribute('data_id', vr)
}
function bcat4(ths) {
    var target = document.getElementsByClassName('bct4')[0];
    var vr = ths.getAttribute('data_id');
    target.innerHTML = "";
    target.innerHTML = ths.innerHTML;
    target.setAttribute('data_id', vr)
}
function bcat5(ths) {
    var target = document.getElementsByClassName('bct5')[0];
    var vr = ths.getAttribute('data_id');
    target.innerHTML = "";
    target.innerHTML = ths.innerHTML;
    target.setAttribute('data_id', vr);
}
function bcat6(ths) {
    var target = document.getElementsByClassName('bct6')[0];
    var vr = ths.getAttribute('data_id');
    target.innerHTML = "";
    target.innerHTML = ths.innerHTML;
    target.setAttribute('data_id', vr);
}
function bcat7(ths) {
    var target = document.getElementsByClassName('bct7')[0];
    var vr = ths.getAttribute('data');
    target.innerHTML = "";
    target.innerHTML = ths.innerHTML;
    target.setAttribute('data', vr);
}
function can() {
  var bot1 = document.getElementById("dashboard");
  bot1.style.pointerEvents = "none";
  bot1.style.cursor = "none";
  var bot2 = document.getElementById("Motorbikes");
  bot2.style.pointerEvents = "none";
  bot2.style.cursor = "none";
  var bot3 = document.getElementById("bookinglist");
  bot3.style.pointerEvents = "none";
  bot3.style.cursor = "none";
  var bot4 = document.getElementById("bookingreports");
  bot4.style.pointerEvents = "none";
  bot4.style.cursor = "none";
  var bot5 = document.getElementById("brandlist");
  bot5.style.pointerEvents = "none";
  bot5.style.cursor = "none";
  var bot6 = document.getElementById("categorylist");
  bot6.style.pointerEvents = "none";
  bot6.style.cursor = "none";
  var bot7 = document.getElementById("clients");
  bot7.style.pointerEvents = "none";
  bot7.style.cursor = "none";
}
function recan() {
  var bot1 = document.getElementById("dashboard");
  bot1.style = "";
  var bot2 = document.getElementById("Motorbikes");
  bot2.style = "";
  var bot3 = document.getElementById("bookinglist");
  bot3.style = "";
  var bot4 = document.getElementById("bookingreports");
  bot4.style = "";
  var bot5 = document.getElementById("brandlist");
  bot5.style = "";
  var bot6 = document.getElementById("categorylist");
  bot6.style = "";
  var bot7 = document.getElementById("clients");
  bot7.style = "";
}
function del_b(ths) {
  var id = ths.getAttribute("d_id");
  $.ajax({
    url: "/query/dell_bike",
    method: "POST",
    data: { id: id },
    dataType: "JSON",
    success: function (data) {
      if (data.status == 202) {
        analizer("/admin/motorbikes/");
      }
    },
    error: function (request, error) {
      alert(error);
    },
  });
}
function re_del(e) {
  var thisbike = document.querySelector(".thisbike").getAttribute("d_id");
  var id = e.getAttribute("d_id");
  var l = [id];
  removd.push(l);
  var x4 = map1.get("bikes");
  var bike_gallery = map1.get("bike_gallery");
  var avtr;
  for (let loop = 0; loop < x4.length; loop++) {
    if (thisbike == x4[loop].id) {
      avtr = x4[loop].avatar;
    }
  }
  console.log(x4);
  var av = document.querySelector(".avt-1").src;
  for (let loop = 0; loop < bike_gallery.length; loop++) {
    if (av == bike_gallery[loop].image) {
      document.querySelector(".avt-1").src = avtr;
      document.querySelector(".avt-2").src = avtr;
    }
  }
  document.querySelector(`.remember${id}`).innerHTML = "";
}
function dell_booklist(ths) {
  var id = ths.getAttribute("data");
  $.ajax({
    url: "/query/dell_booklist",
    method: "POST",
    data: { id: id },
    dataType: "JSON",
    success: function (data) {},
    error: function (request, error) {
      alert(error);
    },
  });
  v2 = "example";
  if (filtered == 0) {
    analizer(window.location.pathname)
    filter_pending();
  } else if (filtered == 1) {
    analizer(window.location.pathname);
    filter_confirmed();
  } else if (filtered == 2) {
    analizer(window.location.pathname);
    filter_canceled();
  } else if (filtered == 3) {
    analizer(window.location.pathname);
    filter_pickedup();
  } else if (filtered == 4) {
    analizer(window.location.pathname);
    filter_returned();
  } else if (filtered == 5) {
    analizer(window.location.pathname);
    filter_remove();
  } else {
    analizer(window.location.pathname);
  }
}
function filter_remove() {
  filtered = 5;
  rl_lop(map1.get("rent_list"));
  to_proccess(map1.get("rent_list"));
}
function filter_pending() {
  filtered = 0;
  var default_val = [];
  var rent_list = map1.get("rent_list");
  var t = document.getElementsByClassName("booking_list")[0];
  for (let loop = 0; loop < rent_list.length; loop++) {
    if (rent_list[loop].status == "0") {
      default_val.push(rent_list[loop]);
    }
  }
  if (default_val.length == 0) {
    t.innerHTML = "";
  } else {
    rl_lop(default_val);
    to_proccess(default_val);
  }
}
function filter_confirmed() {
  filtered = 1;
  var default_val = [];
  var rent_list = map1.get("rent_list");
  var t = document.getElementsByClassName("booking_list")[0];
  for (let loop = 0; loop < rent_list.length; loop++) {
    if (rent_list[loop].status == "1") {
      default_val.push(rent_list[loop]);
    }
  }
  if (default_val.length == 0) {
    t.innerHTML = "";
  } else {
    rl_lop(default_val);
    to_proccess(default_val);
  }
}
function filter_canceled() {
  filtered = 2;
  var default_val = [];
  var rent_list = map1.get("rent_list");
  var t = document.getElementsByClassName("booking_list")[0];
  for (let loop = 0; loop < rent_list.length; loop++) {
    if (rent_list[loop].status == "2") {
      default_val.push(rent_list[loop]);
    }
  }
  if (default_val.length == 0) {
    t.innerHTML = "";
  } else {
    rl_lop(default_val);
    to_proccess(default_val);
  }
}
function filter_pickedup() {
  filtered = 3;
  var default_val = [];
  var rent_list = map1.get("rent_list");
  var t = document.getElementsByClassName("booking_list")[0];
  for (let loop = 0; loop < rent_list.length; loop++) {
    if (rent_list[loop].status == "3") {
      default_val.push(rent_list[loop]);
    }
  }
  if (default_val.length == 0) {
    t.innerHTML = "";
  } else {
    rl_lop(default_val);
    to_proccess(default_val);
  }
}
function filter_returned() {
  filtered = 4;
  var default_val = [];
  var rent_list = map1.get("rent_list");
  var t = document.getElementsByClassName("booking_list")[0];
  for (let loop = 0; loop < rent_list.length; loop++) {
    if (rent_list[loop].status == "4") {
      default_val.push(rent_list[loop]);
    }
  }
  if (default_val.length == 0) {
    t.innerHTML = "";
  } else {
    rl_lop(default_val);
    to_proccess(default_val);
  }
}
function filter_dates() {
  var date_start = document.getElementById("d_start").value;
  var date_end = document.getElementById("d_end").value;
  var t = document.getElementsByClassName("report_filter")[0];
  t.innerHTML = "";
  var rent_list = map1.get("rent_list");
  var u = map1.get("clients");
  var b = map1.get("bikes");
  if (!date_start && date_end) {
    console.log("no start");
  }
  if (!date_end && date_start) {
    console.log("no end");
  }
  if (!date_end && !date_start) {
    console.log("empty all");
  }
  if (date_end && date_start) {
    var check = [];
    // sanaol
    function tc() {
      for (let loop = 0; loop < rent_list.length; loop++) {
        var created = new Date(`${rent_list[loop].date_created}`);
        var started = new Date(`${rent_list[loop].date_start}`);
        var end = new Date(`${rent_list[loop].date_end}`);
        var updated = new Date(`${rent_list[loop].date_updated}`);

        var fullname;
        var bike;

        for (let loop2 = 0; loop2 < u.length; loop2++) {
          if (u[loop2].id == rent_list[loop].client_id) {
            fullname = `${u[loop2].firstname} ${u[loop2].lastname}`;
          }
        }

        for (let loop3 = 0; loop3 < b.length; loop3++) {
          if (b[loop3].id == rent_list[loop].bike_id) {
            bike = b[loop3].bike_model;
          }
        }

        var stats = rent_list[loop].status;
        var newstats = "";
        if (stats == "0") {
          newstats = "Pending";
        } else if (stats == "1") {
          newstats = "Confirmed";
        } else if (stats == "2") {
          newstats = "Cancelled";
        } else if (stats == "3") {
          newstats = "Picked up";
        } else if (stats == "4") {
          newstats = "Returned";
        }

        var created_date = new Date(rent_list[loop].date_created);
        var day = String(created_date.getDate()).padStart(2, "0");
        var m = String(created_date.getMonth() + 1).padStart(2, "0");
        var year = created_date.getFullYear();
        var to_find = `${year}-${m}-${day}`;

        if (to_find >= date_start && to_find <= date_end) {
          check.push(rent_list[loop].id);
          t.innerHTML += `
                    <center>
                    <tr class="text-center">
                        <td>${rent_list[loop].id}</td>
                        <td>${fullname}</td>
                        <td>${bike}</td>
                        <td>${created.toLocaleDateString()}</td>
                        <td>${started.toLocaleDateString()}</td>
                        <td>${end.toLocaleDateString()}</td>
                        <td>${rent_list[loop].rent_days}</td>
                        <td>${rent_list[loop].amount_topay}</td>
                        <td>${rent_list[loop].amount_received}</td>
                        <td>${rent_list[loop].balance}</td>
                        <td>${newstats}</td>
                        <td>${updated.toLocaleDateString()}</td>
                    </tr>
                    </center>
                    `;
        }
      }
    }
    tc();
    if (check.length == 0) {
      $("#examp").DataTable().clear();
      $("#examp").DataTable().destroy();
      $("#examp").DataTable({
        dom: "Bfrtip",
        bInfo: false,
        bPaginate: false,
        buttons: [],
        searching: false,
      });
    } else {
      $("#examp").DataTable().clear();
      $("#examp").DataTable().destroy();
      tc();
      $("#examp").DataTable({
        dom: "Bfrtip",
        language: {
          searchPlaceholder: "Search",
          search: "",
        },
        bInfo: false,
        buttons: [
          {
            extend: "csv",
            className: "fred",
          },
          "excel",
          {
            extend: "pdfHtml5",
            orientation: "landscape",
            pageSize: "LEGAL",
          },
        ],
        columnDefs: [
          {
            searchable: false,
            targets: [-1],
            bSortable: false,
            aTargets: [-1, -2],
          },
        ],
      });
    }
  }
}
function edit_br(ths) {
  can();
  var brands = map1.get("brand_list");
  var th_id = ths.getAttribute("d_id");
  document.querySelector(".i").value = th_id;
  document.querySelector(".u").setAttribute("d_id", th_id);
  var stat_ac, stat_id, dc_db, du_db, nme;
  var bct4 = document.querySelector(".bct4");
  var d_creat = document.querySelector(".dc");
  var d_up = document.querySelector(".du");
  var bnme = document.querySelector(".bnme");
  function gdt(dt) {
    var dc = new Date(dt);
    var day = String(dc.getDate()).padStart(2, "0");
    var month = String(dc.getMonth() + 1).padStart(2, "0");
    var year = String(dc.getFullYear());
    return `${year}-${month}-${day}`;
  }
  for (let b = 0; b < brands.length; b++) {
    if (brands[b].id == th_id) {
      stat_id = brands[b].status;
      nme = brands[b].name;
      dc_db = gdt(brands[b].date_created);
      du_db = gdt(brands[b].date_updated);
    }
  }
  bnme.placeholder = nme;
  d_creat.value = dc_db;
  d_up.value = du_db;
  if (stat_id == "0") {
    stat_ac = "inactive";
  } else {
    stat_ac = "active";
  }
  bct4.setAttribute("data_id", stat_id);
  bct4.innerHTML = stat_ac;
}
function updt_b(ths) {
  var t_id = ths.getAttribute("d_id");
  var brands = map1.get("brand_list");
  var target1 = document.querySelector(".bct4");
  var target2 = document.querySelector(".bnme");
  var brand_name = target2.value;
  var brand_stats = target1.getAttribute("data_id");
  if (brand_name == "") {
    Swal.fire("Please input Brand name").then(() => {
      target2.value = "";
      var myModal = new bootstrap.Modal(document.getElementById("edt_m"));
      myModal.show();
    });
  } else {
    var bol = true;
    for (let b = 0; b < brands.length; b++) {
      var bd = brands[b].name.toLowerCase();
      var cat_f_db = bd.replace(/ /g, "");
      var bn = brand_name.toLowerCase();
      var cat_f_db2 = bn.replace(/ /g, "");
      if (cat_f_db == cat_f_db2 && brands[b].id != t_id) {
        bol = false;
        Swal.fire("Brand is already exist").then(() => {
          target2.value = "";
          var myModal = new bootstrap.Modal(document.getElementById("edt_m"));
          myModal.show();
        });
      }
    }
    if (bol) {
      target2.value = "";
      $.ajax({
        url: "/query/updatebrnd",
        method: "POST",
        data: { b_id: t_id, brand_name: brand_name, brand_stats: brand_stats },
        dataType: "JSON",
        success: function (data) {
          if (data.status == 202) {
            analizer("/admin/brandlist/");
          }
        },
      });
    }
  }
}
function del_br(ths) {
  // dito2
  var id = ths.getAttribute("d_id");
  var x2 = map1.get("brand_list");
  var nm;

  for (let x = 0; x < x2.length; x++) {
    if (x2[x].id == id) {
      nm = x2[x].name;
    }
  }

  can();
  Swal.fire({
    title: "warning",
    text: `Warning the Motorbikes that set in ${nm} will automaticaly set to N/A`,
    icon: "warning",
    showCancelButton: true,
    allowOutsideClick: false,
    confirmButtonColor: "#3085d6",
    confirmButtonText: "OK",
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        url: "/query/dell_brnd",
        method: "POST",
        data: { id: id },
        dataType: "JSON",
        success: function (data) {
          if (data.status == 202) {
            recan();
            analizer("/admin/brandlist/");
          }
        },
        error: function (request, error) {
          alert(error);
        },
      });
    } else if (result.isDismissed) {
      recan();
    }
  });
}
function add_b() {
  var brands = map1.get("brand_list");
  var target1 = document.querySelector(".bct3");
  var target2 = document.querySelector(".bn");
  var brand_name = target2.value;
  var brand_stats = target1.getAttribute("data_id");
  if (brand_name == "") {
    Swal.fire("Please input Brand name").then(() => {
      target2.value = "";
      var myModal = new bootstrap.Modal(document.getElementById("add_m"));
      myModal.show();
    });
  } else {
    var bol = true;
    for (let b = 0; b < brands.length; b++) {
      var bd = brands[b].name.toLowerCase();
      var cat_f_db = bd.replace(/ /g, "");
      var bn = brand_name.toLowerCase();
      var cat_f_db2 = bn.replace(/ /g, "");
      if (cat_f_db == cat_f_db2) {
        bol = false;
        Swal.fire("Brand is already exist").then(() => {
          target2.value = "";
          var myModal = new bootstrap.Modal(document.getElementById("add_m"));
          myModal.show();
        });
      }
    }
    if (bol) {
      target2.value = "";
      $.ajax({
        url: "/query/addbrand",
        method: "POST",
        data: { brand_name: brand_name, brand_stats: brand_stats },
        dataType: "JSON",
        success: function (data) {
          if (data.status == 202) {
            analizer("/admin/brandlist/");
          }
        },
      });
    }
  }
}
function add_cat() {
  // dito
  var cat_nm = document.querySelector(".cat_name");
  var cat_disc = document.querySelector(".cat_disc");
  var cat_st = document.querySelector(".bct5");
  var name = cat_nm.value;
  var discription = cat_disc.value;
  var stats = cat_st.getAttribute("data_id");
  var categories = map1.get("categories");
  if (name == "") {
    Swal.fire("Please input Category name").then(() => {
      cat_nm.value = "";
      cat_disc.value = "";
      var myModal = new bootstrap.Modal(document.getElementById("add_c"));
      myModal.show();
    });
  } else {
    var bol = true;
    for (let cat = 0; cat < categories.length; cat++) {
      var cat_db = categories[cat].category.toLowerCase();
      var cat_f_db = cat_db.replace(/ /g, "");
      var cat_f_db2 = name.replace(/ /g, "");
      if (cat_f_db.toLowerCase() == cat_f_db2.toLowerCase()) {
        bol = false;
        Swal.fire("Category is already exist").then(() => {
          cat_nm.value = "";
          cat_disc.value = "";
          var myModal = new bootstrap.Modal(document.getElementById("add_c"));
          myModal.show();
        });
      }
    }
    if (bol) {
      cat_nm.value = "";
      cat_disc.value = "";
      $.ajax({
        url: "/query/addcategory",
        method: "POST",
        data: { name: name, discription: discription, stats: stats },
        dataType: "JSON",
        success: function (data) {
          if (data.status == 202) {
            analizer("/admin/categorylist/");
          }
        },
      });
    }
  }
}
function update_cat(ths) {
  // dito
  var t_id = ths.getAttribute("d_id");
  var st_id = document.querySelector(".bct6");
  var c_name = document.querySelector(".cnme");
  var c_disc = document.getElementById("cat_disc");
  var categories = map1.get("categories");
  var stat = st_id.getAttribute("data_id"),
    name = c_name.value,
    discript = c_disc.value;
  if (c_name.value == "") {
    Swal.fire("Please input Category name").then(() => {
      c_name.value = "";
      c_disc.value = "";
      var myModal = new bootstrap.Modal(document.getElementById("edt_cat"));
      myModal.show();
    });
  } else {
    var bol = true;
    for (let cat = 0; cat < categories.length; cat++) {
      var cat_db = categories[cat].category.toLowerCase();
      var cat_f_db = cat_db.replace(/ /g, "");
      var cat_f_db2 = c_name.value.replace(/ /g, "");
      if (
        cat_f_db.toLowerCase() == cat_f_db2.toLowerCase() &&
        categories[cat].id != t_id
      ) {
        bol = false;
        Swal.fire("Category is already exist").then(() => {
          c_name.value = "";
          c_disc.value = "";
          var myModal = new bootstrap.Modal(document.getElementById("edt_cat"));
          myModal.show();
        });
      }
    }
    if (bol) {
      c_name.value = "";
      c_disc.value = "";
      $.ajax({
        url: "/query/upp_cat",
        method: "POST",
        data: { id: t_id, name: name, discription: discript, stats: stat },
        dataType: "JSON",
        success: function (data) {
          if (data.status == 202) {
            analizer("/admin/categorylist/");
          }
        },
      });
    }
  }
}
function edit_cat(ths) {
  var th_id = ths.getAttribute("d_id");
  document.querySelector(".u").setAttribute("d_id", th_id);
  document.querySelector(".cat_i").value = th_id;
  var st_id = document.querySelector(".bct6");
  var c_name = document.querySelector(".cnme");
  var c_disc = document.getElementById("cat_disc");
  var c_create = document.querySelector(".cat_create");
  var c_up = document.querySelector(".cat_up");
  var categories = map1.get("categories");
  var stat_id, stat_name, cat_name, cat_disc, date_created, date_updated;
  function gdt(dt) {
    var dc = new Date(dt);
    var day = String(dc.getDate()).padStart(2, "0");
    var month = String(dc.getMonth() + 1).padStart(2, "0");
    var year = String(dc.getFullYear());
    return `${year}-${month}-${day}`;
  }
  for (let cat = 0; cat < categories.length; cat++) {
    if (categories[cat].id == th_id) {
      stat_id = categories[cat].status;
      cat_name = categories[cat].category;
      cat_disc = categories[cat].description;
      date_created = gdt(categories[cat].date_created);
      date_updated = gdt(categories[cat].date_updated);
      if (stat_id == "0") {
        stat_name = "INACTIVE";
      } else if (stat_id == "1") {
        stat_name = "ACTIVE";
      }
    }
  }
  st_id.setAttribute("data_id", stat_id);
  st_id.innerHTML = stat_name;
  c_name.placeholder = cat_name;
  c_disc.placeholder = cat_disc;
  c_create.value = date_created;
  c_up.value = date_updated;
  // diri
}

function remove_cat(ths) {
  var id = ths.getAttribute("d_id");
  var categories = map1.get("categories");
  var name;

  for (let cat = 0; cat < categories.length; cat++) {
    if (categories[cat].id == id) {
      name = categories[cat].category;
    }
  }

  can();
  Swal.fire({
    title: "warning",
    text: `Warning the Motorbikes that set in ${name} will automaticaly set to N/A`,
    icon: "warning",
    showCancelButton: true,
    allowOutsideClick: false,
    confirmButtonColor: "#3085d6",
    confirmButtonText: "OK",
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        url: "/query/dell_cat",
        method: "POST",
        data: { id: id },
        dataType: "JSON",
        success: function (data) {
          if (data.status == 202) {
            recan();
            analizer("/admin/categorylist/");
          }
        },
        error: function (request, error) {
          alert(error);
        },
      });
    } else if (result.isDismissed) {
      recan();
    }
  });
}
function sign_out() {
  $.ajax({
    url: "/auth/logout",
    method: "POST",
    dataType: "JSON",
    success: function (data) {
      analizer("/admin/sign-in");
    },
  });
}

function change_prof() {
  can();
  var c_user = map1.get("user");
  document.querySelector(".curent_img").innerHTML = `
    <img style="height: 50% !important; width: 100% !important;" src="${c_user[0].avatar}">
    `;

  var input_prof = document.querySelector(".input-prof");
  input_prof.addEventListener("change", function () {
    var img = input_prof.files;
    if (img) {
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        document.querySelector(".curent_img").innerHTML = `
                    <img style="height: 50% !important; width: 100% !important;" src="${event.target.result}">
                `;
      };
      fileReader.readAsDataURL(img[0]);
    }
  });
}
function change_cl_prof(e) {
  can();
  var id = e.getAttribute("d_id");
  document.querySelector(".cl-id").setAttribute("d_id", id);
  console.log(id);
  var c_user = map1.get("clients");
  console.log(c_user);
  var the_user = [];
  for (let loop = 0; loop < c_user.length; loop++) {
    console.log(c_user[loop]);
    if (id == c_user[loop].id) {
      the_user.push(c_user[loop]);
    }
  }
  document.querySelector(".curent_img").innerHTML = `
    <img style="height: 50% !important; width: 100% !important;" src="${the_user[0].avatar}">
    `;

  var input_prof = document.querySelector(".input-prof");
  input_prof.addEventListener("change", function () {
    var img = input_prof.files;
    if (img) {
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        document.querySelector(".curent_img").innerHTML = `
                    <img style="height: 50% !important; width: 100% !important;" src="${event.target.result}">
                `;
      };
      fileReader.readAsDataURL(img[0]);
    }
  });
}
function update_cl_img(e) {
  var id = document.querySelector(".cl-id").getAttribute("d_id");
  var input_prof = document.querySelector(".input-prof");
  var img = input_prof.files;
  if (img.length != 0) {
    // add loader here
    $("#loader").modal("show");
    var data = new FormData();
    data.append("imageProfile", input_prof.files[0]);
    data.append("id", id);
    fetch("/query/cl-profile_update", {
      method: "POST",
      body: data,
    })
      .then((res) => {
        $("#loader").modal("hide");
        analizer(`/admin/clients/${id}`);
      })
      .catch((rs) => {
        $("#loader").modal("hide");
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
    recan();
  }
}

function update_my_img() {
  var input_prof = document.querySelector(".input-prof");
  var img = input_prof.files;
  if (img.length != 0) {
    // add loader here
    $("#loader").modal("show");

    var data = new FormData();
    data.append("imageProfile", input_prof.files[0]);
    data.append("name", input_prof.files[0].name);

    fetch("/query/my-profile_update", {
      method: "POST",
      body: data,
    })
      .then((res) => {
        $("#loader").modal("hide");
        analizer("/admin/profile/");
        // Swal.fire({
        //   position: "top-end",
        //   icon: "success",
        //   title: "PROFILE UPDATED SUCCESSFULLY",
        //   showConfirmButton: false,
        //   timer: 1500,
        // });
        // close here
      })
      .catch((rs) => {
        $("#loader").modal("hide");
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
    recan();
  }
}
function onlyNumberKey(evt) {
  // Only ASCII character in that range allowed
  var ASCIICode = evt.which ? evt.which : evt.keyCode;
  if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) return false;
  return true;
}

function keyDown(e) {
  var e = window.event || e;
  var key = e.keyCode;
  //space pressed
  if (key == 32) {
    //space
    e.preventDefault();
  }
}

function checkWhitespace(event) {
  var data = event.clipboardData.getData("text/plain");
  var isNullOrContainsWhitespace =
    !data || data.length === 0 || /\s/g.test(data);

  if (isNullOrContainsWhitespace) {
    event.preventDefault();
  }
}

function update_info() {
  var f_name = document.getElementById("f_name");
  var l_name = document.getElementById("l_name");
  var u_name = document.getElementById("u_name");
  var x = map1.get("user");
  var first_name = "";
  var last_name = "";
  var username = "";
  if (f_name.value == "") {
    first_name = x[0].firstname;
  } else {
    first_name = f_name.value;
  }
  if (l_name.value == "") {
    last_name = x[0].lastname;
  } else {
    last_name = l_name.value;
  }
  if (u_name.value == "") {
    username = x[0].username;
  } else {
    username = u_name.value;
  }
  console.log(first_name, last_name, username);

  $.ajax({
    url: "/query/updateusr",
    method: "POST",
    data: { f_name: first_name, l_name: last_name, u_name: username },
    dataType: "JSON",
    success: function (data) {
      if (data.status == 202) {
        if (data.status == 202) {
          analizer("/admin/profile");
        }
      }
    },
    error: function (request, error) {
      alert(error);
    },
  });
}

function update_info_client(ths) {
  var x = map1.get("clients");
  var l_id = ths.getAttribute("data_id");
  var contact = document.getElementById("contact");
  var f_name = document.getElementById("f_name");
  var l_name = document.getElementById("l_name");
  var u_name = document.getElementById("u_name");
  var address = document.getElementById("address");
  var bct7 = document.querySelector(".bct7");
  var gender = bct7.getAttribute("data");
  var first_name = "";
  var last_name = "";
  var username = "";
  var addr;
  var cont;
  var info = [];
  var flag = true;
  for (let cl = 0; cl < x.length; cl++) {
    if (x[cl].id == l_id) {
      info.push(x[cl]);
    }
    if (contact.value == x[cl].contact) {
      flag = false;
    }
  }
  if (f_name.value == "") {
    first_name = info[0].firstname;
  } else {
    first_name = f_name.value;
  }

  if (address.value == "") {
    addr = info[0].address;
  } else {
    addr = address.value;
  }
  if (contact.value == "") {
    cont = info[0].contact;
  } else {
    cont = contact.value;
  }

  if (l_name.value == "") {
    last_name = info[0].lastname;
  } else {
    last_name = l_name.value;
  }
  if (u_name.value == "") {
    username = info[0].email;
  } else {
    username = u_name.value;
  }

  if (flag) {
    $.ajax({
      url: "/query/update_clnt",
      method: "POST",
      data: {
        id: l_id,
        f_name: first_name,
        l_name: last_name,
        u_name: username,
        address: addr,
        gender: gender,
        number: cont,
      },
      dataType: "JSON",
      success: function (data) {
        if (data.status == 202) {
          if (data.status == 202) {
            analizer(`/admin/clients`);
          }
        }
      },
      error: function (request, error) {
        alert(error);
      },
    });
  } else {
    Swal.fire("Contact Number is already taken");
  }
}

function updatepwd() {
  var old_p = document.getElementById("old_p");
  var new_p = document.getElementById("nw_p");
  var confnew_p = document.getElementById("confnw_p");

  if (old_p.value == "") {
    Swal.fire("Please input Current password");
  } else {
    $.ajax({
      url: "/query/compare/",
      method: "POST",
      data: { old_p: old_p.value },
      dataType: "JSON",
      success: function (data) {
        if (data.status == 202) {
          var p = String(new_p.value);
          if (p == "") {
            Swal.fire("New password must not be null");
          } else if (p.length < 7) {
            document.getElementById("min").style.color = "red";
          } else if (p.search(/[a-z]/i) < 0) {
            document.getElementById("st").style.color = "red";
          } else if (p.search(/[0-9]/i) < 0) {
            document.getElementById("num").style.color = "red";
          } else {
            if (confnew_p.value == new_p.value) {
              $.ajax({
                url: "/query/comparetrue",
                method: "POST",
                data: { new_p: new_p.value },
                dataType: "JSON",
                success: function (data) {
                  if (data.status == 202) {
                    $.ajax({
                      url: "/query/updatepd",
                      method: "POST",
                      data: { new_p: new_p.value },
                      dataType: "JSON",
                      success: function (data) {
                        if (data.status == 202) {
                          Swal.fire("password Updated");
                          old_p.value = "";
                          new_p.value = "";
                          confnew_p.value = "";
                        }
                      },
                    });
                  } else {
                    Swal.fire("Now password must not same with old password");
                  }
                },
              });
            } else {
              document.getElementById("conf").style.color = "red";
            }
          }
        } else {
          Swal.fire("Current password did not match");
        }
      },
      error: function (request, error) {
        alert(error);
      },
    });
  }
}

function updateclpwd() {
  var ol_p = document.querySelector(".updid").getAttribute("data_id");
  var old_p = document.getElementById("old_p");
  var new_p = document.getElementById("nw_p");
  var confnew_p = document.getElementById("confnw_p");
  console.log();

  if (old_p.value == "") {
    Swal.fire("Please input Current password");
  } else {
    $.ajax({
      url: "/query/clcompare/",
      method: "POST",
      data: { old_p: old_p.value, ol_p: ol_p },
      dataType: "JSON",
      success: function (data) {
        if (data.status == 202) {
          var p = String(new_p.value);
          if (p == "") {
            Swal.fire("New password must not be null");
          } else if (p.length < 7) {
            document.getElementById("min").style.color = "red";
          } else if (p.search(/[a-z]/i) < 0) {
            document.getElementById("st").style.color = "red";
          } else if (p.search(/[0-9]/i) < 0) {
            document.getElementById("num").style.color = "red";
          } else {
            if (confnew_p.value == new_p.value) {
              $.ajax({
                url: "/query/clcomparetrue",
                method: "POST",
                data: { new_p: new_p.value, ol_p: ol_p },
                dataType: "JSON",
                success: function (data) {
                  if (data.status == 202) {
                    $.ajax({
                      url: "/query/clupdatepd",
                      method: "POST",
                      data: { new_p: new_p.value, ol_p: ol_p },
                      dataType: "JSON",
                      success: function (data) {
                        if (data.status == 202) {
                          Swal.fire("password Updated");
                          old_p.value = "";
                          new_p.value = "";
                          confnew_p.value = "";
                        }
                      },
                    });
                  } else {
                    Swal.fire("Now password must not same with old password");
                  }
                },
              });
            } else {
              document.getElementById("conf").style.color = "red";
            }
          }
        } else {
          Swal.fire("Current password did not match");
        }
      },
      error: function (request, error) {
        alert(error);
      },
    });
  }
}

function sign_out() {
  $.ajax({
    url: "/auth/logout",
    method: "POST",
    dataType: "JSON",
    success: function (data) {
      analizer('/')
    },
  });
}

function cl_msg_close() {
  var tab = document.querySelector("#cl-msg");
  tab.classList.remove("show");
}

function del_cl(ths) {
  var id = ths.getAttribute("d_id");
  var cl = map1.get('clients');
  var name;
  for (let c = 0; c < cl.length; c++) {
      if (cl[c].id == id) {
          name = `${cl[c].firstname} ${cl[c].lastname}`
      }
  }

  can();
  Swal.fire({
      title: 'warning',
      text: `Warning the Records in users :${name} will automaticaly delated`,
      icon: 'warning',
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
  }).then((result) => {
      if (result.isConfirmed) {
          $.ajax({
              url: "/query/users_info",
              method: "POST",
              data: { id: id },
              dataType: "JSON",
              success: function (data) {
                  if (data.status == 202) {
                      $.ajax({
                          url: "/query/del_user",
                          method: "POST",
                          data: { id: id },
                          dataType: "JSON",
                          success: function (data) {
                              if (data.status == 202) {
                                  analizer('/admin/clients/')
                              }
                          },
                          error: function (request, error) {
                              alert(error);
                          },
                      });
                  }
              },
              error: function (request, error) {
                  alert(error);
              },
          });
      } else if (result.isDismissed) {
          recan();
      }
  })
}

function set_actor() {
  var tab = document.querySelector("#cl-msg");
  var actress = map1.get("user");
  var clients = map1.get("clients");
  tab.classList.add("show");
  var usrw = document.querySelector(".msg-usrs-row");
  usrw.innerHTML = "";
  tab.setAttribute("actor_id", actress[0].id);
  for (let loop = 0; loop < clients.length; loop++) {
    var name = clients[loop].firstname,
      nametrimmed;
    if (name.length >= 5) {
      nametrimmed = name.substring(0, 5);
    }
      usrw.innerHTML += `
            <a r_id="${clients[loop].id}" nm="${name} ${clients[loop].lastname}" onclick="selected_usr(this)" title="${name} ${clients[loop].lastname}" class="btn btn-sm btn-outline-danger usr-${clients[loop].id} xm">${nametrimmed}<span class="badge disabled badge-info" style="margin-left: 1vh !important;">0</span></a>
            <br>
            `;
  }
  var disp_name = document.querySelector(".disp_name").getAttribute('r_id');
  if (disp_name !== null) {
    document.querySelector(`.usr-${disp_name}`).classList.remove('btn-outline-danger');
    document.querySelector(`.usr-${disp_name}`).classList.add('btn-outline-success');
    document.querySelector(`.usr-${disp_name}`).style.pointerEvents = 'none'
  }
}

async function selected_usr(e) {
  var xm = document.querySelectorAll('.xm')
  for (let l = 0; l < xm.length; l++){
    xm[l].style.pointerEvents = 'auto';
    xm[l].classList.add('btn-outline-danger');
  }
  var id = e.getAttribute("r_id");
  var name = e.getAttribute("nm");
  var disp_name = document.querySelector(".disp_name");
  document.querySelector(`.usr-${id}`).classList.remove('btn-outline-danger');
  document.querySelector(`.usr-${id}`).classList.add('btn-outline-success');
  document.querySelector(`.usr-${id}`).style.pointerEvents = 'none'
  disp_name.innerHTML = name;
  disp_name.setAttribute("r_id", id);
  msg_box(id, name);
  await showmsg(id, name);
}

function msg_box(id, name) {
      document.querySelector(".msg_sender").innerHTML = `
    <div class="col-1 ms-loader">
        <label for="file-upload" class="custom-file-upload" style="margin-top: 1vh !important;">
          <i class="fa fa-cloud-upload"></i>
        </label>
      <input id="file-upload" type="file" accept="image/jpeg, image/png, image/jpg" class="msg-img" onchange="send_img(this, ${id}, '${name}')" multiple />
    </div>
    <div class="col-8 ms-form">
        <form class="align-items-center" action="javascript:void(0);" onsubmit="send_msg(${id}, '${name}')">
            <div class="input-group input-group-outline d-flex">
                <input type="text" placeholder="Type your message" class="form-control form-control-lg msg_val" required>
            </div>
        </form>
    </div>
    <div class="col-1 ms-sbmt">
        <button class="btn bg-gradient-primary mb-0" onclick="send_msg(${id}, '${name}')">
            <i class="material-icons">send</i>
        </button>
    </div>
    `;
}


function adminmsg(user) {
    var date = new Date(user.date_send);
    var box_msg = document.querySelector(".msg-box");
    if (user.images != null) {
        var imgs = JSON.parse(user.images);
        if (imgs.length == 1) {
            box_msg.innerHTML += `
              <div class="row justify-content-start mb-4" style="width: 115% !important;">
                <div class="card-body pt-sm-3 pt-0 m-box scrollbar-y text-white" style="border-radius: 25px 25px 25px 0px; background-color: #344767 !important;">
                  <div class="container">
                    <div class="row row-cols-1">
                        <div class="col"><img onclick="Swal.fire({imageUrl: '${imgs[0]}', imageWidth: 400,imageHeight: 200})" src="${imgs[0]}" class="img-fluid"></div>
                    </div>
                  </div>
                  <p class="text-sm">${user.messages}</</p>
                  <p>ADMIN</p>
                </div>
                <p style="color: black !important;">${date.toUTCString().replace(" GMT", "")}</p>
              </div>
            `;

        } else {
            box_msg.innerHTML += `
                <div class="row justify-content-start mb-4" style="width: 115% !important;">
                  <div class="card-body pt-sm-3 pt-0 m-box scrollbar-y text-white" style="border-radius: 25px 25px 25px 0px; background-color: #344767 !important;">
                    <div class="container">
                      <div class="row row-cols-3 ms-id-${user.id}">
                      </div>
                    </div>
                    <p class="text-sm">${user.messages}</</p>
                    <p>ADMIN</p>
                  </div>
                  <p style="color: black !important;">${date.toUTCString().replace(" GMT", "")}</p>
                </div>
            `;
            for (let url of imgs) {
              document.querySelector(`.ms-id-${user.id}`).innerHTML += `
              <div class="col"><img onclick="Swal.fire({imageUrl: '${url}', imageWidth: 400,imageHeight: 200})" src="${url}" class="img-fluid"></div>
              `;
            }
        }
    } else {
        box_msg.innerHTML += `
        <div class="row justify-content-start mb-4" style="width: 115% !important;">
            <div class="card-body pt-sm-3 pt-0 m-box scrollbar-y text-white" style="border-radius: 25px 25px 25px 0px; background-color: #344767 !important;">
              <p class="text-sm">${user.messages}</</p>
              <p>ADMIN</p>
            </div>
          <p style="color: black !important;">${date.toUTCString().replace(" GMT", "")}</p>
        </div>
    `;
    }
}
function clientmsg(user, name) {
    var date = new Date(user.date_send)
    var box_msg = document.querySelector('.msg-box');
    if (user.images != null) {
        var imgs = JSON.parse(user.images);
        if (imgs.length == 1) { 
            box_msg.innerHTML += `
            <div class="row justify-content-end mb-4" style="width: 115% !important;">
              <div class="card-body pt-sm-3 pt-0 m-box scrollbar-y text-white" style="border-radius: 25px 25px 0 25px; background-color: #344767 !important;">
                <div class="container">
                  <div class="row row-cols-1">
                    <div class="col"><img onclick="Swal.fire({imageUrl: '${imgs[0]}', imageWidth: 400,imageHeight: 200})" src="${imgs[0]}" class="img-fluid"></div>
                  </div>
                </div>
                <p class="text-sm">${user.messages}</p>
                <p>${name}</p>
              </div>
              <p style="color: black !important;">${date.toUTCString().replace(" GMT", "")}</p>
            </div>
            `;
        } else {
            box_msg.innerHTML += `
            <div class="row justify-content-end mb-4" style="width: 115% !important;">
              <div class="card-body pt-sm-3 pt-0 m-box scrollbar-y text-white" style="border-radius: 25px 25px 0 25px; background-color: #344767 !important;">
                <div class="container">
                  <div class="row row-cols-3 ms-id-${user.id}">
                  </div>
                </div>
                <p class="text-sm">${user.messages}</p>
                <p>${name}</p>
              </div>
              <p style="color: black !important;">${date.toUTCString().replace(" GMT", "")}</p>
            </div>
            `;
            for (let url of imgs) {
              document.querySelector(`.ms-id-${user.id}`).innerHTML += `
              <div class="col"><img onclick="Swal.fire({imageUrl: '${url}', imageWidth: 400,imageHeight: 200})" src="${url}" class="img-fluid"></div>
              `;
            }
        }
    } else {
        box_msg.innerHTML += `
        <div class="row justify-content-end mb-4" style="width: 115% !important;">
          <div class="card-body pt-sm-3 pt-0 m-box scrollbar-y text-white" style="border-radius: 25px 25px 0 25px; background-color: #344767 !important;">
            <p class="text-sm">${user.messages}</p>
            <p>${name}</p>
          </div>
          <p style="color: black !important;">${date.toUTCString().replace(" GMT", "")}</p>
        </div>
        `;
    }
}

async function showmsg(id, name) {
  document.querySelector(".msg-box").innerHTML = `
  <div class="spinner-border text-dark" role="status">
    <span class="sr-only">Loading...</span>
  </div>
  `;
  document.querySelector(".ms-form").innerHTML = `
  <div class="spinner-border text-warning" role="status">
    <span class="sr-only">Loading...</span>
  </div>
  `;
  document.querySelector(".ms-sbmt").innerHTML = ''
  await $.ajax({
    url: "/query/show-msg",
    method: "POST",
    dataType: "JSON",
    data : { "id": id },
    success: function (data) {
      document.querySelector(".msg-box").innerHTML = ''
      document.querySelector(".ms-form").innerHTML = `
       <form class="align-items-center" action="javascript:void(0);" onsubmit="send_msg(${id}, '${name}')">
            <div class="input-group input-group-outline d-flex">
                <input type="text" placeholder="Type your message" class="form-control form-control-lg msg_val" required>
            </div>
        </form>
      `;
      document.querySelector(".ms-sbmt").innerHTML = `
        <button class="btn bg-gradient-primary mb-0" onclick="send_msg(${id}, '${name}')">
          <i class="material-icons">send</i>
        </button>
        `
      if (data.length >= 1) {
        for (var user of data) {
          user.sender == "" ? adminmsg(user) : clientmsg(user, name);
        }
      } else {
        document.querySelector('.msg-box').innerHTML = `<h4 style="color: black !important;" >NO MESSAGES</h4>`
      }
      document.location = "#messages";
    },
    error: function (request, error) {
      location.reload();
    },
  });
}

function send_img(e, id, name) {
    if (e.files.length >= 1) {
      document.querySelector(".ms-loader").innerHTML = `
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        `;
      var data = new FormData();
      for (let loop = 0; loop < e.files.length; loop++) {
        data.append("img_message", e.files[loop]);
      }
      data.append("id", id);
      fetch("/query/send-img", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
            if (res.status == 202) {
              document.querySelector(".ms-loader").innerHTML = `
                <label for="file-upload" class="custom-file-upload" style="margin-top: 1vh !important;">
                    <i class="fa fa-cloud-upload"></i>
                </label>
                <input id="file-upload" type="file" accept="image/jpeg, image/png, image/jpg" class="msg-img" onchange="send_img(this)"
                    multiple />
            `;
            showmsg(id, name);
            } else {
              Swal.fire("Failed to upload files");
            }
        })
        .catch((rs) => {
          Swal.fire("Failed to upload files");
        });
    }
}
async function send_msg(id, name) {
    var msg = document.querySelector('.msg_val');
    var msg_box = document.querySelector('.msg-box');
    if(msg.value != ""){
        await $.ajax({
            url: "/query/send-msg",
            data: { "message": msg.value, "id": id },
            method: "POST",
            dataType: "JSON",
            success: function (data) {
                if (data.status == 202) {
                    showmsg(id, name);
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

window.addEventListener("load", analizer(window.location.pathname), false);

function loading() {
  Swal.fire({
    title: "<i>PLEASE WAIT</i>",
    html: `<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>`,
    allowOutsideClick: false,
    allowEscapeKey: false,
    showCancelButton: false,
    showConfirmButton: false,
  });
}


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
