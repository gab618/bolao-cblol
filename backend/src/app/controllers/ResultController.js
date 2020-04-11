import Round from '../models/Round';
import Match from '../models/Match';
import Bet from '../models/Bet';

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

    async function setWins() {
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
    }

    async function addPoints() {}

    await setWins();
    // await addPoints();

    return res.json(round.Matches);
  }
}

export default new MatchController();
