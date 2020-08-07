import { loadHomePage } from "./home.js";
import { loadProductsList, numberItems } from "./products.js";
import { loadCartPage } from "./cart.js";
// Define main menu handle events
numberItems();
const menu = [...document.querySelectorAll(".menu__nav--link")];
menu.forEach((el, i) =>
  i === 1 || i === 2 || i === 3
    ? (el.onclick = () => loadProductsList())
    : (el.onclick = () => loadHomePage())
);

const headerMenu = [...document.querySelectorAll(".home-header__user--link")];
headerMenu[3].onclick = () => loadCartPage(); // Load Cart page - giỏ hàng  