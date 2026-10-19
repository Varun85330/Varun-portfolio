const PRODUCTS = [
  {category:'PLC',name:'Siemens S7-1200 PLC & modules',models:'S7-1200',description:'PLC family and modules listed in the published product range.'},
  {category:'PLC',name:'Siemens S7-1500 PLC & modules',models:'S7-1500',description:'PLC family and modules listed in the published product range.'},
  {category:'PLC',name:'Siemens S7-300 PLC & modules',models:'S7-300',description:'PLC family listed in the published product range.'},
  {category:'PLC',name:'Siemens ET 200 systems',models:'ET 200S · ET 200SP',description:'Distributed I/O system families listed in the published product range.'},
  {category:'PLC',name:'Siemens S7-200 SMART PLC & modules',models:'S7-200 SMART',description:'PLC family and modules listed in the published product range.'},
  {category:'PLC',name:'Siemens S7-400 PLC & modules',models:'S7-400',description:'PLC family and modules listed in the published product range.'},
  {category:'PLC',name:'Siemens LOGO! PLC & modules',models:'LOGO!',description:'PLC family and modules listed in the published product range.'},
  {category:'AC Drive',name:'Siemens SINAMICS G220',models:'G220',description:'AC drive family listed in the published product range.'},
  {category:'AC Drive',name:'Siemens SINAMICS G120C',models:'G120C',description:'AC drive family listed in the published product range.'},
  {category:'AC Drive',name:'Siemens SINAMICS G120 240-2',models:'G120 240-2',description:'AC drive family listed in the published product range.'},
  {category:'AC Drive',name:'Siemens SINAMICS G20X & G120XA',models:'G20X · G120XA',description:'Drive families listed in the published product range.'},
  {category:'AC Drive',name:'Siemens SINAMICS G130 modules & cabinet',models:'G130',description:'Power modules and value cabinet listed in the published product range.'},
  {category:'AC Drive',name:'Siemens SINAMICS G110 inverter',models:'G110',description:'Inverter family listed in the published product range.'},
  {category:'AC Drive',name:'Siemens SINAMICS G110D & G120D',models:'G110D · G120D',description:'Drive families listed in the published product range.'},
  {category:'Servo Drive',name:'Siemens S120 control & drive components',models:'Control unit · CF cards · DCC',description:'S120 control unit, CF cards, licences, DCC editors and modules listed online.'},
  {category:'Servo Drive',name:'Siemens S120 line & motor modules',models:'Basic · Active · Smart · Single / Double motor',description:'S120 power and line modules listed in the published product range.'},
  {category:'Servo Drive',name:'SIMOTICS motors',models:'1FK2 · 1FK7 · 1PH8',description:'SIMOTICS motor families listed in the published product range.'},
  {category:'Servo Drive',name:'Servo motors & cables',models:'1F6 · PROFINET · Encoder · Power · I/O',description:'1F6 servo motors and connection products listed online.'},
  {category:'HMI',name:'SIMATIC Basic Panels',models:'2nd Generation · Starter Kits',description:'SIMATIC Basic Panel families and starter kits listed online.'},
  {category:'HMI',name:'SIMATIC Comfort & Mobile Panels',models:'Comfort · Mobile',description:'SIMATIC Comfort and Mobile Panel families listed online.'},
  {category:'HMI',name:'SIMATIC HMI Key Panels',models:'Key Panels',description:'HMI Key Panels listed in the published product range.'},
  {category:'HMI',name:'SIMATIC Unified Panels',models:'Unified',description:'Unified Panel family listed in the published product range.'},
  {category:'HMI',name:'SIMATIC IOT & memory products',models:'IOT 2000 · SD Memory Card',description:'SIMATIC IOT 2000 and SD memory cards listed online.'},
  {category:'SCADA and IPC',name:'SIMATIC IPC 627 & IPC 427',models:'IPC 627 · IPC 427',description:'SIMATIC industrial PC series listed in the published product range.'},
  {category:'SCADA and IPC',name:'SIMATIC Industrial Flat Panel',models:'IFP',description:'Industrial flat panel family listed in the published product range.'},
  {category:'SCADA and IPC',name:'TIA Portal WinCC Runtime',models:'Runtime Advanced · Runtime Professional',description:'WinCC Runtime software listed in the published product range.'},
  {category:'SCADA and IPC',name:'TIA Portal software',models:'Recipes & data logging · Step 7 Basic / Professional',description:'TIA Portal software products listed in the published product range.'},
  {category:'DCS',name:'PCS 7',models:'PCS 7',description:'PCS 7 distributed control system listed in the published product range.'},
  {category:'Control Panel',name:'PLC control panels',models:'PLC',description:'PLC panels listed in the published product range.'},
  {category:'Control Panel',name:'Drive control panels',models:'Drive · G130 Drive Panel',description:'Drive and G130 drive panels listed in the published product range.'},
  {category:'PCC MCC',name:'Starter panels',models:'Starter',description:'Starter panel category listed in the published product range.'},
  {category:'PCC MCC',name:'Soft starter panels',models:'Soft Starter',description:'Soft starter panel category listed in the published product range.'},
  {category:'PCC MCC',name:'Star-delta panels',models:'Star Delta',description:'Star-delta panel category listed in the published product range.'},
  {category:'Switchgears',name:'Power contactors & air circuit breakers',models:'Contactors · ACB',description:'Switchgear categories listed in the published product range.'},
  {category:'Switchgears',name:'MCCB, MPCB & overload relays',models:'MCCB · MPCB · Thermal Overload Relay',description:'Switchgear and protection categories listed in the published product range.'},
  {category:'Switchgears',name:'SFU, timers & relays',models:'SFU · Timers · Relays',description:'Switchgear categories listed in the published product range.'},
  {category:'Switchgears',name:'MCB',models:'MCB',description:'MCB category listed in the published product range.'},
];

