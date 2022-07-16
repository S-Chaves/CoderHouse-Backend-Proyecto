import { Router } from 'express';
import OrdenesController from '../controllers/ordenes.controller.js';

const router = new Router();

class RouterOrdenes {
  constructor() {
    this.controlador = new OrdenesController();
  }

  start() {
    router.get('/', this.controlador.getOrdenes);
    router.post('/', this.controlador.postOrden);

    return router;
  }
}

export default RouterOrdenes;