import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
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
          text: `token: ${resetToken}`,
        });

        return res.status(201).json({ ok: 'dale' });
      }
    }
    return res.status(400).json({ error: 'User not found' });
  }
}

export default new PasswordController();
