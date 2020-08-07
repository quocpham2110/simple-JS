import {numberItems} from "./products.js"
export function loadAddressPage() {
  const main = document.querySelector(".main");
  fetch("assets/html/address.txt")
    .then((res) => res.text())
    .then((html) => {
      main.innerHTML = html;
      main.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
      const addressModify = document.querySelector(
        ".address__added--modified a"
      );
      const addressConfirm = document.querySelector(".address__btn--submit");
      const address = document.querySelector(".address__added--inner");
      const addressBtn = document.querySelector(".address__btn");
      addressModify.onclick = () => {
        address.classList.add("active");
        addressModify.style.display = "none";
        addressBtn.classList.remove("hide");
        main.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      };
      addressConfirm.onclick = () => {
        address.classList.remove("active");
        addressModify.style.display = "unset";
        addressBtn.classList.add("hide");
        main.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      };
      const orderConfirm = document.querySelector(".address__confirm a");
      orderConfirm.onclick = () => {
        localStorage.clear();
        numberItems();
        alert("Bạn đã đặt hàng thành công!");
      };
    });
}