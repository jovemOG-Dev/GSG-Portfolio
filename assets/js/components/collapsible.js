/* Listas retráteis (animação por altura, grid 0fr/1fr): projetos extras e versões anteriores do changelog */
(function(){
  function collapse(btn,panel,txt,openTxt,closedTxt){
    btn.addEventListener("click",function(){
      var open=panel.classList.toggle("is-closed")===false;
      btn.setAttribute("aria-expanded",String(open));
      txt.textContent=open?openTxt:closedTxt;
    });
  }
  var grid=document.getElementById("lista-projetos"),btn=document.getElementById("expandir"),txt=document.getElementById("expandir-txt");
  if(grid&&btn){
    var extras=grid.querySelectorAll(".extra"),pnl=document.createElement("div");
    pnl.className="collapsible is-closed";pnl.id="projetos-extra";
    pnl.innerHTML='<div class="collapsible-in"><div class="grid extra-grid"></div></div>';
    extras.forEach(function(c){pnl.querySelector(".extra-grid").appendChild(c)});
    grid.parentNode.insertBefore(pnl,grid.nextSibling);
    btn.setAttribute("aria-controls","projetos-extra");btn.hidden=false;
    collapse(btn,pnl,txt,"Ver menos","Ver mais projetos");
  }
  var cBtn=document.getElementById("change-toggle"),cBody=document.getElementById("change-body");
  if(cBtn&&cBody)collapse(cBtn,cBody,document.getElementById("change-toggle-txt"),"Ocultar versões anteriores","Ver versões anteriores");
})();
