const socket = io();

const parsearVista = async (url, objeto) => {
  return await fetch(url)
    .then(respuesta => respuesta.text())
    .then(template => ejs.render(template,
      objeto));
};
// Agregar mensajes
const mensajesForm = document.querySelector('.mensajes-form');
mensajesForm.addEventListener('submit', e => {
  e.preventDefault();

  const mensaje = {
    author: {
      id: mensajesForm[0].value,
      nombre: mensajesForm[1].value,
      apellido: mensajesForm[2].value,
      edad: mensajesForm[3].value,
      alias: mensajesForm[4].value,
      avatar: mensajesForm[5].value
    },
    text: {
      text: mensajesForm[6].value
    }
  };

  socket.emit('client:agregarMensaje', mensaje);
  mensajesForm[6].value = '';
});

const calcPorcentaje = (nor, denor) => Math.floor((nor * 100) / denor);
// Cargar mensajes que vienen del lado del servidor
socket.on('server:mensajes', async (mensajes) => {
  await parsearVista('views/layouts/mensajes.ejs', { mensajes })
    .then(html => {
      document.querySelector('.mensajes').innerHTML = html;
    });
});