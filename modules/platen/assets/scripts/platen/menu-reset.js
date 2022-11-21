(function() {
  var menu = document.querySelector("aside .platen-menu-content");
  addEventListener("beforeunload", function(event) {
      localStorage.setItem("menu.scrollTop", menu.scrollTop);
  });
  menu.scrollTop = localStorage.getItem("menu.scrollTop");
})();
