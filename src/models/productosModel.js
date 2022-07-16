import mongoose from 'mongoose';

const ProductosSchema = new mongoose.Schema({
  title: { type: String, require: true, max: 100 },
  price: { type: Number, require: true },
  thumbnail: { type: String, require: true },
  categoria: { type: String, require: true }
});
const prodModel = mongoose.model('producto', ProductosSchema);

export default prodModel;