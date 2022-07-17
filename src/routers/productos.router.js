import { Router } from 'express';
import ProductosController from '../controllers/productos.controller.js';

const router = new Router();

class RouterProductos {
  constructor() {
    this.controlador = new ProductosController();
  }

  start() {
    router.get('/', this.controlador.getProds);
    router.post('/', this.controlador.postProds);
    router.get('/:id', this.controlador.getProdById);
    router.put('/:id', this.controlador.putProds);
    router.delete('/:id', this.controlador.deleteProds);
    router.get('/categoria/:categoria', this.controlador.getProdByCategoria);

    return router;
  }
}

export default RouterProductos;