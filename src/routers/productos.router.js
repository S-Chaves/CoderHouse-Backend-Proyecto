import { Router } from 'express';
import ProductosController from '../controllers/productos.controller.js';

const router = new Router();

class RouterProductos {
  constructor() {
    this.controlador = new ProductosController();
  }

  start() {
    router.get('/', this.controlador.getProds);
    router.get('/categoria/:categoria', this.controlador.getProdByCategoria);
    router.get('/:id', this.controlador.getProdById);
    router.post('/', this.controlador.postProds);
    router.put('/:id', this.controlador.putProds);
    router.delete('/:id', this.controlador.deleteProds);

    return router;
  }
}

export default RouterProductos;