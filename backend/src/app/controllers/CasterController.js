import * as Yup from 'yup';
import { isAfter } from 'date-fns';
import User from '../models/User';
import File from '../models/File';
import Match from '../models/Match';
import Bet from '../models/Bet';

class CasterController {
  async index(req, res) {
    const casters = await User.findAll({
      where: { is_caster: true },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json(casters);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      choice: Yup.number().required(),
      casterId: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const choice = Number(req.body.choice);
    const casterId = Number(req.body.casterId);

    const match = await Match.findByPk(req.params.match_id);

    if (!match) {
      return res.status(400).json({ error: 'Match does not exist' });
    }

    if (!(choice === match.blue_team || choice === match.red_team)) {
      return res.status(400).json({ error: 'Invalid team' });
    }

    const user = await User.findByPk(casterId);
    const isCaster = user.dataValues.is_caster;

    const date = new Date();
    if (!isCaster && isAfter(date, match.start_time)) {
      return res.status(400).json({ error: 'The match has already started' });
    }

    const betExists = await Bet.findOne({
      where: { user_id: casterId, match_id: req.params.match_id },
    });

    if (betExists) {
      betExists.update({ choice });
      return res.json(betExists);
    }

    const bet = await Bet.create({
      user_id: casterId,
      match_id: req.params.match_id,
      date,
      choice,
    });
    return res.json(bet);
  }
}

export default new CasterController();
