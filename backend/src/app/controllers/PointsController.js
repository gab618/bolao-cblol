import Sequelize from 'sequelize';
import User from '../models/User';

class PointsController {
  async update(req, res) {
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

    await Promise.all(
      users.map(async (user) => {
        await User.update(
          { points: user.dataValues.points },
          { where: { id: user.dataValues.id } }
        );
      })
    );

    return res.json(users);
  }
}

export default new PointsController();

// /////
