import * as Yup from 'yup';
import Match from '../models/Match';
import Team from '../models/Team';

class MatchController {
  async index(req, res) {
    const matches = await Match.findAll({
      attributes: ['id', 'start_time', 'winner'],
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
      ],
    });

    return res.json(matches);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      start_time: Yup.date().required(),
      blue_team: Yup.number().required(),
      red_team: Yup.number().required(),
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
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const match = await Match.findByPk(id);

    if (!match) {
      return res.status(400).json({ error: 'Match not found' });
    }

    const { blue_team, red_team, start_time, winner } = await match.update(
      req.body
    );

    return res.json({
      id,
      blue_team,
      red_team,
      start_time,
      winner,
    });
  }
}

export default new MatchController();
