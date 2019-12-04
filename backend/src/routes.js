import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import PlanController from './app/controllers/PlanController';
import AnswerController from './app/controllers/AnswerController';
import StudentController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';
import CheckinController from './app/controllers/CheckinController';
import QuestionController from './app/controllers/QuestionController';
import SubscriptionController from './app/controllers/SubscriptionController';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.get('/students/:id/checkins', CheckinController.index);
routes.post('/students/:id/checkins', CheckinController.store);

routes.get('/students/:id/help-orders', QuestionController.index);
routes.post('/students/:id/help-orders', QuestionController.store);

routes.use(authMiddleware);

routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);

routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

routes.get('/subscriptions', SubscriptionController.index);
routes.post('/subscriptions', SubscriptionController.store);
routes.put('/subscriptions/:id', SubscriptionController.update);
routes.delete('/subscriptions/:id', SubscriptionController.delete);

routes.get('/help-orders', AnswerController.index);
routes.post('/help-orders/:id/answer', AnswerController.store);

export default routes;
