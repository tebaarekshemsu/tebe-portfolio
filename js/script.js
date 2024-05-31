"use strict";

const MenuIcon = document.querySelector(".menuIcon");
const SideBar = document.querySelector(".SideBar");
const closeBtn = document.querySelector(".closeBtn");
const overLay = document.querySelector(".overlay");
const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const listss = document.querySelectorAll(".links a");

MenuIcon.addEventListener("click", function () {
  SideBar.classList.add("activator");
  overLay.classList.add("activator");
  document.body.style.overflow = "hidden";
});

closeBtn.addEventListener("click", function () {
  SideBar.classList.remove("activator");
  overLay.classList.remove("activator");
  document.body.style.overflow = "auto";
});

overLay.addEventListener("click", function () {
  SideBar.classList.remove("activator");
  overLay.classList.remove("activator");
  document.body.style.overflow = "auto";
});

listss.forEach((items) => {
  items
    .addEventListener("click", function () {
      SideBar.classList.remove("activator");
      overLay.classList.remove("activator");
      document.body.style.overflow = "auto";
    });
});

window.addEventListener("resize", function () {
  location.reload();
});

function enlargeHeading(sectionId) {
  const sect = document.getElementById(sectionId);
  const hlrg = sect.querySelector(".TBEN");
  hlrg.classList.add("enlarge");

  setTimeout(() => {
    hlrg.classList.remove("enlarge");
  }, 1000);
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const tID = this.getAttribute("href").slice(1);
    const tET = document.getElementById(tID);
    if (tET) {
      const yOffset = -30;
      const y = tET.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
      enlargeHeading(tID);
    }
  });
});

const sliderr = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};

sliderr();



document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission

  // Get form data
  const formData = new FormData(this);

  // Send form data using Fetch API
  fetch(this.action, {
    method: this.method,
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      // Display success message
      const successMessage = document.getElementById('successMessage');
      successMessage.style.display = 'inline';
      
      // Clear form fields
      this.reset();

      // Hide success message after 3 seconds
      setTimeout(() => {
        successMessage.style.display = 'none';
      }, 3000);
    } else {
      // Handle the error (optional)
      alert('There was a problem submitting the form.');
    }
  }).catch(error => {
    // Handle the error (optional)
    alert('There was a problem submitting the form.');
  });
});