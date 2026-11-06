/* Terminal da sidebar: a animação de entrada toca só uma vez por carregamento da página */
(function(){
  var term=document.querySelector(".term"),termLast=term&&term.querySelector(".term-body > .a:last-child");
  if(term&&termLast)termLast.addEventListener("animationend",function(e){if(e.target===termLast)term.classList.add("term-done")});
})();
