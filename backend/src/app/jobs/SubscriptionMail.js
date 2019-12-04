import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class SubscriptionMail {
  get key() {
    return 'SubscriptionMail';
  }

  async handle({ data }) {
    const {
      student_name,
      student_email,
      plan_title,
      start_date,
      end_date,
      price,
    } = data;

    console.log('A fila executou');

    await Mail.sendMail({
      to: `${student_name} <${student_email}>`,
      subject: 'Bem vindo ao GymPoint!',
      template: 'subscription',
      context: {
        student: student_name,
        plan: plan_title,
        date_begin: format(
          parseISO(start_date),
          "'dia' dd 'de' MMMM', às ' H:mm'h' ",
          {
            locale: pt,
          }
        ),
        date_end: format(
          parseISO(end_date),
          "'dia' dd 'de' MMMM', às ' H:mm'h' ",
          {
            locale: pt,
          }
        ),
        price,
      },
    });
  }
}

export default new SubscriptionMail();
