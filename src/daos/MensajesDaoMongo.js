import ContenedorMongo from "../contenedor/contenedorMongoDB.js";
import mensajeModel from "../models/mensajeModel.js";

let instance = null;

class MensajesDaoMongo extends ContenedorMongo {
  constructor() {
    super(mensajeModel);
  }

  static getInstance() {
    if (!instance) instance = new MensajesDaoMongo();
    return instance;
  }
}

export default MensajesDaoMongo;