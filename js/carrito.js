// carrito.js — Vista del carrito (render y eventos)

function mostrarCarrito(){
  // Cargar carrito desde localStorage
  const carrito = obtenerCarrito();
  const vacio = document.getElementById('empty');
  const wrap = document.getElementById('cartWrap');
  const tbody = document.querySelector('#cartTable tbody');
  const totalEl = document.getElementById('total');
  // Actualizar badge del header
  actualizarContadorCarrito(document.getElementById('cart-count'));
  // Si no hay productos: mostrar estado vacío
  if (!carrito.length){
    vacio.style.display = '';
    wrap.style.display = 'none';
    return;
  } else {
    vacio.style.display = 'none';
    wrap.style.display = '';
  }
  // Limpiar tabla y recalcular
  tbody.innerHTML = '';
  let total = 0;
  carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;
        // Fila con nombre, precio, input de cantidad, subtotal y botón eliminar
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.nombre}</td>
      <td class="right">${formatearCLP(item.precio)}</td>
      <td class="right">
        <input type="number" value="${item.cantidad}" min="1" style="width:64px;padding:6px 8px;border:1px solid #d1d5db;border-radius:10px" />
      </td>
      <td class="right">${formatearCLP(subtotal)}</td>
      <td><button class="danger">Eliminar</button></td>
    `;
    // Cambiar cantidad -> persiste y re-render
    const qtyInput = tr.querySelector('input');
    qtyInput.addEventListener('change', () => {
      establecerCantidad(item.id, parseInt(qtyInput.value,10) || 1);
      mostrarCarrito();
    });
    
    // Botón Eliminar -> quita del carrito y re-render
    tr.querySelector('button.danger').addEventListener('click', () => {
      eliminarDelCarrito(item.id);
      mostrarCarrito();
    });
    tbody.appendChild(tr);
  });
  // Total general
  totalEl.textContent = formatearCLP(total);

 // Botones Vaciar y Pagar (simulación)
  document.getElementById('vaciar').onclick = () => { vaciarCarrito(); mostrarCarrito(); };
  document.getElementById('pagar').onclick = () => {
    if (!obtenerCarrito().length){ alert('Tu carrito está vacío'); return; }
    alert('¡Gracias por tu compra! (Simulación de pago)');
    vaciarCarrito();
    mostrarCarrito();
  };
}
