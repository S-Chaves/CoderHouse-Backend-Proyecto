import express from 'express';
import session from 'express-session';
import http from 'http';
import bodyParser from 'body-parser';
import parseArgs from 'minimist';
import cluster from 'cluster';
import { cpus } from 'os';
import config from './src/utils/config.js';
import mongoose from 'mongoose';

// Pasport
import passport from 'passport';
import { loginStrategy, signupStrategy } from './src/passport/passportLocal.js';
import facebookStrategy from './src/passport/passportFacebook.js';
import LocalStrategy from 'passport-local';
import FacebookStrategy from 'passport-facebook';
LocalStrategy.Strategy;
FacebookStrategy.Strategy;
// Funciones
import { Server } from 'socket.io';
import startSocket from './src/utils/sockets.js';

// Daos
import UsersDaoMongo from './src/daos/UsersDaoMongo.js';
// Routers
import RouterIndex from './src/routers/index.router.js';
import RouterAuth from './src/routers/auth.router.js';
import RouterProcess from './src/routers/process.router.js';
import RouterCarrito from './src/routers/carrito.router.js';
import RouterProductos from './src/routers/productos.router.js';
import RouterChat from './src/routers/chat.router.js';
import RouterOrdenes from './src/routers/ordenes.router.js';

// Variables 
export const app = express();
const httpServer = new http.createServer(app);
export const numCPU = cpus().length;
export const io = new Server(httpServer);
// Apis
const usersApi = UsersDaoMongo.getInstance();
// Args
const options = { default: { port: 8080, modo: 'fork' }, alias: { p: "port" } };
const args = parseArgs(process.argv.slice(2), options);
// Mongoose Connection
mongoose.connect(config.db.connstr, config.db.options);

// Middlewares 
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(config.sess.options));

// Passport 
app.use(passport.initialize());
app.use(passport.session());

passport.use('login', new LocalStrategy({ usernameField: 'email' },
  async (email, password, done) =>
    await loginStrategy(email, password, done)
));
passport.use('signup', new LocalStrategy({ passReqToCallback: true },
  async (req, username, password, done) =>
    await signupStrategy(req, username, password, done)
));

passport.use('facebook', new FacebookStrategy(config.passport.fb,
  async (accessToken, refreshToken, profile, done) =>
    await facebookStrategy(accessToken, refreshToken, profile, done)
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  await usersApi.getUserById(id, done);
});

// Routers 
app.use((new RouterAuth()).start());
app.use((new RouterProcess()).start());
app.use('/carrito', (new RouterCarrito()).start());
app.use('/productos', (new RouterProductos()).start());
app.use('/chat', (new RouterChat()).start());
app.use('/orden', (new RouterOrdenes()).start());
app.use((new RouterIndex()).start());

// WebSockets
await startSocket(io);
// Template Engine 
app.set('views', './public/views');
app.set('view engine', 'ejs');

// Puerto 
const start = (port) => {
  const server = httpServer.listen(port);
  console.log(`Server listening on port ${port}`);
  server.on("error", error => console.log(`Error en servidor ${error}`));
};

const PORT = config.srv.port || args.port;
if ((args.modo == 'cluster') && (cluster.isPrimary)) {
  for (let i = 0; i < numCPU; i++) {
    cluster.fork();
  }
} else {
  start(PORT);
}

// Desconexión de base de datos
const exit = () => {
  mongoose.connection.close(() => {
    console.log('Conexión con Mongoose terminada');
    process.exit(0);
  });
};
process.on('SIGINT', exit).on('SIGTERM', exit);