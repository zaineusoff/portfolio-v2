/* No framework or external scripts needed for local interactions. */
(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const menu = $('.menu-toggle');
  const nav = $('#navigation');
  const mobile = window.matchMedia('(max-width: 760px)');
  function toggleMenu(open, returnFocus = false) {
    nav.classList.toggle('is-open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    if (returnFocus) menu.focus();
  }
  menu.addEventListener('click', () => toggleMenu(menu.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', (event) => { if (event.target.closest('a')) toggleMenu(false); });
  document.addEventListener('pointerdown', (event) => {
    if (menu.getAttribute('aria-expanded') === 'true' && !event.target.closest('.site-header')) toggleMenu(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') toggleMenu(false, true);
  });
  if (mobile.addEventListener) mobile.addEventListener('change', () => toggleMenu(false));
  else if (mobile.addListener) mobile.addListener(() => toggleMenu(false));
  // Preserve direct anchors, update navigation on scroll without intercepting native links.
  const navLinks = $$('[data-nav]');
  const sections = navLinks.map(link => document.getElementById(link.hash.slice(1)));
  let scheduled = false;
  function updateActive() {
    const mark = $('.site-header').getBoundingClientRect().height + 100;
    let active = null;
    sections.forEach(section => { if (section && section.getBoundingClientRect().top <= mark) active = section.id; });
    navLinks.forEach(link => {
      if (link.hash === '#' + active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    scheduled = false;
  }
  function queueActive() { if (!scheduled) { scheduled = true; requestAnimationFrame(updateActive); } }
  window.addEventListener('scroll', queueActive, {passive: true});
  window.addEventListener('resize', queueActive, {passive: true});
  updateActive();
  // Keep the original remote image, with a local fallback if the provider fails.
  $$('img[data-fallback]').forEach(img => {
    function fallback() { if (img.dataset.fallback) { img.src = img.dataset.fallback; img.alt = 'At a workstation'; delete img.dataset.fallback; } }
    img.addEventListener('error', fallback);
    if (img.complete && !img.naturalWidth) fallback();
  });
  // Native dialog supports focus trapping and Escape on current desktop/mobile browsers.
  const dialog = $('#site-dialog');
  const dialogBody = $('#dialog-body');
  const dialogHeading = $('#dialog-heading');
  const dialogLabel = $('#dialog-label');
  const closeButton = $('.dialog-close', dialog);
  let opener = null;
  const hasDialog = typeof dialog.showModal === 'function';
  function showDialog(title, label, source, video) {
    opener = source;
    dialogHeading.textContent = title;
    dialogLabel.textContent = label;
    dialog.classList.toggle('is-video', video);
    dialog.showModal();
    dialog.scrollTop = 0;
    document.body.classList.add('dialog-open');
    closeButton.focus();
  }
  if (hasDialog) {
    $$('[data-case]').forEach(link => link.addEventListener('click', event => {
      const detail = document.getElementById(link.dataset.case);
      if (!detail || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const content = $('.case-detail', detail);
      dialogBody.replaceChildren(content.cloneNode(true));
      showDialog($('summary', detail).textContent, 'Marketing / Case study', link, false);
    }));
    $$('[data-video]').forEach(link => link.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const container = document.createElement('div');
      container.className = 'video-embed';
      const frame = document.createElement('iframe');
      frame.src = link.dataset.video;
      frame.title = link.dataset.title;
      frame.allow = 'autoplay; encrypted-media; fullscreen; picture-in-picture';
      frame.setAttribute('allowfullscreen', '');
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      container.append(frame);
      const fallback = document.createElement('a');
      fallback.className = 'video-fallback';
      fallback.href = link.href;
      fallback.target = '_blank';
      fallback.rel = 'noopener noreferrer';
      fallback.textContent = 'Open the original video on ' + (link.href.includes('youtube') ? 'YouTube' : 'Vimeo') + ' ↗';
      dialogBody.replaceChildren(container, fallback);
      showDialog(link.dataset.title, 'Creative studio / Video', link, true);
    }));
    closeButton.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
    dialog.addEventListener('close', () => {
      dialogBody.replaceChildren(); // Stops playback and removes third-party frame.
      document.body.classList.remove('dialog-open');
      if (opener) { opener.focus({preventScroll: true}); opener = null; }
    });
  } else {
    $('#case-library').style.display = 'grid';
    $$('[data-case]').forEach(link => link.addEventListener('click', () => {
      const detail = document.getElementById(link.dataset.case);
      if (detail) detail.open = true;
    }));
  }
  // Static, illustrative simulation. No personal information, external calls or live ride bookings.
  const stages = [
    {step:'STEP 01 / REQUEST',title:'Where to?',sub:'Try a sample passenger journey.',label:'Sample trip',info:'Not a real booking',action:'Request sample ride'},
    {step:'STEP 02 / OFFER',title:'You have an offer.',sub:'A simulated driver has responded.',label:'Sample fare',info:'RM8.50',action:'Accept sample offer'},
    {step:'STEP 03 / MATCH',title:'Ride matched.',sub:'Your sample driver is on the way.',label:'Demo status',info:'Driver assigned',action:'Complete sample ride'},
    {step:'STEP 04 / COMPLETE',title:'Trip complete.',sub:'You have completed the demo flow.',label:'Demo status',info:'Completed',action:'Try again'}
  ];
  let stage = 0;
  const action = $('#demo-action');
  function renderDemo(announce) {
    const data = stages[stage];
    $('#demo-step').textContent = data.step;
    $('#demo-title').textContent = data.title;
    $('#demo-sub').textContent = data.sub;
    $('#demo-info span').textContent = data.label;
    $('#demo-info strong').textContent = data.info;
    action.firstChild.textContent = data.action + ' ';
    $$('.demo-progress span').forEach((bar, i) => bar.classList.toggle('current', i <= stage));
    if (announce) $('#demo-announcement').textContent = data.step + '. ' + data.title + ' ' + data.sub;
  }
  action.addEventListener('click', () => { stage = (stage + 1) % stages.length; renderDemo(true); });
  $('#demo-reset').addEventListener('click', () => { stage = 0; renderDemo(true); });
  renderDemo(false);
})();
