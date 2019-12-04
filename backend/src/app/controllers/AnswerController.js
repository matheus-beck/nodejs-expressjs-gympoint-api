import * as Yup from 'yup';
import Queue from '../../lib/Queue';
import Student from '../models/Student';
import HelpOrder from '../models/HelpOrder';
import AnswerOrderMail from '../jobs/AnswerOrderMail';

class AnswerController {
  async store(req, res) {
    const order_id = req.params.id;

    const order = await HelpOrder.findOne({ where: { id: order_id } });

    if (!order) {
      return res.status(400).json({ error: 'Help order does not exist.' });
    }

    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { answer } = req.body;

    const answered_order = await order.update({
      answer,
      answer_at: new Date(),
    });

    const student = await Student.findOne({
      where: { id: answered_order.student_id },
    });

    await Queue.add(AnswerOrderMail.key, {
      student_name: student.name,
      student_email: student.email,
      question: answered_order.question,
      answer,
      answer_at: new Date(),
    });

    return res.json(answered_order);
  }

  async index(req, res) {
    const orders = await HelpOrder.findAll({
      where: { answer: null },
    });

    return res.json(orders);
  }
}

export default new AnswerController();
