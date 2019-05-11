const headerHeight = document.getElementById("header").getBoundingClientRect()
  .height;

// Change header bg-color on scroll
window.addEventListener("scroll", function() {
  const windowScrollTop = this.scrollY;
  const menu = document.getElementById("menu");
  if (windowScrollTop > headerHeight - 50) {
    menu.classList.add("bg-secondary");
  } else {
    menu.classList.remove("bg-secondary");
  }
});

// Custom funtion for scroll from top
const scrollTo = (to, duration) => {
  const element = document.scrollingElement || document.documentElement,
    start = element.scrollTop,
    change = to - start,
    startDate = +new Date(),
    // t = current time
    // b = start value
    // c = change in value
    // d = duration
    easeInOutQuad = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    },
    animateScroll = () => {
      const currentDate = +new Date();
      const currentTime = currentDate - startDate;
      element.scrollTop = parseInt(
        easeInOutQuad(currentTime, start, change, duration)
      );
      if (currentTime < duration) {
        requestAnimationFrame(animateScroll);
      } else {
        element.scrollTo = to;
      }
    };
  animateScroll();
};

// get closest element
const closest = (el, fn) => {
  return el && (fn(el) ? el : closest(el.parentNode, fn));
};

const menuList = document.querySelectorAll("ul.menu a");
menuList.forEach(item => {
  item.addEventListener("click", function(e) {
    e.preventDefault();
    const selectedElement = this.getAttribute("href");
    const scrollToElement = document.querySelector(selectedElement).offsetTop;
    scrollTo(scrollToElement, 1000);
  });
});

// naviagate to portfolio section
document.getElementById("btnPortfolio").addEventListener("click", function(e) {
  e.preventDefault;
  const scrollToElement = document.getElementById("portfolio").offsetTop;
  scrollTo(scrollToElement, 1000);
});

document.querySelector("body").addEventListener("click", function(e) {
  const closestEl = closest(e.target, el => {
    return el.className === "top-menu";
  });
  if (closestEl) return;

  document.getElementById("chkShowMenu").checked = false;
});

// animate skills section if in viewport
const checkElementIsInViewPort = () => {
  const windowHeight = window.innerHeight,
    windowTopPosition = window.scrollY,
    windowBottomPosition = windowTopPosition + windowHeight;

  const animationElements = document.querySelectorAll("section:not(#header)");

  animationElements.forEach(el => {
    const elementHeight = el.offsetHeight,
      elementTopPosition = el.offsetTop,
      elementBottomPosition = elementTopPosition + elementHeight;
    //check if the current container is within viewport
    if (
      elementBottomPosition >= windowTopPosition &&
      elementTopPosition <= windowBottomPosition - 20
    ) {
      el.classList.add("animate");
    } else {
      el.classList.remove("animate");
    }
  });
};

window.addEventListener("scroll", checkElementIsInViewPort);
