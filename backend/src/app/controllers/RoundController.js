import * as Yup from 'yup';
import Round from '../models/Round';

class MatchController {
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
