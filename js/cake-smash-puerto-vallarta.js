(function(){'use strict';var header=document.querySelector('[data-header]'),box=document.querySelector('.lightbox'),boxImg=box.querySelector('img'),close=box.querySelector('button'),last;function headerState(){header.classList.toggle('scrolled',scrollY>30)}function shut(){box.classList.remove('open');box.setAttribute('aria-hidden','true');document.body.classList.remove('lock');boxImg.src='';if(last)last.focus()}function track(name,data){if(typeof window.gtag==='function')window.gtag('event',name,data);if(Array.isArray(window.dataLayer))window.dataLayer.push(Object.assign({event:name},data))}addEventListener('scroll',headerState,{passive:true});headerState();document.querySelectorAll('.faq button').forEach(function(btn){btn.addEventListener('click',function(){var item=btn.closest('article'),open=btn.getAttribute('aria-expanded')!=='true';document.querySelectorAll('.faq article.open').forEach(function(x){x.classList.remove('open');x.querySelector('button').setAttribute('aria-expanded','false')});if(open){item.classList.add('open');btn.setAttribute('aria-expanded','true')}})});document.querySelectorAll('[data-lightbox]').forEach(function(btn){btn.addEventListener('click',function(){last=btn;boxImg.src=btn.dataset.lightbox;boxImg.alt=btn.querySelector('img').alt;box.classList.add('open');box.setAttribute('aria-hidden','false');document.body.classList.add('lock');close.focus()})});close.addEventListener('click',shut);box.addEventListener('click',function(e){if(e.target===box)shut()});addEventListener('keydown',function(e){if(e.key==='Escape'&&box.classList.contains('open'))shut()});document.querySelectorAll('.wa').forEach(function(a){a.addEventListener('click',function(){var d={cta_location:a.dataset.cta||'unknown',link_url:a.href};track('whatsapp_click',d);track('cta_click',Object.assign({cta_type:'whatsapp'},d))})});document.querySelector('[data-year]').textContent=new Date().getFullYear()})();

(function(){
  'use strict';
  var reviews=[
    {name:'Claudia Judith Rodarte Madera',text:'Si buscas una opción para la primera sesión de tu hijo este es el lugar indicado. La atención es súper amable, tuvieron toda la paciencia con mi bebé y súper graciosos les sacaron una sonrisa. Además la decoración increíble. Recomendamos al 100% no se van a arrepentir.',rating:5,source:'Google',reviewUrl:''},
    {name:'Haleida Marysol Cobian Hernandez',text:'Excelente atención, muy amables, pacientes con nuestro bebe, una experiencia única, ahora tenemos recuerdos tan bonitos de nuestro baby cowboy en su primer año 🤩🤩🤩 100% Recomendados✨',rating:5,source:'Google',reviewUrl:''},
    {name:'Leslie Astrid Galvez Solis',text:'Me encantó la sesión con mi bebé de un año. Y fue una experiencia muy linda porque el fotógrafo además fue muy empático con mi niña y atento.',rating:5,source:'Google',reviewUrl:''},
    {name:'Edith Valenzuela',text:'Recomendado, tiene mucha paciencia con sus clientecitas!! 💗 Y el trabajo es hermoso 😍',rating:5,source:'Google',reviewUrl:''},
    {name:'Yusaleth Ayala',text:'Muy bonitas las fotos y el procedimiento de todo me encantaron 🥰 gracias por recibirnos en su estudio',rating:5,source:'Google',reviewUrl:''}
  ];
  var googleReviewsUrl='';
  var track=document.querySelector('[data-reviews-track]');
  var previous=document.querySelector('[data-reviews-prev]');
  var next=document.querySelector('[data-reviews-next]');
  var status=document.querySelector('[data-reviews-status]');
  var googleLink=document.querySelector('[data-google-reviews-link]');
  if(!track)return;
  reviews.forEach(function(review,index){
    var card=document.createElement('article');
    card.className='review-card'+(index===0?' review-card--featured':'');
    var label=index===0?'<p class="review-card__label">Sesión de primer cumpleaños</p>':'';
    var link=review.reviewUrl?'<a class="review-card__link" href="'+review.reviewUrl+'" target="_blank" rel="noopener">Ver reseña ↗</a>':'';
    card.innerHTML=label+'<p class="review-card__stars" aria-label="'+review.rating+' de 5 estrellas">'+ '★'.repeat(review.rating)+'</p><blockquote>“'+review.text+'”</blockquote><div class="review-card__author"><strong>'+review.name+'</strong><span>Reseña en '+review.source+'</span>'+link+'</div>';
    track.appendChild(card);
  });
  if(googleReviewsUrl){googleLink.href=googleReviewsUrl;googleLink.hidden=false}
  function cardsVisible(){return innerWidth>=1100?3:innerWidth>=700?2:1}
  function activeIndex(){var first=track.querySelector('.review-card');return first?Math.round(track.scrollLeft/(first.offsetWidth+parseFloat(getComputedStyle(track).columnGap||0))):0}
  function update(){var index=Math.max(0,Math.min(reviews.length-1,activeIndex()));status.textContent=(index+1)+' / '+reviews.length;previous.disabled=index===0;next.disabled=index>=reviews.length-cardsVisible()}
  function move(direction){var card=track.querySelector('.review-card');if(card)track.scrollBy({left:direction*(card.offsetWidth+parseFloat(getComputedStyle(track).columnGap||0)),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})}
  previous.addEventListener('click',function(){move(-1)});next.addEventListener('click',function(){move(1)});
  track.addEventListener('keydown',function(event){if(event.key==='ArrowLeft'){event.preventDefault();move(-1)}if(event.key==='ArrowRight'){event.preventDefault();move(1)}});
  track.addEventListener('scroll',update,{passive:true});addEventListener('resize',update,{passive:true});update();
})();

(function(){
  'use strict';
  var heroButton=document.querySelector('.hero .wa');
  var stickyButton=document.querySelector('.sticky');
  if(!heroButton||!stickyButton||!('IntersectionObserver' in window))return;
  var observer=new IntersectionObserver(function(entries){
    stickyButton.classList.toggle('sticky--hidden',entries[0].isIntersecting);
  },{threshold:.2});
  observer.observe(heroButton);
})();
