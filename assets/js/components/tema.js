/* Botão de alternar tema claro/escuro */
(function(){
  var root=document.documentElement,btns=document.querySelectorAll(".theme-btn");
  function label(){var d=root.getAttribute("data-theme")==="dark";btns.forEach(function(b){b.setAttribute("aria-label",d?"Ativar tema claro":"Ativar tema escuro")})}
  function set(t,save){root.setAttribute("data-theme",t);if(save){try{localStorage.setItem("theme",t)}catch(e){}}label()}
  btns.forEach(function(b){b.addEventListener("click",function(){set(root.getAttribute("data-theme")==="dark"?"light":"dark",true)})});
  try{matchMedia("(prefers-color-scheme: dark)").addEventListener("change",function(e){var s;try{s=localStorage.getItem("theme")}catch(x){}if(!s)set(e.matches?"dark":"light",false)})}catch(e){}
  label();
})();
