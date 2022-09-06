const scrollElements = document.querySelectorAll(".js-scroll");

const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) / dividend
  );
};

const elementOutofView = (el) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop >
    (window.innerHeight || document.documentElement.clientHeight)
  );
};

const displayScrollElement = (element) => {
  element.classList.add("scrolled");
};

const hideScrollElement = (element) => {
  element.classList.remove("scrolled");
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 1.25)) {
      displayScrollElement(el);
    } else if (elementOutofView(el)) {
      hideScrollElement(el);
    }
  })
}

window.addEventListener("scroll", () => { 
  handleScrollAnimation();
});

scrollElements.forEach((el) => {
    el.style.opacity = 0
});



const banner = document.querySelector("#banner");
const divider = document.querySelector(".fancydivider");

const tl = new TimelineMax();

tl.fromTo(banner, 1, { height: "0%" }, { height: "70%", ease: Power2.easeInOut });
tl.fromTo(banner, 1, { fontSize: "0vw" }, { fontSize: "20vh", ease: Power2.easeInOut }, "-=0.5");

//TweenMax.set(divider, {xPercent:-50, yPercent:-50, left:"50%", top:"50%"});
tl.fromTo(divider, .1, { opacity: 0 }, { opacity: 1 }, "-=0.5");
tl.fromTo(divider, 1, { width: "0%", x: -50 }, { width: "100%", x: 0, ease: Power2.easeInOut }, "-=0.75");
