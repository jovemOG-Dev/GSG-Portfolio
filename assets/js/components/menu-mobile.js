/* Menu mobile (drawer): abre/fecha por botão, Esc, clique em link e ao ampliar a tela */
(function(){
  var toggle=document.getElementById("toggle"),drawer=document.getElementById("drawer");
  function setMenu(o){drawer.classList.toggle("open",o);toggle.setAttribute("aria-expanded",String(o));toggle.textContent=o?"Fechar":"Menu"}
  toggle.addEventListener("click",function(){setMenu(!drawer.classList.contains("open"))});
  drawer.querySelectorAll("a").forEach(function(a){a.addEventListener("click",function(){setMenu(false)})});
  document.addEventListener("keydown",function(e){if(e.key==="Escape")setMenu(false)});
  window.addEventListener("resize",function(){if(window.innerWidth>1000)setMenu(false)});
})();
