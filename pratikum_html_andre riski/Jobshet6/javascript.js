// ===== Data produk =====
const products = [
  { id: 1, name: 'Gayo Wine', origin: 'Aceh', category: 'arabika', price: 50000, note: 'Manis, buah merah, body tebal' },
  { id: 2, name: 'Toraja Sapan', origin: 'Sulawesi Selatan', category: 'arabika', price: 100000, note: 'Cokelat gelap, rempah, asam lembut' },
  { id: 3, name: 'Flores Bajawa', origin: 'Nusa Tenggara Timur', category: 'arabika', price: 98000, note: 'Karamel, jeruk, bersih' },
  { id: 4, name: 'Kintamani Honey', origin: 'Bali', category: 'arabika', price: 92000, note: 'Madu, sitrus, ringan' },
  { id: 5, name: 'Robusta Lampung', origin: 'Lampung', category: 'robusta', price: 65000, note: 'Pahit tegas, kacang, crema tebal' },
  { id: 6, name: 'Robusta Temanggung', origin: 'Jawa Tengah', category: 'robusta', price: 68000, note: 'Cokelat pahit, earthy' },
  { id: 7, name: 'Blend Pagi', origin: 'Gayo + Lampung', category: 'blend', price: 75000, note: 'Seimbang, cocok untuk susu' },
  { id: 8, name: 'Blend Espresso', origin: 'Toraja + Temanggung', category: 'blend', price: 82000, note: 'Pekat, manis, crema stabil' }
];
 
// ===== State =====
let cart = [];
let activeCategory = 'semua';
let searchKeyword = '';
 
// ===== Elemen DOM =====
const productGrid = document.getElementById('productGrid');
const emptyMessage = document.getElementById('emptyMessage');
const cartBadge = document.getElementById('cartBadge');
const cartList = document.getElementById('cartList');
const cartTotal = document.getElementById('cartTotal');
 
const formatRupiah = (angka) => 'Rp' + angka.toLocaleString('id-ID');
 
// ===== 1. Katalog: render, filter, cari =====
function renderProducts() {
  const keyword = searchKeyword.toLowerCase();
  const hasil = products.filter((p) => {
    const cocokKategori = activeCategory === 'semua' || p.category === activeCategory;
    const cocokKata = (p.name + ' ' + p.origin).toLowerCase().includes(keyword);
    return cocokKategori && cocokKata;
  });
 
  productGrid.innerHTML = hasil.map((p) => `
    <article class="col-12 col-md-6 col-lg-3">
      <div class="card h-100 product-card">
        <img src="https://placehold.co/400x300/0F3D3E/F2B705?text=${encodeURIComponent(p.name)}"
             class="card-img-top" alt="Kemasan ${p.name}">
        <div class="card-body d-flex flex-column">
          <h3 class="h5 card-title">${p.name}</h3>
          <p class="small text-body-secondary mb-1">${p.origin} &bull; ${p.category}</p>
          <p class="card-text">${p.note}</p>
          <p class="product-price mt-auto">${formatRupiah(p.price)} <span class="small fw-normal">/ 250 g</span></p>
          <button class="btn btn-dark w-100" type="button" data-add="${p.id}">Beli sekarang</button>
        </div>
      </div>
    </article>`).join('');
 
  emptyMessage.classList.toggle('d-none', hasil.length > 0);
}
 
document.getElementById('filterGroup').addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-category]');
  if (!btn) return;
  document.querySelectorAll('#filterGroup .btn').forEach((b) => b.classList.remove('active'));
  btn.classList.add('active');
  activeCategory = btn.dataset.category;
  renderProducts();
});
 
document.getElementById('searchInput').addEventListener('input', (e) => {
  searchKeyword = e.target.value.trim();
  renderProducts();
});
 
// ===== 2. Keranjang: counter, total, jumlah =====
productGrid.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-add]');
  if (!btn) return;
  const id = Number(btn.dataset.add);
  const item = cart.find((c) => c.id === id);
  if (item) item.qty += 1;
  else cart.push({ id, qty: 1 });
  renderCart();
});
 
cartList.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-action]');
  if (!btn) return;
  const id = Number(btn.dataset.id);
  const item = cart.find((c) => c.id === id);
  if (!item) return;
  item.qty += btn.dataset.action === 'plus' ? 1 : -1;
  cart = cart.filter((c) => c.qty > 0);
  renderCart();
});
 
document.getElementById('clearCart').addEventListener('click', () => {
  cart = [];
  renderCart();
});
 
function renderCart() {
  const totalItem = cart.reduce((jumlah, c) => jumlah + c.qty, 0);
  const totalHarga = cart.reduce((jumlah, c) => {
    const p = products.find((x) => x.id === c.id);
    return jumlah + p.price * c.qty;
  }, 0);
 
  cartBadge.textContent = totalItem;
  cartTotal.textContent = formatRupiah(totalHarga);
 
  if (cart.length === 0) {
    cartList.innerHTML = '<li class="list-group-item text-body-secondary">Keranjang masih kosong. Pilih kopi dari katalog.</li>';
    return;
  }
 
  cartList.innerHTML = cart.map((c) => {
    const p = products.find((x) => x.id === c.id);
    return `
      <li class="list-group-item d-flex justify-content-between align-items-center gap-2">
        <div>
          <strong>${p.name}</strong><br>
          <small>${formatRupiah(p.price)} &times; ${c.qty}</small>
        </div>
        <div class="btn-group btn-group-sm" role="group" aria-label="Ubah jumlah ${p.name}">
          <button class="btn btn-outline-secondary" data-action="minus" data-id="${p.id}" aria-label="Kurangi">&minus;</button>
          <button class="btn btn-outline-secondary" data-action="plus" data-id="${p.id}" aria-label="Tambah">+</button>
        </div>
      </li>`;
  }).join('');
}
 
// ===== 3. Mode gelap =====
const toggleButton = document.getElementById('darkModeToggle');
toggleButton.addEventListener('click', () => {
  const html = document.documentElement;
  const gelap = html.getAttribute('data-bs-theme') === 'dark';
  html.setAttribute('data-bs-theme', gelap ? 'light' : 'dark');
  toggleButton.textContent = gelap ? 'Mode Gelap' : 'Mode Terang';
  toggleButton.className = gelap ? 'btn btn-outline-dark btn-sm' : 'btn btn-outline-light btn-sm';
});
 
// ===== 4. Validasi formulir kontak =====
const formKontak = document.getElementById('contactForm');
formKontak.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.getElementById('inputEmail').value.trim();
  const pesan = document.getElementById('inputPesan').value.trim();
  const alertBox = document.getElementById('alertNotification');
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
 
  let tipe, isi;
  if (!email || !pesan) {
    tipe = 'danger'; isi = '<strong>Gagal.</strong> Email dan pesan wajib diisi.';
  } else if (!emailValid) {
    tipe = 'danger'; isi = '<strong>Gagal.</strong> Format email belum benar, contoh: nama@email.com.';
  } else {
    tipe = 'success'; isi = '<strong>Terkirim.</strong> Terima kasih, kami balas ke email Anda secepatnya.';
    formKontak.reset();
  }
  alertBox.innerHTML = `
    <div class="alert alert-${tipe} alert-dismissible fade show" role="alert">
      ${isi}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Tutup"></button>
    </div>`;
});
 
// ===== Inisialisasi =====
renderProducts();
renderCart();
 