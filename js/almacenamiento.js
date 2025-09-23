// almacenamiento.js — Gestión del carrito con localStorage y helpers de UI
// CLAVE_CARRITO: nombre de la clave en localStorage.

const CLAVE_CARRITO = 'verdenido_carrito_v1';
// Lee y parsea el carrito. Si no existe o falla, devuelve un arreglo vacío.

function obtenerCarrito(){ try { return JSON.parse(localStorage.getItem(CLAVE_CARRITO)) || []; } catch(e){ return []; } }
// Guarda el carrito serializado en localStorage.
function guardarCarrito(carrito){ localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito)); }
// Agrega un producto al carrito: si ya existe, incrementa cantidad; si no, lo crea con cantidad=1.
function agregarAlCarrito(producto){
  const carrito = obtenerCarrito();
  const idx = carrito.findIndex(i => i.id === producto.id);
  if (idx >= 0){ carrito[idx].cantidad += 1; } 
  else { carrito.push({ id: producto.id, nombre: producto.name, precio: producto.price, cantidad: 1 }); }
  guardarCarrito(carrito);
}

// Elimina un ítem por id.
function eliminarDelCarrito(id){ guardarCarrito(obtenerCarrito().filter(i => i.id !== id)); }

// Establece la cantidad (mínimo 1) y guarda.
function establecerCantidad(id, cantidad){
  const carrito = obtenerCarrito();
  const item = carrito.find(i => i.id === id);
  if (item){ item.cantidad = Math.max(1, cantidad|0); guardarCarrito(carrito); }
}

// Vacía por completo el carrito.
function vaciarCarrito(){ guardarCarrito([]); }

// Formatea número a CLP (es-CL).
function formatearCLP(n){ return n.toLocaleString('es-CL', {style:'currency', currency:'CLP'}); }

// Actualiza badge del header con el total de unidades en el carrito.
function actualizarContadorCarrito(el){ 
  const carrito = obtenerCarrito(); 
  const total = carrito.reduce((a,b)=>a+b.cantidad,0); 
  if (el) el.textContent = total; 
}
