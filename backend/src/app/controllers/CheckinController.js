import { subWeeks, parseISO } from 'date-fns';
import { Op } from 'sequelize';

import Checkin from '../models/Checkin';
import Subscription from '../models/Subscription';

class CheckinController {
  async store(req, res) {
    const student_id = req.params.id;

    const student_subscription = await Subscription.findOne({
      where: {
        student_id,
      },
    });

    // Check if student has subscription
    if (!student_subscription) {
      return res
        .status(400)
        .json({ error: 'Student does not have subscription' });
    }

    // Check if student has made 5 checkins this week

    const checkins = await Checkin.findAndCountAll({
      where: {
        student_id,
        created_at: {
          [Op.between]: [subWeeks(new Date(), 1), new Date()],
        },
      },
    });

    if (checkins.count >= 5) {
      return res
        .status(400)
        .json({ error: 'You have reached your limit of 5 checkins for week' });
    }

    const checkin = await Checkin.create({ student_id });

    return res.json(checkin);
  }

  async index(req, res) {
    const checkins = await Checkin.findAll({
      where: { student_id: req.params.id },
    });

    return res.json(checkins);
  }
}

export default new CheckinController();
