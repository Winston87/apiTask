import { Router } from 'express';

import authMiddleware from './app/middlewares/auths';

import Usercontroller from './app/controller/UserController';
import Sessioncontroller from './app/controller/SessionsController';
import TaskController from './app/controller/TaskController';


const routes = new Router();

routes.post('/users', Usercontroller.store);// salvar

routes.post('/session', Sessioncontroller.store);//logout

routes.use(authMiddleware);
routes.put('/users', Usercontroller.update);// atualizar

routes.post('/tasks', TaskController.store);

routes.get('/tasks', TaskController.index);


routes.put('/tasks/:task_id', TaskController.update);
routes.delete('/tasks/:task_id', TaskController.delete);


export default routes;
