// Call ajax to load products list page
export function loadProductsList() {
  const main = document.querySelector(".main");
  fetch("assets/html/products.txt")
    .then((res) => res.text())
    .then((html) => {
      main.innerHTML = html;
      main.scrollIntoView({ behavior: "smooth" });
      const productsImg = [...document.querySelectorAll(".home-new__img")];
      const productsName = [...document.querySelectorAll(".home-new__wine h4")];
      const productsPrice = [...document.querySelectorAll(".home-new__price")];
      const addBtn = [...document.querySelectorAll(".home-new__btn a")];
      fetch("http://localhost:3000/products")
        .then((res) => res.json())
        .then((products) => {
          for (let i = 0; i < productsImg.length; i++) {
            productsImg[i].src = products[i].image;
            productsName[i].innerHTML = products[i].name.toUpperCase();
            productsPrice[i].innerHTML = products[i].price + "<span>$</span>";
            addBtn[i].setAttribute("data-id", products[i].id);
          }
          addBtn.forEach(
            (el) => (el.onclick = () => addToCart(el.getAttribute("data-id")))
          );
        });
    });
}

// ---------- Add to cart ----------
function addToCart(value) {
  let checkItem = Object.keys(localStorage);
  checkItem.length !== 0
    ? checkItem.includes("id" + value)
      ? addMore(value)
      : addNew(value)
    : addNew(value);
  console.log(localStorage);
  numberItems();
}
function addMore(value) {
  const temp = JSON.parse(localStorage.getItem("id" + value));
  localStorage.setItem(
    "id" + value,
    JSON.stringify({ quantity: temp.quantity + 1 })
  );
  numberItems();
}
function addNew(value) {
  localStorage.setItem("id" + value, JSON.stringify({ quantity: 1 }));
}
export function numberItems() {
  const cartNumber = document.querySelector(".home-header__user--items span");
  let numberItems = 0;
  Object.keys(localStorage).forEach(e => {
    numberItems += JSON.parse(localStorage.getItem(e)).quantity;
  });
  cartNumber.innerHTML = numberItems;
}