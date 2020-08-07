// Call ajax to load home page
export function loadHomePage() {
  const main = document.querySelector(".main");
  fetch("assets/html/homepage.txt")
    .then((res) => res.text())
    .then((html) => {
      main.innerHTML = html;
      main.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    });
}