const prodList = new Produclist();
var getEle = function (id) {
    return document.getElementById(id);
};

const fetchProdList = function () {
    axios({
        url: "https://5f1d4b9f39d95a0016953dc8.mockapi.io/api/PRODUCTS",

        method: "GET",
    })
        .then(function (res) {
            prodList.arr = res.data;
            console.log(prodList.arr);
            renderPro_Admin();
        })
        .catch(function (err) {
            // console.log(err);
        });
};
fetchProdList();

const addProd = function () {
    const image = getEle("anhSP").value;
    const name = getEle("tenSP").value;
    const id = getEle("maSP").value;
    const type = getEle("loaiSP").value;
    const description = getEle("motaSP").value;
    const price = getEle("gia").value;
    const inventory = getEle("soluong").value;
    const rating = getEle("danhgia").value;

    const newProd = new Produclist(
        id,
        name,
        image,
        description,
        price,
        inventory,
        rating,
        type
    );

    axios({
        method: 'POST',
        url: 'https://5f1d4b9f39d95a0016953dc8.mockapi.io/api/PRODUCTS',
        data: newProd
    })
        .then(function (res) {
            console.log(res);
            // call api lấy ds nv mới sau khi thêm
            fetchProdList();
        })
        .catch(function (err) {
            console.log(err);
        })
}

const renderPro_Admin = function (list = prodList.arr) {
    var htmlContent = "";

    for (var i = 0; i < list.length; i++) {
        //template string
        htmlContent += `<tr>
        <td>${i + 1}</td>
        <td>
          <img
            style="height: 100px;"
              src="${list[i].image}"
              alt="${list[i].name}"
          />
        </td>
        <td>${list[i].name}</td>
        <td>${list[i].id}</td>
        <td>${list[i].type}</td>
        <td>${list[i].description}</td>
        <td>${list[i].price}</td>
        <td>${list[i].inventory}</td>
        <td>${list[i].rating}</td>
  
        <td>
          <button class="btn btn-info" onclick="editProd(${
            list[i].id
            })">Edit</button>
  
          <button class="btn btn-danger" onclick="deleteProd(${
            list[i].id
            })">Delete</button>
        </td>
        </tr>`;
    }
    document.getElementById("tbodyProd").innerHTML = htmlContent;
};

function deleteProd(id) {
    axios({
        method: 'DELETE',
        url: 'https://5f1d4b9f39d95a0016953dc8.mockapi.io/api/PRODUCTS/' + id
    })
        .then(function (res) {
            fetchProdList();
        })
        .catch(function (err) {
            console.log(err);
        })
}

function getProdById(id) {
    var prod;

    prod = this.arr.find(function (item) {
        return parseInt(item.id) === parseInt(id);
    });

    return prod;
};

function editProd(id) {
    getEle("btnAdd").style.display = "none";
    getEle("btnUpdate").style.display = "block";
    getEle("btnCancle").style.display = "block";
    getEle("maSP").setAttribute("disabled", true);

    var prod = prodList.getProdById(id);

    getEle("anhSP").value = prod.image;
    getEle("tenSP").value = prod.name;
    getEle("maSP").value = prod.id;
    getEle("loaiSP").value = prod.type;
    getEle("motaSP").value = prod.description;
    getEle("gia").value = prod.price;
    getEle("soluong").value = prod.inventory;
    getEle("danhgia").value = prod.rating;
}

function cancle() {
    getEle("btnAdd").style.display = "block";
    getEle("btnUpdate").style.display = "none";
    getEle("btnCancle").style.display = "none";

    getEle("frmProd").reset();
    getEle("maSP").removeAttribute("disabled");
}

/**
 * UPDATE
 */
function updateProd() {

    var image = getEle("anhSP").value;
    var name = getEle("tenSP").value;
    var id = getEle("maSP").value;
    var type = getEle("loaiSP").value;
    var description = getEle("motaSP").value;
    var price = getEle("gia").value;
    var inventory = getEle("soluong").value;
    var rating = getEle("danhgia").value;


    var prod = new Produclist(id,
        name,
        image,
        description,
        price,
        inventory,
        rating,
        type);

    axios({
        method: 'PUT',
        url: 'https://5f1d4b9f39d95a0016953dc8.mockapi.io/api/PRODUCTS/' + id,

        data: prod
    })
        .then(function (res) {
            fetchProdList();
        })
        .catch(function (err) {
            console.log(err);
        })
}
