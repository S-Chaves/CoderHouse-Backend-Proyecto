import ContenedorMongo from "../contenedor/contenedorMongoDB.js";
import ordenesModel from "../models/ordenesModel.js";
import { logError } from '../utils/logger.js';

let instance = null;

class OrdenesDaoMongo extends ContenedorMongo {
  constructor() {
    super(ordenesModel);
  }

  static getInstance() {
    if (!instance) instance = new OrdenesDaoMongo();
    return instance;
  }

  async save(orden) {
    try {
      const ultimo = await this.model.findOne().sort({ _id: -1 });
      ultimo
        ? orden.ordenId = ultimo.ordenId + 1
        : orden.ordenId = 1;

      const newElem = new this.model({ ...orden });
      await newElem.save();
      return newElem;
    } catch (error) {
      logError(error);
    }
  }
}

export default OrdenesDaoMongo;