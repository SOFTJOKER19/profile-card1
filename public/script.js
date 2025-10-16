// script.js — flip behavior, keyboard accessibility, gallery handling, live time
(function(){
  const card = document.querySelector('[data-testid="test-profile-card"]');
  const inner = document.getElementById('cardInner');
  const flipBtn = document.getElementById('flipBtn');
  const closeBtn = document.getElementById('closeBtn');
  const galleryMain = document.getElementById('galleryMain');
  const galleryThumbs = document.getElementById('galleryThumbs');
  const timeEl = document.querySelector('[data-testid="test-user-time"]');

  // Update time in milliseconds
  function updateTime(){ if(timeEl) timeEl.textContent = Date.now(); }
  updateTime();
  setInterval(updateTime, 1000);

  // Toggle flip
  function setFlipped(flipped){
    if(flipped){
      card.classList.add('is-flipped');
      flipBtn.setAttribute('aria-expanded','true');
      // set aria-hidden attributes
      document.querySelector('.card__face--front').setAttribute('aria-hidden','true');
      document.querySelector('.card__face--back').setAttribute('aria-hidden','false');
    } else {
      card.classList.remove('is-flipped');
      flipBtn.setAttribute('aria-expanded','false');
      document.querySelector('.card__face--front').setAttribute('aria-hidden','false');
      document.querySelector('.card__face--back').setAttribute('aria-hidden','true');
      flipBtn.focus();
    }
  }

  // Click handlers
  flipBtn.addEventListener('click', function(e){ e.stopPropagation(); setFlipped(true); });
  closeBtn.addEventListener('click', function(e){ e.stopPropagation(); setFlipped(false); });
  // allow clicking the card front to open
  card.addEventListener('click', function(e){
    const isFlipped = card.classList.contains('is-flipped');
    setFlipped(!isFlipped);
  });

  // keyboard accessibility: Enter toggles, Esc closes when flipped
  card.addEventListener('keydown', function(e){
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      const isFlipped = card.classList.contains('is-flipped');
      setFlipped(!isFlipped);
    }
    if(e.key === 'Escape'){
      setFlipped(false);
    }
  });

  // Prevent clicks inside back content from flipping back unintentionally
  inner.addEventListener('click', function(e){ e.stopPropagation(); });

  // Gallery thumbs initialization
  const thumbs = Array.from(galleryThumbs.querySelectorAll('.thumb'));
  thumbs.forEach((btn, i) => {
    const src = btn.getAttribute('data-src');
    if(src) btn.style.backgroundImage = `url(${src})`;
    btn.addEventListener('click', function(e){
      e.stopPropagation();
      // update main image
      galleryMain.innerHTML = '<img src="' + src + '" alt="Profile scene ' + (i+1) + '">';
      thumbs.forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
    });
    // mark first active
    if(i===0) btn.classList.add('active');
  });

})();