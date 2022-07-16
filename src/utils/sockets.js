import MensajesDaoMongo from '../daos/MensajesDaoMongo.js';

const mensajesApi = MensajesDaoMongo.getInstance();

const startSocket = async (io) => {
  io.on('connection', async socket => {
    console.log('Usuario Conectado');

    socket.emit('server:mensajes', await mensajesApi.getAll());

    socket.on('client:agregarMensaje', async mensaje => {
      mensaje.text.hora = (new Date()).toISOString();
      await mensajesApi.save(mensaje);
      io.sockets.emit('server:mensajes', await mensajesApi.getAll());
    });
  });
};

export default startSocket;