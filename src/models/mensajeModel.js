import mongoose from 'mongoose';

const MensajesSchema = new mongoose.Schema({
  id: { type: Number, require: true },
  author: {
    id: { type: String, require: true, max: 100 },
    username: { type: String, require: true },
    apellido: { type: String, require: true },
    edad: { type: Number, require: true },
    alias: { type: String, require: true },
    avatar: { type: String, require: true }
  },
  text: {
    id: { type: Number, require: true },
    hora: { type: Date, require: true },
    text: { type: String, require: true }
  }
});
const mensajeModel = mongoose.model('mensaje', MensajesSchema);

export default mensajeModel;