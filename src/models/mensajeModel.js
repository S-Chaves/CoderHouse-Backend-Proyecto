import mongoose from 'mongoose';

const MensajesSchema = new mongoose.Schema({
  id: { type: Number, require: true },
  author: {
    id: { type: String, require: true, max: 100 },
    username: { type: String, require: true },
    apellido: String,
    edad: Number,
    alias: String,
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