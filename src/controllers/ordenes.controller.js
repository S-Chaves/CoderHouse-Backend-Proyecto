import OrdenesDaoMongo from "../daos/OrdenesDaoMongo.js";
import { logRuta } from "../utils/logger.js";

class OrdenesController {
  constructor() {
    this.api = OrdenesDaoMongo.getInstance();
  }

  getOrdenes = async (req, res) => {
    logRuta(req);
    if (!req.isAuthenticated()) return res.json({ Error: "Debe estar logueado para realizar esta operación" });
    const email = req.session.user.email;

    res.json(await this.api.getMany({ email }));
  };

  postOrden = async (req, res) => {
    if (!req.isAuthenticated()) return res.json({ Error: "Debe estar logueado para realizar esta operación" });
    const productos = req.session.carrito.map(({ id, thumbnail, ...resto }) => resto);
    const email = req.session.user.email;

    const orden = { productos, hora: (new Date()).toISOString(), email };
    await this.api.save(orden);
    res.end();
  };
}

export default OrdenesController;