import CarritosDaoMongo from "../daos/CarritosDaoMongo.js";
import { logRuta } from "../utils/logger.js";
import { sendEmail, sendMessages } from "../utils/messages.js";

class CarritoController {
  constructor() {
    this.api = CarritosDaoMongo.getInstance();
  }

  fetchCarrito = async req => {
    if (!req.isAuthenticated()) return [];

    const email = req.session.user.email;
    const carrito = await this.api.getOne({ email });
    return carrito
      ? carrito.productos
      : carrito;
  };

  mandarMensajes = async (req) => {
    const carrito = await this.fetchCarrito(req);
    const user = req.session.user;
    req.session.carrito = carrito;

    await this.api.deleteProductos(user.email);
    await sendEmail(user, carrito);
    await sendMessages(user, carrito);
  };

  getCarrito = async (req, res) => {
    logRuta(req);
    if (!req.isAuthenticated()) return res.redirect('/login');

    res.render('carrito', { carrito: await this.fetchCarrito(req) });
  };

  getProductos = async (req, res) => {
    logRuta(req);
    res.json(await this.fetchCarrito(req));
  };

  postProducto = async (req, res) => {
    if (!req.isAuthenticated()) return res.json({ Error: "Debe estar logueado para realizar esta operación" });
    const producto = req.body;
    const email = req.session.user.email;

    const esta = await this.api.getOne({ email, "productos.title": producto.title });
    if (esta) {
      await this.api.incProducto(email, producto.id);
    } else if (producto) {
      await this.api.addProducto(email, producto);
    }
    res.json(producto);
  };

  deleteProducto = async (req, res) => {
    if (!req.isAuthenticated()) return res.json({ Error: "Debe estar logueado para realizar esta operación" });
    const id = req.params.id;
    const email = req.session.user.email;

    if (id) await this.api.deleteProducto(email, id);
    res.end();
  };

  postCompra = async (req, res) => {
    await this.mandarMensajes(req);
    res.end();
  };
}

export default CarritoController;