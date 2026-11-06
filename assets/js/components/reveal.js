/* Revelação ao rolar: só quando há suporte e o usuário não pediu menos movimento */
(function(){
  var rv=document.querySelectorAll(".reveal");
  if("IntersectionObserver" in window&&document.documentElement.classList.contains("js")){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{rootMargin:"0px 0px -8% 0px",threshold:.08});
    rv.forEach(function(el){io.observe(el)});
  }else rv.forEach(function(el){el.classList.add("in")});
})();
