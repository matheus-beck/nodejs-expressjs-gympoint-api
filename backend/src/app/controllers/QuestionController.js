import * as Yup from 'yup';
import Student from '../models/Student';
import HelpOrder from '../models/HelpOrder';

class QuestionController {
  async store(req, res) {
    const student_id = req.params.id;

    const student = await Student.findOne({ where: { id: student_id } });

    if (!student) {
      return res.status(400).json({ error: 'Student does not exist.' });
    }

    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { question } = req.body;

    const order = await HelpOrder.create({ student_id, question });

    return res.json(order);
  }

  async index(req, res) {
    const orders = await HelpOrder.findAll({
      where: { student_id: req.params.id },
    });

    return res.json(orders);
  }
}

export default new QuestionController();
