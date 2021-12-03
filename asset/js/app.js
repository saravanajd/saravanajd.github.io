// Change header bg-color on scroll
window.addEventListener("scroll", function () {
    const windowScrollTop = this.scrollY;
    const menu = document.getElementById("header");
    if (windowScrollTop > 60) {
        menu.classList.add("bg-header");
    } else {
        menu.classList.remove("bg-header");
    }
});

const menuList = document.querySelectorAll("ul.menu-list a");
menuList.forEach(item => {
  item.addEventListener("click", function(e) {
    // e.preventDefault();
    const selectedElement = this.getAttribute("data-page");
    if(!selectedElement){
        return;
    }
    const scrollToElement = document.querySelector(selectedElement).offsetTop;
    scrollTo({ top: scrollToElement-100, behavior: 'smooth'});
  });
});


// get closest element
const closest = (el, fn) => {
    return el && (fn(el) ? el : closest(el.parentNode, fn));
  };

document.querySelector("body").addEventListener("click", function(e) {
    const closestEl = closest(e.target, el => {
      return el.className === "top-menu";
    });
    if (closestEl) return;
  
    document.getElementById("chkShowMenu").checked = false;
  });