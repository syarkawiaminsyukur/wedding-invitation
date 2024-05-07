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
const audioIcon = document.querySelector(".audio-icon-wrapper i");
const audioIconWrapper = document.querySelector(".audio-icon-wrapper");
const song = document.querySelector("#song");
let isPlay = false;

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
  // localStorage.setItem("opened", "true");
  playAudio();
}

function playAudio() {
  song.volume = 0.5;
  audioIconWrapper.style.display = "flex";
  song.play();
  isPlay = true;
}

audioIconWrapper.onclick = function () {
  if (isPlay) {
    song.pause();
    audioIcon.classList.remove("bi-disc");
    audioIcon.classList.add("bi-pause-circle");
  } else {
    song.play();
    audioIcon.classList.add("bi-disc");
    audioIcon.classList.remove("bi-pause-circle");
  }

  isPlay = !isPlay;
};

const clickEnableScroll = document.querySelector(".enable-scroll");
clickEnableScroll.addEventListener("click", function () {
  enableScroll();
});

// if (localStorage.getItem("opened")) {
//   enableScroll();
// }

disableScroll();

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

const urlParams = new URLSearchParams(window.location.search);
const nama = urlParams.get("n") || "";
const pronaun = urlParams.get("p") || "Bapak/Ibu/Saudara/i";
const namaContainer = document.querySelector(".hero h4 span");

namaContainer.innerText = `${pronaun} ${nama},`.replace(/ ,$/, ",");
document.querySelector("#Nama").value = nama;
