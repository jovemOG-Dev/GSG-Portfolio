/* Disco do card "Ouvindo agora": gira devagar e acelera no hover, continuando do ângulo atual */
(function(){
  var disc=document.querySelector(".vinyl"),musicCard=document.querySelector(".more-music");
  if(disc&&musicCard&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches){
    var ang=0,spd=360/14,SLOW=360/14,FAST=360/1.8,target=SLOW,last=null,onscreen=true,raf=0;
    function tick(t){
      raf=0;
      if(last===null)last=t;
      var dt=Math.min((t-last)/1000,.05);last=t;
      spd+=(target-spd)*(1-Math.exp(-dt*5));
      ang=(ang+spd*dt)%360;
      disc.style.transform="rotate("+ang.toFixed(2)+"deg)";
      if(onscreen&&!document.hidden)raf=requestAnimationFrame(tick);else last=null;
    }
    function run(){if(!raf)raf=requestAnimationFrame(tick)}
    function fast(on){target=on?FAST:SLOW}
    musicCard.addEventListener("mouseenter",function(){fast(true)});
    musicCard.addEventListener("mouseleave",function(){fast(false)});
    musicCard.addEventListener("focus",function(){fast(true)});
    musicCard.addEventListener("blur",function(){fast(false)});
    if("IntersectionObserver" in window)new IntersectionObserver(function(es){onscreen=es[0].isIntersecting;if(onscreen)run()}).observe(musicCard);
    document.addEventListener("visibilitychange",function(){if(!document.hidden)run()});
    run();
  }
})();
