import * as Yup from 'yup';
import Team from '../models/Team';

class TeamController {
  async index(req, res) {
    const teams = await Team.findAll();
    return res.json(teams);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      code: Yup.string().required().max(3),
      image: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id, name, code, image } = await Team.create(req.body);
    return res.json({
      id,
      name,
      code,
      image,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      code: Yup.string().required().max(3),
      image: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const team = await Team.findByPk(id);

    if (!team) {
      return res.status(400).json({ error: 'Team not found' });
    }

    const { name, code, image } = await team.update(req.body);

    return res.json({
      id,
      name,
      code,
      image,
    });
  }
}

export default new TeamController();
