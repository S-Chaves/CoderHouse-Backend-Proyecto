import MensajesDaoMongo from "../daos/MensajesDaoMongo.js";
import { logRuta } from '../utils/logger.js';

class ChatController {
  constructor() {
    this.api = MensajesDaoMongo.getInstance();
  }

  getChat = async (req, res) => {
    const user = req.session.user;
    logRuta(req);

    res.render('chat', { user });
  };

  getChatByEmail = async (req, res) => {
    const email = req.params.email;
    const mensajes = await this.api.getMany({ "author.id": email });
    logRuta(req);

    res.render('layouts/chatEmail', { mensajes });
  };
}

export default ChatController;