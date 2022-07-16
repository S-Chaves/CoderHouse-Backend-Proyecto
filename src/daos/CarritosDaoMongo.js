import ContenedorMongo from "../contenedor/contenedorMongoDB.js";
import carritosModel from "../models/carritosModel.js";
import { logError } from '../utils/logger.js';

let instance = null;

class CarritosDaoMongo extends ContenedorMongo {
  constructor() {
    super(carritosModel);
  }

  static getInstance() {
    if (!instance) instance = new CarritosDaoMongo();
    return instance;
  }

  async addProducto(email, elem) {
    try {
      await this.model.updateOne({ email }, { $push: { productos: elem } });
    } catch (error) {
      logError(error);
    }
  }

  async incProducto(email, id) {
    try {
      await this.model.updateOne({ email, "productos.id": id },
        { $inc: { "productos.$.cantidad": 1 } });
    } catch (error) {
      logError(error);
    }
  }

  async deleteProducto(email, id) {
    try {
      await this.model.updateOne({ email }, { $pull: { productos: { id } } });
    } catch (error) {
      logError(error);
    }
  }

  async deleteProductos(email) {
    try {
      await this.model.updateOne({ email }, { $set: { productos: [] } });
    } catch (error) {
      logError(error);
    }
  }
}

export default CarritosDaoMongo;