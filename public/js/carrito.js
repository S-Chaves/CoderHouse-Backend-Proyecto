const btnCompra = document.querySelector('.realizar-compra');
const compraRealizada = document.querySelector('.compra-realizada');
const fondo = document.querySelector('.fondo-carrito');

btnCompra.addEventListener('click', async () => {
  compraRealizada.classList.add('visible');
  fondo.classList.add('visible');

  await fetch('/carrito/compra', { method: 'POST' });
  await fetch('/orden', { method: 'POST' });

  setTimeout(() => {
    location.reload();
  }), 5000;
});

const btnCerrar = document.querySelector('.btn-cerrar');
btnCerrar.addEventListener('click', () => {
  compraRealizada.classList.remove('visible');
  fondo.classList.remove('visible');
});