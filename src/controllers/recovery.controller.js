import hbs from 'nodemailer-express-handlebars';
import { transporter } from '../utils/transporter.js';

export const recoverPage = (req, res) => {
  res.render('recoverPage');
};

export const recover = async (req, res) => {
  //Recibir email y validar que exista
  const { email } = req.body;
  const user = await usersManager.findByEmail(email);
  if (!user) {
    return;
  }
  //Enviar email con link

  //attach the plugin to the nodemailer transporter
  transporter.use('compile', hbs(options));
  //send mail with options
  const mail = {
    from: 'pmilitelloaveni@gmail.com',
    to: 'pmilitelloaveni@gmail.com',
    subject: 'Test',
    template: 'email',
    context: {
      name: 'Name',
    },
  };
  transporter.sendMail(mail);
};
