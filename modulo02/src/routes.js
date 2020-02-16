import { Router } from 'express';
import UserControler from './app/controllers/UserController';
import SessionControler from './app/controllers/SessionController';

const routes = new Router();

routes.post('/users', UserControler.store);
routes.post('/sessions', SessionControler.store);

export default routes;
