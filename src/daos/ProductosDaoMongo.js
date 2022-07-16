import ContenedorMongo from "../contenedor/contenedorMongoDB.js";
import prodModel from "../models/productosModel.js";

let instance = null;

class ProductosDaoMongo extends ContenedorMongo {
  constructor() {
    super(prodModel);
  }

  static getInstance() {
    if (!instance) instance = new ProductosDaoMongo();
    return instance;
  }
}

export default ProductosDaoMongo;