(function(){
  // Create overlay DOM once and reuse
  let overlay = null;
  let autoCloseTimer = null;
  let escListenerAttached = false;

  function createOverlay() {
    if (overlay) return overlay;
    overlay = document.createElement('div');
    overlay.className = 'image-popup-overlay';
    overlay.innerHTML = `
      <div class="image-popup-box enter" role="dialog" aria-modal="true">
        <button class="image-popup-close" aria-label="Fermer">&times;</button>
        <img class="image-popup-img" src="" alt="" loading="lazy" />
        <div class="image-popup-caption" aria-hidden="false"></div>
      </div>
    `;

    // Close when clicking outside image-box
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closePopup();
    });

    // Close button
    overlay.querySelector('.image-popup-close').addEventListener('click', (e) => {
      e.stopPropagation();
      closePopup();
    });

    document.body.appendChild(overlay);
    return overlay;
  }

  // Attach ESC listener once globally
  function attachEscListener() {
    if (escListenerAttached) return;
    escListenerAttached = true;
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay && overlay.classList.contains('show')) {
        closePopup();
      }
    });
  }

  function showPopup(src, options = {}){
    if (!src) {
      console.error('showImagePopup: src est obligatoire');
      return;
    }

    const { caption = '', duration = 5000, alt = '' } = options;
    const o = createOverlay();
    const img = o.querySelector('.image-popup-img');
    const cap = o.querySelector('.image-popup-caption');

    // set content
    img.src = src;
    img.alt = alt || caption || 'Image';
    cap.textContent = caption || '';

    // Attach ESC listener once
    attachEscListener();

    // show overlay immediately
    o.classList.add('show');

    // reset timer if present
    if (autoCloseTimer) {
      clearTimeout(autoCloseTimer);
      autoCloseTimer = null;
    }

    if (duration && duration > 0) {
      autoCloseTimer = setTimeout(() => {
        closePopup();
      }, duration);
    }
  }

  function closePopup(){
    if (!overlay) return;
    overlay.classList.remove('show');
    // reset src after transition to free memory
    const img = overlay.querySelector('.image-popup-img');
    if (img) {
      setTimeout(()=>{ img.src = ''; }, 300); // after fade
    }
    if (autoCloseTimer) { clearTimeout(autoCloseTimer); autoCloseTimer = null; }
  }

  // Expose globally
  window.showImagePopup = showPopup;
  window.closeImagePopup = closePopup;

  /**
   * Initialize an automatic popup show behavior.
   * options: { imgPath, caption, duration, delay, oncePerSessionKey }
   */
  function initAutoPopup(options = {}){
    const {
      imgPath = '',
      caption = '',
      duration = 5000,
      delay = 2000,
      oncePerSessionKey = 'popup_shown'
    } = options;

    try {
      if (!imgPath) return; // nothing to do
      if (oncePerSessionKey && sessionStorage.getItem(oncePerSessionKey)) return;

      setTimeout(() => {
        const img = new Image();
        img.onload = function(){
          if (window.showImagePopup) {
            showImagePopup(imgPath, { caption, duration });
            try { if (oncePerSessionKey) sessionStorage.setItem(oncePerSessionKey, '1'); } catch(e){}
          }
        };
        img.onerror = function(){ console.warn('initAutoPopup: image not found', imgPath); };
        img.src = imgPath;
      }, delay);
    } catch(e){ console.error('initAutoPopup error', e); }
  }

  window.initAutoPopup = initAutoPopup;
})();
