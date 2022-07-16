import CustomError from "../classes/CustomError.js";

class Contenedor {
  async save() {
    throw new CustomError(500, "Falta implementar método save en subclase");
  }

  async getAll() {
    throw new CustomError(500, "Falta implementar método getAll en subclase");
  }

  async getById() {
    throw new CustomError(500, "Falta implementar método getById en subclase");
  }

  async updateById() {
    throw new CustomError(500, "Falta implementar método updateById en subclase");
  }

  async deleteById() {
    throw new CustomError(500, "Falta implementar método deleteById en subclase");
  }

  async deleteAll() {
    throw new CustomError(500, "Falta implementar método deleteAll en subclase");
  }
};

export default Contenedor;