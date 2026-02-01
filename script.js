const slides = Array.from(document.querySelectorAll(".slide"));
const title = document.getElementById("sliderTitle");
const count = document.getElementById("sliderCount");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const form = document.getElementById("bookingForm");
const formNote = document.getElementById("formNote");
const slider = document.querySelector(".slider");
const slidesContainer = document.querySelector(".slides");
const menu = document.querySelector(".menu");
const menuButton = document.getElementById("menuButton");
const menuPanel = document.getElementById("menuPanel");
const reviewSlider = document.querySelector(".review-slider");
const reviewSlidesContainer = document.querySelector(".review-slides");
const reviewSlides = Array.from(document.querySelectorAll(".review-slide"));
const reviewPrev = document.getElementById("reviewPrev");
const reviewNext = document.getElementById("reviewNext");
const reviewCount = document.getElementById("reviewCount");

let current = 0;
let timer;
let controlsTimer;
let reviewIndex = 0;
let reviewTimer;
let reviewControlsTimer;

const updateSlider = (index) => {
  slides.forEach((slide, i) => {
    slide.classList.toggle("is-active", i === index);
  });

  if (title) {
    const label = slides[index].dataset.title || "Featured vehicle";
    title.textContent = label;
  }
  count.textContent = `${String(index + 1).padStart(2, "0")} / ${String(
    slides.length
  ).padStart(2, "0")}`;
};

const move = (direction) => {
  current = (current + direction + slides.length) % slides.length;
  updateSlider(current);
};

const resetTimer = () => {
  clearInterval(timer);
  timer = setInterval(() => move(1), 3000);
};

const showControls = () => {
  if (!slider) {
    return;
  }
  slider.classList.add("show-controls");
  clearTimeout(controlsTimer);
  controlsTimer = setTimeout(() => slider.classList.remove("show-controls"), 2500);
};

if (prev && next) {
  prev.addEventListener("click", () => {
    showControls();
    move(-1);
    resetTimer();
  });
  next.addEventListener("click", () => {
    showControls();
    move(1);
    resetTimer();
  });
}

if (slidesContainer) {
  slidesContainer.addEventListener("pointerdown", showControls);
}

const updateReviewSlider = (index) => {
  if (!reviewSlides.length) {
    return;
  }
  reviewSlides.forEach((slide, i) => {
    slide.classList.toggle("is-active", i === index);
  });
  if (reviewCount) {
    reviewCount.textContent = `${String(index + 1).padStart(2, "0")} / ${String(
      reviewSlides.length
    ).padStart(2, "0")}`;
  }
  if (reviewSlidesContainer && reviewSlides[index]) {
    reviewSlidesContainer.style.height = `${reviewSlides[index].offsetHeight}px`;
  }
};

const moveReview = (direction) => {
  reviewIndex = (reviewIndex + direction + reviewSlides.length) % reviewSlides.length;
  updateReviewSlider(reviewIndex);
};

const resetReviewTimer = () => {
  clearInterval(reviewTimer);
  reviewTimer = setInterval(() => moveReview(1), 6000);
};

const showReviewControls = () => {
  if (!reviewSlider) {
    return;
  }
  reviewSlider.classList.add("show-controls");
  clearTimeout(reviewControlsTimer);
  reviewControlsTimer = setTimeout(() => reviewSlider.classList.remove("show-controls"), 2500);
};

if (reviewPrev && reviewNext && reviewSlides.length) {
  reviewPrev.addEventListener("click", () => {
    showReviewControls();
    moveReview(-1);
    resetReviewTimer();
  });
  reviewNext.addEventListener("click", () => {
    showReviewControls();
    moveReview(1);
    resetReviewTimer();
  });
}

if (reviewSlidesContainer && reviewSlides.length) {
  reviewSlidesContainer.addEventListener("pointerdown", showReviewControls);
}

if (menu && menuButton && menuPanel) {
  const closeMenu = () => {
    menu.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  };

  menuButton.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  menuPanel.addEventListener("click", (event) => {
    if (event.target instanceof HTMLElement && event.target.matches("a")) {
      closeMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (!menu.contains(event.target)) {
      closeMenu();
    }
  });
}

updateSlider(current);
resetTimer();

if (reviewSlides.length) {
  updateReviewSlider(reviewIndex);
  resetReviewTimer();
  window.addEventListener("resize", () => updateReviewSlider(reviewIndex));
}

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    formNote.textContent = "Bedankt. Uw afspraakverzoek is ontvangen. We bevestigen binnen 24 uur.";
    form.reset();
  });
}