const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

const grid = $('#productGrid');
const searchInput = $('#productSearch');
const filterButtons = $$('.filter-btn');
const resultCount = $('#resultCount');
const loadMoreButton = $('#loadMoreProducts');
const noResults = $('#noResults');
let activeCategory = 'All';
let visibleLimit = 9;
let filteredProducts = [...PRODUCTS];

function cardMarkup(product, index) {
  const symbol = product.category === 'PLC' ? 'PLC' : product.category === 'AC Drive' ? 'DRIVE' : product.category === 'Servo Drive' ? 'MOTION' : product.category === 'HMI' ? 'HMI' : product.category === 'SCADA and IPC' ? 'SCADA' : product.category === 'DCS' ? 'DCS' : product.category === 'Switchgears' ? 'POWER' : 'PANEL';
  return `<article class="product-card"><div class="product-visual" aria-hidden="true"><span class="product-symbol">${symbol}</span></div><div class="product-card-copy"><h3>${escapeHTML(product.name)}</h3><p>${escapeHTML(product.description)}</p><div class="product-models">Listed examples: ${escapeHTML(product.models)}</div><div class="product-card-actions"><button type="button" class="details-product" data-product-index="${index}">More details ↗</button><button type="button" class="quote-product" data-quote-index="${index}">Enquire</button></div></div></article>`;
}

function applyCatalogue() {
  const term = (searchInput?.value || '').trim().toLocaleLowerCase();
  filteredProducts = PRODUCTS.filter((product) => {
    const categoryMatch = activeCategory === 'All' || (Array.isArray(activeCategory) ? activeCategory.includes(product.category) : product.category === activeCategory);
    const text = `${product.category} ${product.name} ${product.models} ${product.description}`.toLocaleLowerCase();
    return categoryMatch && (!term || text.includes(term));
  });
  grid.innerHTML = filteredProducts.slice(0, visibleLimit).map((product) => cardMarkup(product, PRODUCTS.indexOf(product))).join('');
  resultCount.textContent = `${filteredProducts.length} product ${filteredProducts.length === 1 ? 'listing' : 'listings'}`;
  loadMoreButton.hidden = filteredProducts.length <= visibleLimit;
  noResults.hidden = filteredProducts.length !== 0;
  $('#clearSearch').hidden = !term;
  $$('[data-stat="products"]').forEach((node) => { node.textContent = PRODUCTS.length; });
  $$('[data-stat="categories"]').forEach((node) => { node.textContent = new Set(PRODUCTS.map((item) => item.category)).size; });
  $$('[data-stat="channels"]').forEach((node) => { node.textContent = '3'; });
}

