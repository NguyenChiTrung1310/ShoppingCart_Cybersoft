var productList = new Produclist();
var getEle = function (id) {
  return document.getElementById(id);
};

var cartProduct = [];

const fetchList = function () {
  axios({
    url: "https://5f1d4b9f39d95a0016953dc8.mockapi.io/api/PRODUCTS",

    method: "GET",
  })
    .then(function (res) {
      productList.arr = res.data;
      console.log(productList.arr);
      renderProd();
    })
    .catch(function (err) {
      // console.log(err);
    });
};
fetchList();

const renderProd = function (list = productList.arr) {
  var htmlContent = "";

  for (var i = 0; i < list.length; i++) {
    //template string
    htmlContent += `   <div class="col-4">
    <div class="card p-2">
        <img
        style="height: 280px;"
        src="${list[i].image}"
        class="w-100"
        alt="${list[i].name}"
        />
        <h4>${list[i].name}</h4>
        <p>${list[i].description}</p>
        <p>Giá: ${parseInt(list[i].price).toLocaleString()} VND </p>
        <p>Đánh Giá: ${list[i].rating}</p>
        <p>Số lượng hàng: ${list[i].inventory}</p>
        <button class="btn btn-success" onclick="addToCart(${
      list[i].id
      })">Cart</button>
    </div>
</div>`;
  }
  document.getElementById("tbody").innerHTML = htmlContent;
};

const sortProduct = function () {
  var value = document.getElementById("sort").value;
  if (+value === 0) {
    productList.arr.sort(compare);
    renderProd();
  }
  if (+value === 1) {
    productList.arr.sort(compareDecrement);
    renderProd();
  }
};
const compare = function (a, b) {
  // Dùng toUpperCase() để không phân biệt ký tự hoa thường
  const genreA = a.name.toUpperCase();
  const genreB = b.name.toUpperCase();

  let comparison = 0;
  if (genreA < genreB) {
    comparison = -1;
  } else {
    comparison = 1;
  }
  return comparison;
};
const compareDecrement = function (a, b) {
  //nghịch đảo giá trị trả lại bằng cách nhân với -1
  const genreA = a.name.toUpperCase();
  const genreB = b.name.toUpperCase();

  let comparison = 0;
  if (genreA > genreB) {
    comparison = -1;
  } else {
    comparison = 1;
  }
  return comparison;
};

const searchProduct = function () {
  var search = [];
  var value = document.getElementById("filterProduct").value;
  for (var i = 0; i < productList.arr.length; i++) {
    if (value.toUpperCase() === productList.arr[i].type.toUpperCase()) {
      search.push(productList.arr[i]);
    }
  }
  renderProd(search);
};

const findIndexProduct = function (id) {
  for (var i = 0; i < productList.arr.length; i++) {
    if (parseInt(productList.arr[i].id) === parseInt(id)) {
      return i;
    }
  }
  return -1;
};
const findIndexCart = function (id) {
  for (var i = 0; i < cartProduct.length; i++) {
    if (parseInt(cartProduct[i].product.id) === parseInt(id)) {
      return i;
    }
  }
  return -1;
};


const sum = function () {
  var totalSum = 0;
  var quantity;
  var price;
  for (var i = 0; i < cartProduct.length; i++) {
    quantity = +cartProduct[i].quantity;
    price = +cartProduct[i].product.price;
    totalSum += quantity * price;
  }
  return totalSum;
};
const renderCaft = function (list = cartProduct) {
  var htmlContent = "";

  for (var i = 0; i < list.length; i++) {
    //template string
    htmlContent += `
        <tr>
            <td>
            <img
                style="width: 150px;"
                src="${list[i].product.image}"
            />
            </td>
            <td style="font-size: 25px;">${list[i].product.name}</td>
            <td>${parseInt(list[i].product.price).toLocaleString()}</td>
            <td>
            <span>${list[i].quantity} </span>
            <div class="btn-group">
                <button class="btn btn-info border-right" onclick="descendItem(${
      list[i].product.id
      })">-</button>
                <button class="btn btn-info border-left" onclick="increaseItem(${
      list[i].product.id
      })">+</button>
            </div>
            </td>
            <td>${parseInt(
        +list[i].quantity * +list[i].product.price
      ).toLocaleString()} VND </td>
            <td>
            <button class="btn btn-info" onclick="deleteCartItem(${
      list[i].product.id
      })">x</button>
            </td>
        </tr>
    `;
  }
  document.getElementById("tblCart").innerHTML = htmlContent;
  document.getElementById("totalPrice").innerHTML =
    sum().toLocaleString() + "VND";
  setLocalStorage();
};
const addToCart = function (id) {
  var indexProduct = findIndexProduct(id);
  var indexCart = findIndexCart(id);
  if (indexCart >= 0) {
    cartProduct[indexCart].quantity++;
  } else {
    var cartItem = {
      product: productList.arr[indexProduct],
      quantity: 1,
    };
    cartProduct.push(cartItem);

    // renderCaft(cartProduct);
  }
  renderCaft(cartProduct);
  console.log('cliked');
};

const descendItem = function (id) {
  var index = findIndexCart(id);
  if (index !== -1) {
    if (parseInt(cartProduct[index].quantity) > 1) {
      cartProduct[index].quantity--;
    } else {
      deleteCartItem(id);
    }
  }
  renderCaft(cartProduct);
};

const deleteCartItem = function (id) {
  var index = findIndexCart(id);
  if (index !== -1) {
    cartProduct.splice(index, 1);
  }
  renderCaft(cartProduct);
};
const increaseItem = function (id) {
  var index = findIndexCart(id);
  if (index !== -1) {
    cartProduct[index].quantity++;
  }
  renderCaft(cartProduct);
};


getLocalStorage();
function setLocalStorage() {
  /**
   * Lưu mảng empl xuống localStorage
   * Khi lưu xuống ép sang kiểu string
   */
  localStorage.setItem("ListEmpl", JSON.stringify(cartProduct));
}
function getLocalStorage() {
  if (localStorage.getItem("ListEmpl")) {
    /**
     * lấy mảng empl dưới localStorage lên dùng
     * Khi lấy lên để sử dụng ép sang kiểu Json
     */
    cartProduct = JSON.parse(localStorage.getItem("ListEmpl"));
    renderCaft(cartProduct);
  }
}

const purchaseCart = function () {
  cartProduct = [];
  localStorage.clear("product");
  renderCaft(cartProduct);
  alert("Bạn đã thanh toán thành công");
};


// ****************** ADMIN ******************

