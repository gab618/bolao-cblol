import { Op } from 'sequelize';
import Round from '../models/Round';
import Match from '../models/Match';
import Bet from '../models/Bet';

class ResultController {
  // update points by round
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

    await Round.update(
      { completed: true },
      {
        where: { id: req.params.id },
      }
    );

    await Promise.all(
      round.Matches.map(async (match) => {
        await Bet.update(
          { win: true, completed: true },
          {
            where: {
              match_id: match.id,
              choice: match.winner,
            },
          }
        );
        await Bet.update(
          { win: false, completed: true },
          {
            where: {
              match_id: match.id,
              choice: { [Op.not]: match.winner },
            },
          }
        );
      })
    );

    return res.json(round.Matches);
  }
}

export default new ResultController();
