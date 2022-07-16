import { Router } from 'express';
import ChatController from '../controllers/chat.controller.js';

const router = new Router();

class RouterChat {
	constructor() {
		this.controlador = new ChatController();
	}

	start() {
		router.get('/', this.controlador.getChat);
		router.get('/:email', this.controlador.getChatByEmail);

		return router;
	}
}

export default RouterChat;