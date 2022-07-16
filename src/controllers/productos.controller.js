import ProductosDaoMongo from '../daos/ProductosDaoMongo.js';

class ProductosController {
  constructor() {
    this.api = ProductosDaoMongo.getInstance();
  }

  getProds = async (req, res) => {
    res.json(await this.api.getAll());
  };

  getProdByCategoria = async (req, res) => {
    const categoria = req.params.categoria;
    res.json(await this.api.getMany({ categoria }));
  };

  getProdById = async (req, res) => {
    const id = req.params.id;
    res.json(await this.api.getById(id));
  };

  postProds = async (req, res) => {
    const producto = req.body;
    if (producto) await this.api.save(producto);
    res.json(producto);
  };

  putProds = async (req, res) => {
    const id = req.params.id;
    const newProd = req.body;

    if (id && newProd) await this.api.updateById(id, newProd);
    res.json(newProd);
  };

  deleteProds = async (req, res) => {
    const id = req.params.id;
    if (id) await this.api.deleteById(id);
    res.end();
  };
}

export default ProductosController;