import mongoose from 'mongoose';

const OrdenesSchema = new mongoose.Schema({
  productos: { type: Array, require: true, default: [] },
  ordenId: { type: Number, require: true },
  hora: { type: Date, require: true },
  estado: { type: String, require: true, default: 'generada' },
  email: { type: String, require: true }
});
const ordenesModel = mongoose.model('order', OrdenesSchema);

export default ordenesModel;