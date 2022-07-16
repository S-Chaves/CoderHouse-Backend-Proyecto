import UsersDaoMongo from '../daos/UsersDaoMongo.js';
import CarritosDaoMongo from '../daos/CarritosDaoMongo.js';

const usersApi = UsersDaoMongo.getInstance();
const carritosApi = CarritosDaoMongo.getInstance();

const facebookStrategy = async (accessToken, refreshToken, profile, done) => {
  const user = await usersApi.getOne({ userId: profile.id });
  if (user) return done(null, user);
  const email = profile.emails[0].value;

  const newUser = {
    userId: profile.id,
    username: profile.name.givenName,
    email,
    avatar: profile.photos[0].value
  };

  const carrito = { email, direccion: '' };
  await carritosApi.save(carrito);
  const finalUser = await usersApi.save(newUser);
  return done(null, finalUser);
};

export default facebookStrategy;