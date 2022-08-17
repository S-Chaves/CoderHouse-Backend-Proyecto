const parsearVista = async (url, objeto) => {
  return await fetch(url)
    .then((respuesta) => respuesta.text())
    .then((template) => ejs.render(template, objeto));
};

/////////////
// Carrito //
/////////////
const getCarrito = async () => await (await fetch('/carrito/productos')).json();

const cargarProductosCarrito = async () => {
  const productos = await getCarrito();
  if (productos) {
    await parsearVista('views/layouts/productos_carrito.ejs', {
      productos,
    }).then((html) => {
      document.querySelector('.productos-carrito').innerHTML = html;
    });
  }
};
// Cambia la posición de los divs de notificación cada vez que se agrega uno
const subirDivs = (clase, altura) => {
  const body = document.querySelector('body');
  const divs = body.querySelectorAll(clase);
  divs.forEach((elem) => {
    const bottom = parseFloat(elem.style.bottom);
    elem.style.bottom = `${bottom + altura + 0.5}rem`;
  });
};
// Agrega una notificación al body
const agregarNotificacion = (mensaje, slide, clase, altura) => {
  const body = document.querySelector('body');
  const div = document.createElement('div');

  div.classList.add(clase);
  div.style.bottom = `-${altura}rem`;
  div.innerHTML = `
    <p>${mensaje}</p>
  `;
  body.append(div);
  div.classList.add(slide);

  subirDivs(`.${clase}`, altura);
  setTimeout(() => div.remove(), 3500);
};
// Event listeners para borrar productos
const listenersBorrar = () => {
  const btnsBorrar = document.querySelectorAll('.btn-elim');

  btnsBorrar.forEach((btn) =>
    btn.addEventListener('click', async (e) => {
      const index = e.target.dataset.id;

      await fetch(`/carrito/productos/${index}`, { method: 'DELETE' });
      await cargarProductosCarrito();
      agregarNotificacion('Producto Eliminado', 'slide-in-left', 'producto-eliminado', 3.5625);
      listenersBorrar();
    })
  );
};
// Agrega un producto al carrito
const addProducto = async (producto) => {
  const res = await (
    await fetch('/carrito/productos', {
      method: 'POST',
      body: JSON.stringify(producto),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

  if (res.Error) {
    agregarNotificacion(res.Error, 'slide-in-left', 'agregar-error', 5.125);
    return false;
  } else {
    agregarNotificacion('Producto Agregado', 'slide-in-right', 'producto-agregado', 3.5625);
    return true;
  }
};
// Event listeners para agregar productos
const addListenersBtns = () => {
  const btnsAgregar = document.querySelectorAll('.btn-agregar');

  btnsAgregar.forEach((btn) =>
    btn.addEventListener('click', async (e) => {
      const parent = e.target.parentElement;
      const producto = {
        id: e.target.dataset.id,
        title: parent.children[0].textContent,
        price: parseFloat(parent.children[1].textContent.slice(1)),
        thumbnail: parent.querySelector('img').src,
        cantidad: 1,
      };

      btn.disabled = true;
      setTimeout(() => btn.disabled = false, 500);
      const res = await addProducto(producto);
      if (res) {
        await cargarProductosCarrito();
        listenersBorrar();
      }
    })
  );
};

const carrito = document.querySelector('.carrito');
const fondo = document.querySelector('.fondo-carrito');

const btnCarrito = document.querySelector('.btn-carrito');
if (btnCarrito) {
  btnCarrito.addEventListener('click', () => {
    carrito.classList.add('visible');
    fondo.classList.add('visible');
  });
}

const btnCerrar = document.querySelector('.btn-cerrar');
btnCerrar.addEventListener('click', () => {
  carrito.classList.remove('visible');
  fondo.classList.remove('visible');
});

///////////////
// Productos //
///////////////
// Recibir productos del lado del servidor
const getProductos = async () => {
  const productos = await (await fetch('/productos')).json();

  await parsearVista('views/layouts/productos.ejs', { productos }).then(
    (html) => {
      document.querySelector('.productos').innerHTML = html;
    }
  );

  await cargarProductosCarrito();
  listenersBorrar();
  addListenersBtns();
};
await getProductos();

// Agregar productos
const productosForm = document.querySelector('.productos-form');
productosForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const producto = {
    title: productosForm[0].value,
    price: productosForm[1].value,
    categoria: productosForm[2].value,
    thumbnail: productosForm[3].value
  }

  await fetch('/productos', {
    method: 'POST',
    body: JSON.stringify(producto),
    headers: {
      'Content-Type': 'application/json',
    }
  });
  await getProductos();
  productosForm.reset();
});
