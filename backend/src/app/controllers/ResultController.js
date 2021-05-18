import { Op } from 'sequelize';
import Round from '../models/Round';
import Match from '../models/Match';
import Bet from '../models/Bet';
import Bo5Bet from '../models/Bo5Bet';

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
        await Bo5Bet.update(
          { win: true, completed: true },
          {
            where: {
              blue_team_wins: match.blue_team_wins,
              red_team_wins: match.red_team_wins,
            },
          }
        );
        await Bo5Bet.update(
          { win: false, completed: true },
          {
            where: {
              blue_team_wins: { [Op.not]: match.blue_team_wins },
              red_team_wins: { [Op.not]: match.red_team_wins },
            },
          }
        );
      })
    );

    return res.json(round.Matches);
  }
}

export default new ResultController();
