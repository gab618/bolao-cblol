import * as Yup from 'yup';
import Match from '../models/Match';

class MatchController {
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
}

export default new MatchController();
