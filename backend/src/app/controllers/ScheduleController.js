import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';

import Round from '../models/Round';
import Match from '../models/Match';
import Team from '../models/Team';

class ScheduleController {
  async index(req, res) {
    const { date } = req.query;
    const parsedDate = parseISO(date);

    const round = await Round.findOne({
      attributes: ['id', 'name', 'start_time', 'strategy', 'completed'],
      where: {
        start_time: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      include: [
        {
          model: Match,
          attributes: ['id', 'start_time', 'winner'],
          order: [['created_at', 'ASC']],
          include: [
            {
              model: Team,
              as: 'blue',
              attributes: ['id', 'name', 'code', 'image'],
            },
            {
              model: Team,
              as: 'red',
              attributes: ['id', 'name', 'code', 'image'],
            },
          ],
        },
      ],
    });

    return res.json(round);
  }
}

export default new ScheduleController();
