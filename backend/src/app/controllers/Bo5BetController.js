import * as Yup from 'yup';
import { isAfter } from 'date-fns';
import Bo5Bet from '../models/Bo5Bet';
import Match from '../models/Match';
import User from '../models/User';

class Bo5BetController {
  async index(req, res) {
    const bo5Bets = await Bo5Bet.findAll({
      where: { user_id: req.userId },
    });

    return res.json(bo5Bets);
  }

  async show(req, res) {
    const bo5Bets = await Bo5Bet.findAll({
      where: { user_id: req.params.id, completed: true },
    });

    return res.json(bo5Bets);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      blueTeamWins: Yup.number().min(0).max(3).required(),
      redTeamWins: Yup.number().min(0).max(3).required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const blueChoice = Number(req.body.blueTeamWins);
    const redChoice = Number(req.body.redTeamWins);

    const match = await Match.findByPk(req.params.match_id);

    if (!match) {
      return res.status(400).json({ error: 'Match does not exist' });
    }

    if (!match.is_bo5) {
      return res.status(400).json({ error: 'Match must be Best of 5' });
    }

    const user = await User.findByPk(req.userId);
    const isCaster = user.dataValues.is_caster;

    const date = new Date();
    if (!isCaster && isAfter(date, match.start_time)) {
      return res.status(400).json({ error: 'The match has already started' });
    }

    const betExists = await Bo5Bet.findOne({
      where: { user_id: req.userId, match_id: req.params.match_id },
    });

    if (betExists) {
      betExists.update({
        blue_team_wins: blueChoice,
        red_team_wins: redChoice,
      });
      return res.json(betExists);
    }

    const bet = await Bo5Bet.create({
      user_id: req.userId,
      match_id: req.params.match_id,
      date,
      blue_team_wins: blueChoice,
      red_team_wins: redChoice,
    });
    return res.json(bet);
  }
}

export default new Bo5BetController();
