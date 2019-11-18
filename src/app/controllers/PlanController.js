import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { title } = req.body;

    const plan = await Plan.findOne({ where: { title } });

    if (plan) {
      return res.status(400).json({ error: 'Plan already exists.' });
    }

    const { duration, price } = await Plan.create(req.body);

    return res.json({
      plan: {
        title,
        duration,
        price,
      },
    });
  }
}

export default new PlanController();
