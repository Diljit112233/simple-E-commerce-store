import { products, findById, categories } from './product.js';

const state = {
  route: 'home',
  cart: JSON.parse(localStorage.getItem('cart') || '{}')
};

function saveCart() { localStorage.setItem('cart', JSON.stringify(state.cart)); updateCartUI(); }

function updateCartUI() {
  const count = Object.values(state.cart).reduce((s,n)=>s+n,0);
  document.querySelectorAll('.cart-count').forEach(el => el.dataset.count = count);
  document.getElementById('summary-items').textContent = count;
  const subtotal = Object.entries(state.cart).reduce((sum,[id,qty])=>{
    const p = findById(id); return sum + (p ? p.price * qty : 0);
  },0);
  document.getElementById('summary-subtotal').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('summary-total').textContent = `$${subtotal.toFixed(2)}`;
}

function setRoute(route, param){
  state.route = route;
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  if(route === 'home') document.getElementById('home-page').classList.add('active');
  if(route === 'products') document.getElementById('products-page').classList.add('active');
  if(route === 'product') renderDetail(param);
  if(route === 'cart') document.getElementById('cart-page').classList.add('active');
}

function renderProducts(list = products) {
  const grid = document.getElementById('products-grid'); grid.innerHTML = '';
  if(!list.length){ document.getElementById('no-results').classList.remove('hidden'); return; }
  document.getElementById('no-results').classList.add('hidden');
  for(const p of list){
    const card = document.createElement('article'); card.className = 'product-card';
    card.innerHTML = `
      <div class="card-image" data-img="${p.img}">
        <div class="card-badge ${p.tag || ''}">${p.tag? p.tag.toUpperCase(): ''}</div>
      </div>
      <div class="card-body">
        <div class="card-category">${p.category}</div>
        <div class="card-name">${p.name}</div>
        <div class="card-rating"><span class="stars">★</span>${p.rating}</div>
        <div class="card-price"><div class="price-current">$${p.price}</div>${p.original? `<div class="price-original">$${p.original}</div>`: ''}</div>
        <button class="card-add-btn" data-id="${p.id}">Add to cart</button>
      </div>
    `;
    card.querySelector('.card-image').addEventListener('click', ()=>{ setRoute('product', p.id); });
    card.querySelector('.card-add-btn').addEventListener('click', (e)=>{ e.stopPropagation(); addToCart(p.id); });
    grid.appendChild(card);
  }
}

function renderCategories(){
  const container = document.getElementById('categories'); container.innerHTML='';
  const cats = categories();
  const allBtn = document.createElement('button'); allBtn.className='cat-btn active'; allBtn.textContent='All'; allBtn.addEventListener('click', ()=>renderProducts());
  container.appendChild(allBtn);
  for(const c of cats){
    const btn = document.createElement('button'); btn.className='cat-btn'; btn.textContent = c; btn.addEventListener('click', ()=>renderProducts(products.filter(p=>p.category===c)));
    container.appendChild(btn);
  }
}

function renderDetail(id){
  const container = document.getElementById('product-detail-page'); container.className='page active';
  const p = findById(id);
  container.innerHTML = `
    <div class="product-detail-container">
      <button class="back-btn">← Back</button>
      <div class="product-detail">
        <div class="detail-image" data-img="${p.img}"></div>
        <div class="detail-info">
          <div class="detail-category">${p.category}</div>
          <div class="detail-name">${p.name}</div>
          <div class="detail-rating">★ ${p.rating}</div>
          <div class="detail-price-row"><div class="detail-price">$${p.price}</div>${p.original? `<div class="detail-original">$${p.original}</div>`: ''}</div>
          <p class="detail-description">A short description for ${p.name}.</p>
          <div style="display:flex;gap:12px;margin-top:18px;"><button class="detail-add-btn" data-id="${p.id}">Add to cart</button></div>
        </div>
      </div>
    </div>
  `;
  container.querySelector('.back-btn').addEventListener('click', ()=> setRoute('products'));
  container.querySelector('.detail-add-btn').addEventListener('click', ()=> addToCart(p.id));
}

function addToCart(id){ state.cart[id] = (state.cart[id] || 0) + 1; saveCart(); showToast('Added to cart'); }

function showToast(msg){
  let t = document.querySelector('.toast');
  if(!t){ t = document.createElement('div'); t.className='toast success'; document.body.appendChild(t); }
  t.textContent = msg; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),1800);
}

function renderCartItems(){
  const container = document.getElementById('cart-items'); container.innerHTML='';
  const ids = Object.keys(state.cart);
  if(!ids.length){ container.innerHTML = `<div class="empty-cart"><div class="empty-icon">🛒</div><p>Your cart is empty.</p></div>`; return; }
  for(const id of ids){ const p = findById(id); const qty = state.cart[id];
    const item = document.createElement('div'); item.className='cart-item';
    item.innerHTML = `
      <div class="cart-item-img" data-img="${p.img}"></div>
      <div class="cart-item-info">
        <div class="cart-item-name">${p.name}</div>
        <div class="cart-item-cat">${p.category}</div>
        <div class="cart-item-price">$${(p.price*qty).toFixed(2)}</div>
      </div>
      <div class="cart-item-qty">
        <button class="cart-qty-btn" data-op="dec" data-id="${id}">-</button>
        <div class="cart-qty-num">${qty}</div>
        <button class="cart-qty-btn" data-op="inc" data-id="${id}">+</button>
      </div>
      <button class="cart-item-remove" data-id="${id}">✕</button>
    `;
    container.appendChild(item);
  }
}

// Event wiring
function setup() {
  document.body.addEventListener('click', (e)=>{
    const route = e.target.closest('[data-route]'); if(route){ const r = route.dataset.route; setRoute(r); }
  });

  document.getElementById('search-input').addEventListener('input', (e)=>{
    const q = e.target.value.toLowerCase(); renderProducts(products.filter(p=>p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)));
  });

  document.getElementById('sort-select').addEventListener('change', (e)=>{
    const v = e.target.value; let list = [...products];
    if(v==='price-asc') list.sort((a,b)=>a.price-b.price);
    if(v==='price-desc') list.sort((a,b)=>b.price-a.price);
    renderProducts(list);
  });

  document.querySelector('.btn-clear-cart').addEventListener('click', ()=>{ state.cart = {}; saveCart(); renderCartItems(); });

  document.getElementById('cart-items').addEventListener('click', (e)=>{
    const btn = e.target.closest('[data-op]'); if(btn){ const id = btn.dataset.id; if(btn.dataset.op==='inc') state.cart[id] = (state.cart[id]||0)+1; if(btn.dataset.op==='dec') { state.cart[id] = Math.max(0,(state.cart[id]||0)-1); if(state.cart[id]===0) delete state.cart[id]; } saveCart(); renderCartItems(); }
    const rem = e.target.closest('[data-id]'); if(rem && rem.classList.contains('cart-item-remove')){ delete state.cart[rem.dataset.id]; saveCart(); renderCartItems(); }
  });

  renderCategories(); renderProducts(); updateCartUI(); renderCartItems(); setRoute('home');
}

window.addEventListener('DOMContentLoaded', setup);
