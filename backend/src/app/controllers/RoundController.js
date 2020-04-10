import * as Yup from 'yup';
import Round from '../models/Round';
import Match from '../models/Match';
import Team from '../models/Team';

class MatchController {
  async index(req, res) {
    const rounds = await Round.findAll({
      attributes: ['id', 'name', 'start_time', 'strategy', 'completed'],
      include: [
        {
          model: Match,
          attributes: ['id', 'start_time', 'winner'],
          include: [
            {
              model: Team,
              as: 'blue',
              attributes: ['id', 'code', 'image'],
            },
            {
              model: Team,
              as: 'red',
              attributes: ['id', 'code', 'image'],
            },
          ],
        },
      ],
    });

    return res.json(rounds);
  }

  async show(req, res) {
    const round = await Round.findByPk(req.params.id, {
      attributes: ['id', 'name', 'start_time', 'strategy', 'completed'],
      include: [
        {
          model: Match,
          attributes: ['id', 'start_time', 'winner'],
          include: [
            {
              model: Team,
              as: 'blue',
              attributes: ['id', 'code', 'name', 'image'],
            },
            {
              model: Team,
              as: 'red',
              attributes: ['id', 'code', 'name', 'image'],
            },
          ],
        },
      ],
    });

    return res.json(round);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      start_time: Yup.date().required(),
      completed: Yup.boolean(),
      strategy: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const round = await Round.create(req.body);
    return res.json(round);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      start_time: Yup.date(),
      completed: Yup.boolean(),
      strategy: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const round = await Round.findByPk(id);

    if (!round) {
      return res.status(400).json({ error: 'Match not found' });
    }

    const updatedRound = await round.update(req.body);

    return res.json({ updatedRound });
  }
}

export default new MatchController();
