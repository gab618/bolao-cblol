import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import TeamController from './app/controllers/TeamController';
import MatchController from './app/controllers/MatchController';
import BetController from './app/controllers/BetController';

import authMiddleware from './app/middlewares/auth';
import adminMiddleware from './app/middlewares/admin';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.get('/matches', MatchController.index);

routes.use(authMiddleware);
routes.put('/users', UserController.update);
routes.post('/files', upload.single('file'), FileController.store);

routes.post('/bet/:match_id', BetController.store);

routes.use(adminMiddleware);
routes.post('/team', TeamController.store);
routes.put('/team/:id', TeamController.update);

routes.post('/match', MatchController.store);
routes.put('/match/:id', MatchController.update);
export default routes;
