import * as Yup from 'yup';
import Match from '../models/Match';
import Team from '../models/Team';
import Round from '../models/Round';

class MatchController {
  async index(req, res) {
    const matches = await Match.findAll({
      attributes: [
        'id',
        'start_time',
        'winner',
        'is_bo5',
        'red_team_wins',
        'blue_team_wins',
      ],
      include: [
        {
          model: Team,
          as: 'blue',
          attributes: ['id', 'code', 'name'],
        },
        {
          model: Team,
          as: 'red',
          attributes: ['id', 'code', 'name'],
        },
        {
          model: Round,
          as: 'round',
          attributes: ['name', 'strategy'],
        },
      ],
    });

    return res.json(matches);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      start_time: Yup.date().required(),
      blue_team: Yup.number().required(),
      red_team: Yup.number().required(),
      round_id: Yup.number(),
      is_bo5: Yup.boolean(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const match = await Match.create(req.body);
    return res.json(match);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      start_time: Yup.date(),
      blue_team: Yup.number(),
      red_team: Yup.number(),
      winner: Yup.number(),
      is_bo5: Yup.boolean(),
      blue_team_wins: Yup.number(),
      red_team_wins: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const match = await Match.findByPk(id);

    if (!match) {
      return res.status(400).json({ error: 'Match not found' });
    }

    const {
      blue_team,
      red_team,
      start_time,
      winner,
      blue_team_wins,
      red_team_wins,
    } = await match.update(req.body);

    return res.json({
      id,
      blue_team,
      red_team,
      start_time,
      winner,
      blue_team_wins,
      red_team_wins,
    });
  }
}

export default new MatchController();
