// productos.js — Catálogo y filtros (render dinámico)

const PRODUCTOS = [
  // 12 productos con categorías para el filtro
  { id:'p1',  name:'Monstera deliciosa', category:'Plantas', price:18990, img:'../images/foto1.png' },
  { id:'p2',  name:'Sansevieria (Lengua de suegra)', category:'Plantas', price:12990, img:'../images/foto2.png' },
  { id:'p3',  name:'Poto (Epipremnum aureum)', category:'Plantas', price:9990, img:'../images/foto3.png' },
  { id:'p4',  name:'Macetero cerámico 20cm', category:'Maceteros', price:7990, img:'../images/foto4.png' },
  { id:'p5',  name:'Sustrato universal 5L', category:'Sustratos', price:5990, img:'../images/foto5.png' },
  { id:'p6',  name:'Tierra de hojas 10L', category:'Sustratos', price:6990, img:'../images/foto6.png' },
  { id:'p7',  name:'Kit herramientas 5pcs', category:'Herramientas', price:8490, img:'../images/foto7.png' },
  { id:'p8',  name:'Regador 2L', category:'Riego', price:5490, img:'../images/foto8.png' },
  { id:'p9',  name:'Macetero colgante', category:'Maceteros', price:6990, img:'../images/foto9.png' },
  { id:'p10', name:'Ficus lyrata pequeño', category:'Plantas', price:15990, img:'../images/foto10.png' },
  { id:'p11', name:'Fertilizante orgánico 500ml', category:'Riego', price:4990, img:'../images/foto11.png' },
  { id:'p12', name:'Tijera de podar', category:'Herramientas', price:5990, img:'../images/foto12.png' },
];
// Devuelve el HTML de una tarjeta de producto (card).
function plantillaTarjeta(p){
  return `
    <article class="card">
      <img src="${p.img}" alt="${p.name}" onerror="this.src='../images/_placeholder_item.jpg'">
      <h3>${p.name}</h3>
      <p class="muted">${p.category}</p>
      <p class="price">${formatearCLP(p.price)}</p>
      <button data-id="${p.id}">Agregar</button>
    </article>
  `;
}
// Inyecta tarjetas en la grilla y conecta eventos de "Agregar".
function mostrarLista(lista){
  const grid = document.getElementById('grid');
  grid.innerHTML = lista.map(plantillaTarjeta).join('');
  grid.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      const p = PRODUCTOS.find(x => x.id === btn.dataset.id);
      agregarAlCarrito(p);
      alert(`Agregado: ${p.name}`);
      actualizarContadorCarrito(document.getElementById('cart-count'));
    });
  });
}
// Aplica filtros por categoría y término de búsqueda.
function aplicarFiltros(){
  const categoria = document.getElementById('categoria').value;
  const termino = document.getElementById('buscar').value.toLowerCase().trim();
  let lista = PRODUCTOS.slice();
  if (categoria !== 'Todas'){ lista = lista.filter(p => p.category === categoria); }
  if (termino){ lista = lista.filter(p => p.name.toLowerCase().includes(termino)); }
  mostrarLista(lista);
}
// Punto de entrada de la página de productos.
function iniciarProductos(){
  // Lee ?categoria= desde la URL para preseleccionar el filtro
  const url = new URL(location.href);
  const cat = url.searchParams.get('categoria');
  const sel = document.getElementById('categoria');
  if (cat){ sel.value = cat; }
  // Listeners de cambios en filtros
  sel.addEventListener('change', aplicarFiltros);
  document.getElementById('buscar').addEventListener('input', aplicarFiltros);
 // Primer render + contador de carrito
  aplicarFiltros();
  actualizarContadorCarrito(document.getElementById('cart-count'));
}
