//change theme color

const links = document.querySelectorAll(".alternate-style");
const setActiveStyle = (color) => {
  links.forEach((link) => {
    if (color === link.getAttribute("title")) {
      link.removeAttribute("disabled");
    } else {
      link.setAttribute("disabled", "true");
    }
  });
};

// change body skin
const bodySkin = document.querySelectorAll(".body-skin");
bodySkin.forEach((each) => {
  each.addEventListener("change", () => {
    if (each.value === "dark") {
      document.body.className = "dark";
    } else {
      document.body.className = "";
    }
  });
});

document
  .querySelector(".toggle-style-switcher")
  .addEventListener("click", () => {
    document.querySelector(".style-switcher").classList.toggle("open");
  });
