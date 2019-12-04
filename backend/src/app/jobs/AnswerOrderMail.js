import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class AnswerOrderMail {
  get key() {
    return 'AnswerOrderMail';
  }

  async handle({ data }) {
    const { student_name, student_email, question, answer, answer_at } = data;

    console.log('A fila executou');

    await Mail.sendMail({
      to: `${student_name} <${student_email}>`,
      subject: 'Sua dúvida foi respondida no GymPoint!',
      template: 'answer_order',
      context: {
        student: student_name,
        question,
        answer,
        answer_at: format(
          parseISO(answer_at),
          "'dia' dd 'de' MMMM', às ' H:mm'h' ",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new AnswerOrderMail();
