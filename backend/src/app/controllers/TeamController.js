import * as Yup from 'yup';
import Team from '../models/Team';

class TeamController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id, name } = await Team.create(req.body);
    return res.json({
      id,
      name,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const team = await Team.findByPk(id);

    if (!team) {
      return res.status(400).json({ error: 'Team not found' });
    }

    const { name } = await team.update(req.body);

    return res.json({
      id,
      name,
    });
  }
}

export default new TeamController();
