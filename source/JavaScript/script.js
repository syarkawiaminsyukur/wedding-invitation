simplyCountdown(".simply-countdown", {
  year: 2024, // required
  month: 8, // required
  day: 14, // required
  hours: 8, // Default is 0 [0-23] integer
  words: {
    //words displayed into the countdown
    days: { singular: "hari", plural: "hari" },
    hours: { singular: "jam", plural: "jam" },
    minutes: { singular: "menit", plural: "menit" },
    seconds: { singular: "detik", plural: "detik" },
  },
  enableUtc: false,
  onEnd: function () {
    // your code
    return;
  },
});

const stickyTop = document.querySelector(".sticky-top");
const offcanvas = document.querySelector(".offcanvas");
const rootElement = document.querySelector(":root");
const btnLoading = document.querySelector(".btn-loading");
const btnKirim = document.querySelector(".btn-kirim");

offcanvas.addEventListener("show.bs.offcanvas", function () {
  stickyTop.style.overflow = "visible";
});

offcanvas.addEventListener("hidden.bs.offcanvas", function () {
  stickyTop.style.overflow = "hidden";
});

function disableScroll() {
  scrollTop = window.scrollY || document.documentElement.scrollTop;
  scrollLeft = window.scrollX || document.documentElement.scrollLeft;

  window.onscroll = function () {
    window.scrollTo(screenTop, scrollLeft);
  };

  rootElement.style.scrollBehavior = "auto";
}

function enableScroll() {
  window.onscroll = function () {};
  rootElement.style.scrollBehavior = "smooth";
  localStorage.setItem("opened", "true");
}

disableScroll();

const clickEnableScroll = document.querySelector(".enable-scroll");
clickEnableScroll.addEventListener("click", function () {
  enableScroll();
});

if (localStorage.getItem("opened")) {
  enableScroll();
}

window.addEventListener("load", function () {
  const form = document.getElementById("my-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = new FormData(form);
    const action = e.target.action;
    btnLoading.classList.toggle("d-none");
    btnKirim.classList.toggle("d-none");
    fetch(action, {
      method: "POST",
      body: data,
    }).then(() => {
      btnLoading.classList.toggle("d-none");
      btnKirim.classList.toggle("d-none");
      alert("Konfirmasi kehadiran berhasil terkirim!");
      form.reset();
    });
  });
});
