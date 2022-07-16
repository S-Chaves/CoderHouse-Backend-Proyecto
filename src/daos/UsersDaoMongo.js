import ContenedorMongo from "../contenedor/contenedorMongoDB.js";
import userModel from '../models/usersModel.js';
import { logError } from "../utils/logger.js";

let instance = null;

class UsersDaoMongo extends ContenedorMongo {
  constructor() {
    super(userModel);
  }

  static getInstance() {
    if (!instance) instance = new UsersDaoMongo();
    return instance;
  }

  async getUserById(id, done) {
    try {
      await this.model.findById(id, (err, user) => {
        return done(err, user);
      }).clone();
    } catch (error) {
      logError(error);
    }
  };
}

export default UsersDaoMongo;