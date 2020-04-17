import Sequelize from 'sequelize';
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

    const users = await User.findAll({
      attributes: {
        include: [
          [
            Sequelize.literal(`(
          SELECT COUNT(*)
          FROM "bets" AS "Bet"
          WHERE
              "Bet"."user_id" = "User"."id"
              AND
              "Bet"."win" = true
      )`),
            'points',
          ],
        ],
      },
    });

    users.forEach(async (user) => {
      await User.update(
        {
          points: user.dataValues.points,
        },
        { where: { id: user.dataValues.id } }
      );
    });

    return res.json(round.Matches);
  }
}

export default new MatchController();
