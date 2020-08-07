import { loadProductsList, numberItems } from "./products.js";
import { loadAddressPage } from "./address.js";
// Call ajax to load Cart page
export function loadCartPage() {
  numberItems();
  const main = document.querySelector(".main");
  fetch("assets/html/cart.txt")
    .then((res) => res.text())
    .then((html) => {
      main.innerHTML = html;
      main.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
      loadCartList();
      const cartBtn = [...document.querySelectorAll(".cart__btn a")];
      cartBtn[0].onclick = loadProductsList;
      cartBtn[1].onclick = () => {
        confirm("Bạn có chắc chắn xóa tất cả sản phẩm này?")
          ? clearAllCart()
          : null;
      };
      cartBtn[2].onclick =
        localStorage.length !== 0
          ? loadAddressPage
          : () => {
              alert("Vui lòng chọn thêm sản phẩm");
            };
    });
}

// Render added products
function loadCartList() {
  const data = Object.entries(localStorage).map((el) => ({
    id: el[0].slice(2),
    quantity: JSON.parse(el[1]).quantity,
  }));
  const cartTable = document.querySelector(".cart__table");
  fetch("http://localhost:3000/products")
    .then((res) => res.json())
    .then((products) => {
      data.length !== 0
        ? (() => {
            data.map((el) => {
              const cartRow = `<div class="cart__table-row">
            <div><img src=${products[el.id - 1].image} alt="wine">
              <h5>${products[el.id - 1].name.toUpperCase()}</h5>
            </div>
            <div>
              <h5>${products[el.id - 1].name.toUpperCase()}</h5>
            </div>
            <div>
              <p class="price">${products[el.id - 1].price}<span>$</span></p>
            </div>
            <div>
              <h5>${el.quantity}</h5>
            </div>
            <div>
              <p class="price">${
                products[el.id - 1].price * el.quantity
              }<span>$</span></p>
            </div>
            <div><a class="cart__dlt-item" data-id=${
              el.id
            }><i class="fas fa-trash-alt"></i></a>
            </div>
          </div>`;
              cartTable.innerHTML += cartRow;
            });
            cartTable.innerHTML += `<div class="cart__total">TỔNG: <p class="price">${data.reduce(
              (total, el) => (total += products[el.id - 1].price * el.quantity),
              0
            )}<span>$</span></p></div>`;
          })()
        : (cartTable.innerHTML +=
            "No item have been added. Please choose your favourite!");
      handleDeleteItem();
    });
}

function clearAllCart() {
  localStorage.clear();
  loadCartPage();
}
function handleDeleteItem() {
  const deleteItem = [...document.querySelectorAll(".cart__dlt-item")];
  deleteItem.forEach(
    (el) =>
      (el.onclick = () => {
        if (confirm("Bạn có muốn xóa sản phẩm này khỏi giỏ hàng?")) {
          localStorage.removeItem("id" + el.getAttribute("data-id"));
          loadCartPage();
        }
      })
  );
}