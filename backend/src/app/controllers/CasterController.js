import User from '../models/User';
import File from '../models/File';

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
}

export default new CasterController();
