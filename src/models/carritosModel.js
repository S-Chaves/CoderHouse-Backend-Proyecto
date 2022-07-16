import mongoose from 'mongoose';

const CarritosSchema = new mongoose.Schema({
  productos: { type: Array, require: true, default: [] },
  email: { type: String, require: true },
  direccion: { type: String, require: true }
});
const carritosModel = mongoose.model('carrito', CarritosSchema);

export default carritosModel;