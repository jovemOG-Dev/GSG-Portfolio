/* Trajetória: preenche o percurso conforme a rolagem */
(function(){
  var spine=document.getElementById("spine");
  if(spine){
    var nodes=spine.querySelectorAll(".node");
    function fill(){
      var r=spine.getBoundingClientRect(),vh=window.innerHeight,mark=vh*.6;
      var progress=Math.max(0,Math.min(1,(mark-r.top)/r.height)).toFixed(3);
      spine.style.setProperty("--p",progress);
      if(spine.parentElement)spine.parentElement.style.setProperty("--p",progress);
      nodes.forEach(function(n){n.classList.toggle("on",n.getBoundingClientRect().top<mark)});
    }
    window.addEventListener("scroll",fill,{passive:true});window.addEventListener("resize",fill);
    window.addEventListener("hashchange",function(){setTimeout(fill,60)});
    fill();
  }
})();
