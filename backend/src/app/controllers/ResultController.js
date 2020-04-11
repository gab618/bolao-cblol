import Round from '../models/Round';
import Match from '../models/Match';
import Bet from '../models/Bet';
import User from '../models/User';

class MatchController {
  async update(req, res) {
    const round = await Round.findByPk(req.params.id, {
      attributes: [],
      include: [
        {
          model: Match,
          attributes: ['id', 'winner'],
        },
      ],
    });

    round.Matches.forEach(async (match) => {
      await Bet.update(
        { win: true },
        {
          where: {
            match_id: match.id,
            choice: match.winner,
          },
        }
      );
    });

    const users = await User.findAll({ attributes: ['id'] });
    users.forEach(async (user) => {
      const points = await Bet.count({
        where: {
          user_id: user.dataValues.id,
          win: true,
        },
      });
      await User.update(
        {
          points,
        },
        { where: { id: user.dataValues.id } }
      );
    });

    return res.json(round.Matches);
  }
}

export default new MatchController();
