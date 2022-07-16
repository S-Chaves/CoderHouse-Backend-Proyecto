import { Router } from 'express';
import CarritoController from '../controllers/carrito.controller.js';

const router = new Router();

class RouterCarrito {
  constructor() {
    this.controlador = new CarritoController();
  }

  start() {
    router.get('/', this.controlador.getCarrito);
    router.get('/productos', this.controlador.getProductos);
    router.post('/productos', this.controlador.postProducto);
    router.delete('/productos/:id', this.controlador.deleteProducto);
    router.post('/compra', this.controlador.postCompra);

    return router;
  }
}

export default RouterCarrito;