import { createTransport } from 'nodemailer';
import twilio from 'twilio';
import { logError } from "./logger.js";
import config from './config.js';

const DEV_MAIL = config.twilio.options.dev_mail;
const DEV_PASS = config.twilio.options.dev_pass;
const DEV_NUM = config.twilio.options.dev_num;
const TWI_NUM = config.twilio.options.twilio_num;
const WSP_NUM = config.twilio.options.wsp_num;

const accountSid = config.twilio.auth.accountSid;
const authToken = config.twilio.auth.authToken;
const client = twilio(accountSid, authToken);

const transporter = createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: DEV_MAIL,
    pass: DEV_PASS
  }
});

// Enviar mensajes
const sendMessages = async (user, carrito) => {
  let wBody = `Nuevo pedido de ${user.username}!`;
  carrito.forEach(prod => wBody += `
  - ${prod.title} ${prod.price} x${prod.cantidad}
  `);

  try {
    await client.messages.create({
      body: wBody,
      from: `whatsapp:${WSP_NUM}`,
      to: `whatsapp:${DEV_NUM}`
    });

    await client.messages.create({
      body: `Hola ${user.username}! Recibimos tu pedido y ya se encuentra en proceso. Muchas gracias por confiar en nosotros!`,
      from: TWI_NUM,
      to: user.telefono
    });
  } catch (error) {
    logError(error);
  }
};

// Envio de mails con Nodemailer
const sendEmail = async (user, carrito) => {
  const { username, email, direccion, edad, telefono } = user;
  let mailOptions = {
    from: 'Proyecto Final Backend',
    to: DEV_MAIL
  };

  if (carrito == null) {
    let html = `
    <h1>Nuevo Registro de ${username}!</h1>
    <h3>Datos del usuario</h3>
    <ul>
      <li>Email: ${email}</li>
      <li>Dirección: ${direccion}</li>
      <li>Edad: ${edad}</li>
      <li>Teléfono: ${telefono}</li>
    </ul>
    `;

    mailOptions.subject = 'Nuevo Registro';
    mailOptions.html = html;
  }
  else {
    let html = `
      <h1>Nuevo Pedido de ${username}!</h1>
      <h3>Datos del usuario</h3>
      <ul>
        <li>Email: ${email}</li>
        <li>Dirección: ${direccion}</li>
        <li>Teléfono: ${telefono}</li>
      </ul>
      <h3>Productos Pedidos</h3>
      <ul>
      `;
    carrito.forEach(prod => html += `
      <li>
        <p>${prod.title} ${prod.price} x${prod.cantidad}</p>
      </li>
    `);
    html += '</ul>';

    mailOptions.subject = `Nuevo pedido de ${username}`;
    mailOptions.html = html;
  }

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    logError(error);
  }
};

export { sendMessages, sendEmail };
