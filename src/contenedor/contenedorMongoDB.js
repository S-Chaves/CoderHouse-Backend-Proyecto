import Contenedor from './Contenedor.js';
import { ObjectId } from 'mongodb';
import { logError } from '../utils/logger.js';

class ContenedorMongo extends Contenedor {
  constructor(model) {
    super();
    this.model = model;
  }

  async save(objeto) {
    try {
      const newElem = new this.model({ ...objeto });
      await newElem.save();
      return newElem;
    } catch (error) {
      logError(error);
    }
  }

  async getAll() {
    try {
      return await this.model.find({});
    } catch (error) {
      logError(error);
      return [];
    }
  }

  async getById(id) {
    if (id.length != 24) return { Error: 'ID no valido' };

    try {
      const elemento = await this.model.findOne({ "_id": ObjectId(id) });
      if (!elemento) return { Error: 'No encontramos lo que buscabas' };
      return elemento;
    } catch (error) {
      logError(error);
    }
  }

  async getOne(objeto) {
    try {
      return await this.model.findOne(objeto);
    } catch (error) {
      logError(error);
    }
  }

  async getMany(objeto) {
    try {
      return await this.model.find(objeto);
    } catch (error) {
      logError(error);
    }
  }

  async updateById(id, elem) {
    try {
      await this.model.updateOne({ "_id": ObjectId(id) }, { $set: elem });
    } catch (error) {
      logError(error);
    }
  }

  async deleteById(id) {
    try {
      await this.model.deleteOne({ "_id": ObjectId(id) });
    } catch (error) {
      logError(error);
    }
  }

  async deleteAll() {
    try {
      await this.model.deleteMany({});
    } catch (error) {
      logError(error);
    }
  }
};

export default ContenedorMongo;