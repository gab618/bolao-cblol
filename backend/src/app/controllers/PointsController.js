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
          [
            Sequelize.literal(`(
          SELECT COUNT(*)
          FROM "bo5_bets" AS "Bo5Bet"
          WHERE
              "Bo5Bet"."user_id" = "User"."id"
              AND
              "Bo5Bet"."win" = true
      ) * 2`),
            'bo5_points',
          ],
        ],
      },
    });

    await Promise.all(
      users.map(async (user) => {
        const points =
          Number(user.dataValues.points) + Number(user.dataValues.bo5_points);

        await User.update({ points }, { where: { id: user.dataValues.id } });
      })
    );

    return res.json(users);
  }
}

export default new PointsController();

// /////
