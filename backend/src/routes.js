import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import TeamController from './app/controllers/TeamController';
import MatchController from './app/controllers/MatchController';
import BetController from './app/controllers/BetController';
import RoundController from './app/controllers/RoundController';
import ResultController from './app/controllers/ResultController';

import authMiddleware from './app/middlewares/auth';
import adminMiddleware from './app/middlewares/admin';
import ScheduleController from './app/controllers/ScheduleController';
import PointsController from './app/controllers/PointsController';
import PasswordController from './app/controllers/PasswordController';
import Bo5BetController from './app/controllers/Bo5BetController';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/', (req, res) => res.send('ok'));
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.post('/password', PasswordController.store);
routes.put('/password', PasswordController.update);

routes.get('/matches', MatchController.index);
routes.get('/round/:id', RoundController.show);
routes.get('/rounds', RoundController.index);
routes.get('/bets/:id', BetController.show);
routes.get('/bo5/:id', Bo5BetController.show);
routes.get('/schedule', ScheduleController.index);

routes.use(authMiddleware);
routes.put('/users', UserController.update);
routes.post('/files', upload.single('file'), FileController.store);

routes.get('/bets', BetController.index);
routes.post('/bet/:match_id', BetController.store);
routes.get('/bo5', Bo5BetController.index);
routes.post('/bo5/:match_id', Bo5BetController.store);
routes.get('/team', TeamController.index);

routes.use(adminMiddleware);
routes.post('/team', TeamController.store);
routes.put('/team/:id', TeamController.update);

routes.post('/round', RoundController.store);
routes.put('/round/:id', RoundController.update);

routes.post('/match', MatchController.store);
routes.put('/match/:id', MatchController.update);

routes.put('/result/:id', ResultController.update);
routes.put('/points', PointsController.update);
export default routes;
