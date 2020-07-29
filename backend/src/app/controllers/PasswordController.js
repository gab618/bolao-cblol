import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import Mail from '../../lib/Mail';
import User from '../models/User';

class PasswordController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
    });

    const validation = await schema.isValid(req.body);
    if (!validation) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email } = req.body;

    if (email) {
      const user = await User.findOne({ where: { email } });
      if (user) {
        const resetToken = jwt.sign({ email }, user.password_hash, {
          expiresIn: '1h',
        });

        await Mail.sendMail({
          to: `${user.name} <${user.email}>`,
          subject: 'Alterar Senha',
          // text: `${process.env.FRONTEND_URL}reset_password?token=${resetToken}`,
          template: 'forgot',
          context: {
            username: user.name,
            url: `${process.env.FRONTEND_URL}reset_password?token=${resetToken}`,
          },
        });

        return res
          .status(200)
          .json({ message: 'Password reset link sent to user' });
      }
    }
    return res.json({ message: 'Password reset link sent to user' });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      token: Yup.string().required(),
      password: Yup.string().min(6).required(),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    const validation = await schema.isValid(req.body);
    if (!validation) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { token, password } = req.body;

    const { email } = jwt.decode(token);

    if (email) {
      const user = await User.findOne({ where: { email } });
      if (user) {
        try {
          await promisify(jwt.verify)(token, user.password_hash);
          await user.update({ password });
          return res.json({ message: 'Password has been reset' });
        } catch (err) {
          return res.status(401).json({ error: `Invalid token provided` });
        }
      }
    }

    return res.status(400).json({ error: 'Email not found' });
  }
}

export default new PasswordController();
