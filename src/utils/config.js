import 'dotenv/config';

const config = {
  sess: {
    options: {
      secret: 'secreto',
      cookie: {
        httpOnly: false,
        secure: false
      },
      rolling: true,
      resave: true,
      saveUninitialized: false
    }
  },
  db: {
    connstr: process.env.MONGO_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  passport: {
    fb: {
      clientID: process.env.FB_CLIENT_ID,
      clientSecret: process.env.FB_CLIENT_SECRET,
      callbackURL: process.env.FB_CALLBACK_URL,
      profileFields: ['id', 'name', 'emails', 'photos']
    }
  },
  srv: {
    port: process.env.PORT,
  },
  twilio: {
    auth: {
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN
    },
    options: {
      dev_mail: 'xxxxxxxx@gmail.com',
      dev_pass: 'mdirxxxxxxxdcfe',
      dev_num: '+54221xxxxxxx',
      twilio_num: '+19378575278',
      wsp_num: '+14155238886'
    }
  }
};

export default config;