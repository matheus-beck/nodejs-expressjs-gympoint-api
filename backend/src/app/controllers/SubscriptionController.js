import * as Yup from 'yup';
import { parseISO, subWeeks } from 'date-fns';

import Plan from '../models/Plan';
import Student from '../models/Student';
import Subscription from '../models/Subscription';

import Queue from '../../lib/Queue';
import SubscriptionMail from '../jobs/SubscriptionMail';

class SubscriptionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { student_id, plan_id, start_date } = req.body;

    const checkSubscription = await Subscription.findOne({
      where: { student_id },
    });

    if (checkSubscription) {
      return res
        .status(400)
        .json({ error: 'Student already has a subscription.' });
    }

    const plan = await Plan.findOne({ where: { id: plan_id } });

    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exist.' });
    }

    const price = plan.duration * plan.price;

    const end_date = addMonths(parseISO(start_date), plan.duration);

    const student = await Student.findOne({ where: { id: student_id } });

    if (!student) {
      return res.status(400).json({ error: 'Student does not exist.' });
    }

    const subscription = await Subscription.create({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });

    await Queue.add(SubscriptionMail.key, {
      student_name: student.name,
      student_email: student.email,
      plan_title: plan.title,
      start_date,
      end_date,
      price,
    });

    return res.json(subscription);
  }

  async index(req, res) {
    const subscriptions = await Subscription.findAll({
      attributes: ['student_id', 'plan_id', 'start_date', 'end_date', 'price'],
    });

    return res.json(subscriptions);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      plan_id: Yup.number(),
      start_date: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { plan_id, start_date } = req.body;

    const subscription = await Subscription.findByPk(req.params.id);

    const oldPlan = await Plan.findOne({ where: { id: req.params.id } });

    if (!oldPlan) {
      return res
        .status(400)
        .json({ error: 'Plan to be changed does not exist.' });
    }

    const newPlan = await Plan.findOne({ where: { id: plan_id } });

    if (!newPlan) {
      return res.status(400).json({ error: 'Plan does not exist.' });
    }

    const price = newPlan.duration * newPlan.price;

    const end_date = addMonths(parseISO(start_date), newPlan.duration);

    const { student_id } = await subscription.update(
      start_date,
      end_date,
      price
    );

    return res.json({
      plan_id,
      student_id,
      start_date,
      end_date,
      price,
    });
  }

  async delete(req, res) {
    const subscription = await Subscription.findByPk(req.params.id);

    if (!subscription) {
      return res.status(401).json({ error: 'Subscription not found' });
    }

    await subscription.destroy();

    return res.json(subscription);
  }
}

export default new SubscriptionController();
