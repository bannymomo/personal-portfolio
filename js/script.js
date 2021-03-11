window.addEventListener("load", () => {
  document.querySelector(".preloader").classList.add("opacity-0");
  setTimeout(() => {
    document.querySelector(".preloader").style.display = "none";
  }, 1000);
});

// Portfolio Item Filter
const filterContainer = document.querySelector(".portfolio-filter");
const filterBtns = document.querySelectorAll(".button-filter");
const totalFilterBtn = filterBtns.length;
const portfolioItems = document.querySelectorAll(".portfolio-item");
const selectZoomItems = document.querySelectorAll(".select-zoom");
const lightboxClose = document.querySelector(".lightbox-close");
const websiteItems = document.querySelectorAll(".website");

let filterValue = "all";

filterBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    filterContainer.querySelector(".active").classList.remove("active");
    this.classList.add("active");
    filterValue = this.getAttribute("data-filter");
    portfolioItems.forEach((item) => {
      if (filterValue === "all") {
        item.classList.add("show");
        item.classList.remove("hide");
        return;
      }
      if (item.getAttribute("data-category") === filterValue) {
        item.classList.add("show");
        item.classList.remove("hide");
      } else {
        item.classList.remove("show");
        item.classList.add("hide");
      }
    });
  });
});

// Portfolio Lightbox
const lightbox = document.querySelector(".lightbox");
const lightboxImg = lightbox.querySelector(".lightbox-img");
const lightboxText = lightbox.querySelector(".caption-text");
const lightboxLink = lightbox.querySelector("a");
let itemIndex;

selectZoomItems.forEach((item, index) => {
  item.addEventListener("click", function () {
    itemIndex = index;
    changeItem();
    toggleLigthbox();
  });
});

const changeItem = () => {
  const imgSrc = selectZoomItems[itemIndex]
    .querySelector("img")
    .getAttribute("src");
  lightboxImg.src = imgSrc;
  lightboxText.innerHTML = selectZoomItems[itemIndex].querySelector(
    "h4"
  ).innerHTML;
  lightboxLink.setAttribute(
    "href",
    selectZoomItems[itemIndex].getAttribute("data-link")
  );
};

const toggleLigthbox = () => {
  lightbox.classList.toggle("open");
};

const prevItem = () => {
  if (filterValue === "all") {
    if (itemIndex === 0) {
      itemIndex = selectZoomItems.length - 1;
    } else {
      itemIndex--;
    }
  }
  if (filterValue === "website") {
    if (itemIndex === 0) {
      itemIndex = websiteItems.length - 1;
    } else {
      itemIndex--;
    }
  }
  if (filterValue === "photoshop") {
    if (itemIndex === websiteItems.length) {
      itemIndex = selectZoomItems.length - 1;
    } else {
      itemIndex--;
    }
  }

  changeItem();
};

const nextItem = () => {
  if (filterValue === "all") {
    if (itemIndex === selectZoomItems.length - 1) {
      itemIndex = 0;
    } else {
      itemIndex++;
    }
  }
  if (filterValue === "website") {
    if (itemIndex === websiteItems.length - 1) {
      itemIndex = 0;
    } else {
      itemIndex++;
    }
  }
  if (filterValue === "photoshop") {
    if (itemIndex === selectZoomItems.length - 1) {
      itemIndex = websiteItems.length;
    } else {
      itemIndex++;
    }
  }
  changeItem();
};

//Close Lightbox
lightbox.addEventListener("click", function (event) {
  if (event.target === lightboxClose || event.target === lightbox) {
    toggleLigthbox();
  }
});

//Aside Navbar
const navTogglerBtn = document.querySelector(".nav-toggler");
const aside = document.querySelector(".aside");
const nav = document.querySelector(".nav");
const navList = nav.querySelectorAll("li");
const allSection = document.querySelectorAll(".section");

const asideSectionTogglerBtn = () => {
  aside.classList.toggle("open");
  navTogglerBtn.classList.toggle("open");
  allSection.forEach((each) => {
    each.classList.toggle("open");
  });
};

navList.forEach((each) => {
  const a = each.querySelector("a");
  a.addEventListener("click", function () {
    navList.forEach((each, index) => {
      allSection[index].classList.remove("back-section");
      if (each.querySelector("a").classList.contains("active")) {
        allSection[index].classList.add("back-section");
      }
      each.querySelector("a").classList.remove("active");
    });
    this.classList.add("active");
    showSection(this);

    if (window.innerWidth < 1200) {
      asideSectionTogglerBtn();
    }
  });
});

const showSection = (el) => {
  allSection.forEach((each) => {
    each.classList.remove("active");
  });
  const target = el.getAttribute("href").split("#")[1];
  document.querySelector("#" + target).classList.add("active");
};

const updateNav = (el) => {
  const target = el.getAttribute("href").split("#")[1];
  navList.forEach((each) => {
    each.querySelector("a").classList.remove("active");
    if (target === each.querySelector("a").getAttribute("href").split("#")[1]) {
      each.querySelector("a").classList.add("active");
    }
  });

  document.querySelector("#" + target).classList.add("active");
};

document.querySelector(".hire-me").addEventListener("click", function () {
  navList.forEach((each, index) => {
    allSection[index].classList.remove("back-section");
    if (each.querySelector("a").classList.contains("active")) {
      allSection[index].classList.add("back-section");
    }
  });
  showSection(this);
  updateNav(this);
});

navTogglerBtn.addEventListener("click", asideSectionTogglerBtn);
