import UsersDaoMongo from '../daos/UsersDaoMongo.js';
import { isValidPassword, createHash } from '../utils/bcrypt.js';
import { sendEmail } from '../utils/messages.js';

const usersApi = UsersDaoMongo.getInstance();

const loginStrategy = async (email, password, done) => {
  const user = await usersApi.getOne({ email });
  if (!user) return done(null, false);
  if (!isValidPassword(user, password)) return done(null, false);

  return done(null, user);
};

const signupStrategy = async (req, username, password, done) => {
  const user = await usersApi.getOne({ username });
  if (user) return done(null, false);

  const { email, direccion, edad, telefono, avatar, passwordCopy } = req.body;
  if (password != passwordCopy) return done(null, false);
  
  const newUser = {
    userId: '',
    username: username,
    password: createHash(password),
    email,
    direccion,
    edad,
    telefono,
    avatar
  };

  await sendEmail(newUser, null);
  const finalUser = await usersApi.save(newUser);
  return done(null, finalUser);
};

export { loginStrategy, signupStrategy };