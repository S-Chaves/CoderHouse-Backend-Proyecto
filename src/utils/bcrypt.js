import bcrypt from 'bcrypt';

const isValidPassword = (user, password) => {
  if (!user.password) return false;
  return bcrypt.compareSync(password, user.password);
};

const createHash = password => {
  return bcrypt.hashSync(
    password,
    bcrypt.genSaltSync(10),
    null);
};

export { isValidPassword, createHash };