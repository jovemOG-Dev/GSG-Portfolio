/* Conexões: busca, filtros e ordenação */
(function(){
  var grid=document.getElementById("conn-grid");if(!grid)return;
  var cards=[].slice.call(grid.children).filter(function(c){return c.classList.contains("conn-card")});
  var q=document.getElementById("conn-q"),sort=document.getElementById("conn-sort"),
      box=document.getElementById("conn-filters"),count=document.getElementById("conn-count"),
      empty=document.getElementById("conn-empty"),clear=document.getElementById("conn-clear"),
      tools=document.getElementById("conn-tools");
  var col=new Intl.Collator("pt-BR",{sensitivity:"base"}),order={professor:0,colega:1,mentor:2,contato:3};
  function norm(t){return t.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim()}
  var data=cards.map(function(c){return{
    el:c,name:c.querySelector("h3").textContent,key:norm(c.querySelector("h3").textContent),
    rel:c.querySelector(".rel").textContent,
    orgs:[].map.call(c.querySelectorAll(".org"),function(o){return o.textContent}),
    ord:order[c.getAttribute("data-rel")]===undefined?9:order[c.getAttribute("data-rel")]}});
  var sel={rel:{},org:{}};
  function tally(list,fn){var m={};list.forEach(function(d){fn(d).forEach(function(t){m[t]=(m[t]||0)+1})});return m}
  function build(label,kind,counts,keys){
    var g=document.createElement("div");g.className="fgroup";
    var l=document.createElement("span");l.textContent=label;g.appendChild(l);
    keys.forEach(function(t){
      var b=document.createElement("button");b.type="button";b.className="chip";b.setAttribute("aria-pressed","false");
      b.innerHTML=t+"<small>"+counts[t]+"</small>";
      b.addEventListener("click",function(){
        var on=!sel[kind][t];if(on)sel[kind][t]=true;else delete sel[kind][t];
        b.setAttribute("aria-pressed",String(on));apply();
      });
      g.appendChild(b);
    });
    box.appendChild(g);
  }
  var rc=tally(data,function(d){return[d.rel]}),oc=tally(data,function(d){return d.orgs});
  build("Relação","rel",rc,Object.keys(rc).sort(function(a,b){return(order[a.toLowerCase()]||0)-(order[b.toLowerCase()]||0)}));
  if(Object.keys(oc).length)build("Vínculo","org",oc,Object.keys(oc).sort(col.compare));
  function has(o){return Object.keys(o).length>0}
  function apply(){
    var term=norm(q.value),mode=sort.value;
    data.sort(function(a,b){
      if(mode==="za")return col.compare(b.name,a.name);
      if(mode==="rel")return a.ord-b.ord||col.compare(a.name,b.name);
      return col.compare(a.name,b.name);
    });
    var shown=0;
    data.forEach(function(d){
      var ok=(!term||d.key.indexOf(term)>-1)
        &&(!has(sel.rel)||sel.rel[d.rel])
        &&(!has(sel.org)||d.orgs.some(function(o){return sel.org[o]}));
      d.el.hidden=!ok;grid.appendChild(d.el);
      if(ok){d.el.setAttribute("data-c",String(shown%3));shown++}
    });
    count.textContent="Mostrando "+shown+" de "+data.length+" conexões";
    empty.hidden=shown>0;
  }
  q.addEventListener("input",apply);sort.addEventListener("change",apply);
  clear.addEventListener("click",function(){
    q.value="";sel={rel:{},org:{}};
    [].forEach.call(box.querySelectorAll(".chip"),function(b){b.setAttribute("aria-pressed","false")});
    apply();q.focus();
  });
  empty.parentNode.insertBefore(empty,grid.nextSibling);
  tools.hidden=false;box.hidden=false;count.hidden=false;
  apply();
})();