function chooseCategory(value) {
  activeCategory = value;
  visibleLimit = 9;
  filterButtons.forEach((button) => {
    const active = Array.isArray(value) ? value.includes(button.dataset.category) : button.dataset.category === value;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  applyCatalogue();
}

function openEnquiry(product) {
  if (product) $('#productName').value = product.name;
  $('#enquiry').scrollIntoView({behavior:'smooth', block:'start'});
  $('#customerName').focus({preventScroll:true});
  updatePreview();
}

function makeMessage() {
  const form = $('#enquiryForm');
  if (!form.reportValidity()) return null;
  const data = new FormData(form);
  return [
    'Hello Classic Automation & Control, I would like to enquire about:',
    `Name: ${data.get('name')}`,
    `Phone: ${data.get('phone')}`,
    data.get('company') ? `Company: ${data.get('company')}` : '',
    data.get('email') ? `Email: ${data.get('email')}` : '',
    `Product / model: ${data.get('product')}`,
    data.get('quantity') ? `Quantity: ${data.get('quantity')}` : '',
    data.get('location') ? `Delivery location: ${data.get('location')}` : '',
    data.get('message') ? `Requirements: ${data.get('message')}` : '',
  ].filter(Boolean).join('\n');
}

function updatePreview() {
  const value = (id) => $(id).value.trim();
  $('#previewProduct').textContent = value('#productName') || 'Add a product or model';
  $('#previewQuantity').textContent = value('#customerQuantity') || 'Not specified';
  $('#previewLocation').textContent = value('#customerLocation') || 'Not specified';
}

searchInput?.addEventListener('input', () => { visibleLimit = 9; applyCatalogue(); });
filterButtons.forEach((button) => button.addEventListener('click', () => chooseCategory(button.dataset.category)));
$('#clearSearch')?.addEventListener('click', () => { searchInput.value = ''; visibleLimit = 9; applyCatalogue(); searchInput.focus(); });
$('#resetSearch')?.addEventListener('click', () => { searchInput.value = ''; chooseCategory('All'); $('#products').scrollIntoView({behavior:'smooth'}); });
loadMoreButton?.addEventListener('click', () => { visibleLimit += 9; applyCatalogue(); });

$$('[data-category-shortcut]').forEach((shortcut) => shortcut.addEventListener('click', (event) => {
  event.preventDefault();
  const requestedCategories = shortcut.dataset.categoryShortcut.split('|');
  searchInput.value = '';
  chooseCategory(requestedCategories.length > 1 ? requestedCategories : requestedCategories[0]);
  $('#products').scrollIntoView({behavior:'smooth'});
}));

grid?.addEventListener('click', (event) => {
  const detailsButton = event.target.closest('[data-product-index]');
  const quoteButton = event.target.closest('[data-quote-index]');
  if (detailsButton) {
    const product = PRODUCTS[Number(detailsButton.dataset.productIndex)];
    if (!product) return;
    $('#dialogCategory').textContent = product.category;
    $('#productDialogTitle').textContent = product.name;
    $('#dialogDescription').textContent = `${product.description} Listed examples: ${product.models}.`;
    $('#dialogEnquire').dataset.productIndex = PRODUCTS.indexOf(product);
    $('#productDialog').showModal();
  } else if (quoteButton) {
    openEnquiry(PRODUCTS[Number(quoteButton.dataset.quoteIndex)]);
  }
});

$('#closeDialog')?.addEventListener('click', () => $('#productDialog').close());
$('#dialogCloseAction')?.addEventListener('click', () => $('#productDialog').close());
$('#dialogEnquire')?.addEventListener('click', (event) => {
  const product = PRODUCTS[Number(event.currentTarget.dataset.productIndex)];
  $('#productDialog').close();
  openEnquiry(product);
});
$('#productDialog')?.addEventListener('click', (event) => { if (event.target === event.currentTarget) event.currentTarget.close(); });

$('#enquiryForm')?.addEventListener('input', updatePreview);
$('#whatsappEnquiry')?.addEventListener('click', () => {
  const message = makeMessage();
  if (!message) return;
  $('#formStatus').textContent = 'WhatsApp opened with your draft. Review it there and press Send.';
  window.open(`https://wa.me/919927800226?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
});
$('#emailEnquiry')?.addEventListener('click', () => {
  const message = makeMessage();
  if (!message) return;
  const subject = encodeURIComponent(`Product enquiry: ${$('#productName').value.trim()}`);
  $('#formStatus').textContent = 'Your email app opened with a draft. Review it there and press Send.';
  window.location.href = `mailto:Sales@classicautomation.in?subject=${subject}&body=${encodeURIComponent(message)}`;
});

const menuToggle = $('#menuToggle');
const nav = $('#mainNav');
menuToggle?.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(expanded));
  menuToggle.setAttribute('aria-label', expanded ? 'Close navigation' : 'Open navigation');
  nav.classList.toggle('open', expanded);
  menuToggle.querySelector('span').textContent = expanded ? '×' : '☰';
});
nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  link.closest('.nav-dropdown')?.removeAttribute('open');
  nav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  menuToggle?.setAttribute('aria-label', 'Open navigation');
  const icon = menuToggle?.querySelector('span');
  if (icon) icon.textContent = '☰';
}));

const searchToggle = $('#searchToggle');
searchToggle?.addEventListener('click', () => {
  $('#products').scrollIntoView({behavior:'smooth'});
  window.setTimeout(() => searchInput?.focus(), 350);
});

const slides = $$('[data-slide-panel]');
const slideButtons = $$('[data-slide-control]');
const pauseButton = $('#heroPause');
let currentSlide = 0;
let paused = false;
function showSlide(index) {
  currentSlide = index;
  slides.forEach((slide, i) => { slide.hidden = i !== index; });
  slideButtons.forEach((button, i) => {
    const active = i === index;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}
slideButtons.forEach((button) => button.addEventListener('click', () => showSlide(Number(button.dataset.slideControl))));
pauseButton?.addEventListener('click', () => {
  paused = !paused;
  pauseButton.textContent = paused ? 'Play' : 'Pause';
  pauseButton.setAttribute('aria-pressed', String(paused));
});
window.setInterval(() => { if (!paused && slides.length > 1) showSlide((currentSlide + 1) % slides.length); }, 6500);

const backToTop = $('#backToTop');
window.addEventListener('scroll', () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  $('#readingProgressBar').style.width = `${total > 0 ? (window.scrollY / total) * 100 : 0}%`;
  backToTop?.classList.toggle('visible', window.scrollY > 450);
}, {passive:true});
backToTop?.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));
$('#currentYear').textContent = new Date().getFullYear();
applyCatalogue();
