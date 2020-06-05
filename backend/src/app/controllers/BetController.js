import * as Yup from 'yup';
import { isAfter } from 'date-fns';
import Bet from '../models/Bet';
import Match from '../models/Match';

class BetController {
  async index(req, res) {
    const bets = await Bet.findAll({
      where: { user_id: req.userId },
    });

    return res.json(bets);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      choice: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const choice = Number(req.body.choice);

    const match = await Match.findByPk(req.params.match_id);

    if (!match) {
      return res.status(400).json({ error: 'Match does not exist' });
    }

    if (!(choice === match.blue_team || choice === match.red_team)) {
      return res.status(400).json({ error: 'Invalid team' });
    }

    const date = new Date();
    if (isAfter(date, match.start_time)) {
      return res.status(400).json({ error: 'The match has already started' });
    }

    const betExists = await Bet.findOne({
      where: { user_id: req.userId, match_id: req.params.match_id },
    });

    if (betExists) {
      betExists.update({ choice });
      return res.json(betExists);
    }

    const bet = await Bet.create({
      user_id: req.userId,
      match_id: req.params.match_id,
      date,
      choice,
    });
    return res.json(bet);
  }
}

export default new BetController();
