/* Roteador por hash: troca de views (home, páginas, posts), transições, scroll-spy do menu e título da aba. Deve ser o último script a carregar. */
(function(){
  var links=document.querySelectorAll(".menu a,.drawer a"),
      home=document.getElementById("home"),pages=document.getElementById("pages"),postView=document.getElementById("post-view"),
      sections=pages.querySelectorAll(".section"),posts=postView.querySelectorAll(".post"),
      baseTitle=document.title,ready=false,shown=false,timer=null,
      calm=window.matchMedia("(prefers-reduced-motion: reduce)"),
      STAGGER=".jump li,.grid>*,.stack>*,.timeline>*,.node";
  var routeActive="#/",spyLock=0,spyTimer=null,footEl=document.getElementById("contato");
  function paint(r){links.forEach(function(l){l.classList.toggle("active",l.getAttribute("href")===r)})}
  function spy(){
    var de=document.documentElement,
        inFoot=footEl&&window.scrollY>0&&de.scrollHeight>window.innerHeight+20&&footEl.getBoundingClientRect().top<window.innerHeight*.55;
    var r=routeActive;
    if(!inFoot&&!home.hidden&&Date.now()>spyLock){
      var about=document.getElementById("sobre-mim");
      if(about)r=about.getBoundingClientRect().top<window.innerHeight*.45?"#/sobre-mim":"#/";
    }
    paint(inFoot?"#contato":r);
  }
  function setActive(r){routeActive=r;spyLock=Date.now()+900;spy();clearTimeout(spyTimer);spyTimer=setTimeout(spy,950)}
  window.addEventListener("scroll",spy,{passive:true});window.addEventListener("resize",spy);
  function current(){return !home.hidden?home:(!pages.hidden?pages:postView)}
  function enter(view){
    if(calm.matches)return;
    view.querySelectorAll(STAGGER).forEach(function(el){
      el.style.setProperty("--i",Math.min(Array.prototype.indexOf.call(el.parentNode.children,el),8));
    });
    view.classList.remove("is-entering");void view.offsetWidth;view.classList.add("is-entering");
    setTimeout(function(){view.classList.remove("is-entering")},1200);
  }
  function swap(view,target,title,active,keepScroll,after,animate){
    home.hidden=view!==home;pages.hidden=view!==pages;postView.hidden=view!==postView;
    sections.forEach(function(x){x.hidden=(x!==target)});
    posts.forEach(function(x){x.hidden=(x!==target)});
    document.title=title?title+" · Gabriel Silva Gomes":baseTitle;
    setActive(active);
    if(!keepScroll)window.scrollTo({top:0,behavior:"instant"});
    if(animate)enter(view);
    if(after)after();
    spy();
  }
  function show(view,target,title,active,keepScroll,after){
    clearTimeout(timer);
    var cur=current(),stay=(view===cur&&view===home);
    cur.classList.remove("is-leaving");
    setActive(active);
    if(!shown||calm.matches||stay){shown=true;swap(view,target,title,active,keepScroll,after,!stay);return}
    cur.classList.add("is-leaving");
    timer=setTimeout(function(){cur.classList.remove("is-leaving");swap(view,target,title,active,keepScroll,after,true)},170);
  }
  function route(){
    var h=location.hash,m,t,first=!ready;
    if(h&&h.indexOf("#/")!==0&&ready)return;
    ready=true;
    if((m=h.match(/^#\/blog\/([\w-]+)$/))&&(t=document.getElementById("post-"+m[1])))return show(postView,t,t.getAttribute("data-title"),"#/blog");
    if(h==="#/conexoes"&&(t=document.getElementById("page-conexoes")))return show(postView,t,t.getAttribute("data-title"),"#/sobre-mim");
    if(h==="#/simulados"&&(t=document.getElementById("page-simulados")))return show(postView,t,t.getAttribute("data-title"),"#/projetos");
    if((m=h.match(/^#\/(sobre-mim|changelog)$/))){
      t=document.getElementById(m[1]);
      return show(home,null,"","#/",!home.hidden,function(){if(t)window.requestAnimationFrame(function(){t.scrollIntoView({behavior:"smooth",block:"start"})})});
    }
    if((m=h.match(/^#\/(blog|projetos|tecnologias|trajetoria)$/))&&(t=document.getElementById(m[1])))return show(pages,t,t.getAttribute("data-title"),h);
    show(home,null,"","#/",first&&h&&h.indexOf("#/")!==0);
  }
  links.forEach(function(l){l.addEventListener("click",function(){
    var href=l.getAttribute("href"),m;
    if(href!==location.hash)return;
    if((m=href.match(/^#\/(sobre-mim|changelog)$/))){
      var target=document.getElementById(m[1]);
      if(target)target.scrollIntoView({behavior:"smooth",block:"start"});
    }else window.scrollTo({top:0,behavior:"smooth"});
  })});

  document.addEventListener("click",function(e){
    var a=e.target.closest&&e.target.closest('a[href="#contato"],a[href="#topo"]');
    if(!a)return;
    e.preventDefault();
    var el=document.getElementById(a.getAttribute("href").slice(1));
    if(el)el.scrollIntoView();
  });
  window.addEventListener("hashchange",route);
  route();
})();
