import express, { Request, Response } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import CargosController from './controllers/CargosController';
import DashboardController from './controllers/DashboardController';
import FolhaDePagamentoController from './controllers/FolhaDePagamentoController';
import FuncionariosController from './controllers/FuncionariosController';
import RelatoriosController from './controllers/RelatoriosController';

const cargosController = new CargosController();
const funcionariosController = new FuncionariosController();
const folhaDePagamentoController = new FolhaDePagamentoController();
const dashboardController = new DashboardController();
const relatoriosController = new RelatoriosController();

const routes = express.Router();
const upload = multer(uploadConfig);

routes.get('/', (req: Request, res: Response) => {
  return res.json({ response: 'ok' });
});

routes.get('/dashboard', dashboardController.index);

// Cargos
routes.get('/cargos', cargosController.index);
routes.get('/cargos/:id', cargosController.show);
routes.post('/cargos', cargosController.create);
routes.put('/cargos/:id', cargosController.update);
routes.delete('/cargos/:id', cargosController.delete);

// Funcionarios
routes.get('/funcionarios', funcionariosController.index);
routes.get('/funcionarios/:id', funcionariosController.show);
routes.post(
  '/funcionarios',
  upload.single('avatar'),
  funcionariosController.create
);
routes.put('/funcionarios/:id', funcionariosController.update);
routes.delete('/funcionarios/:id', funcionariosController.delete);

// Folha de Pagamento
routes.get('/folha/:id', folhaDePagamentoController.index);
routes.post('/folha', folhaDePagamentoController.create);

// Relatorios
routes.get('/relatorios', relatoriosController.index);
routes.get('/relatorios/:id', relatoriosController.show);
routes.post('/relatorios', relatoriosController.create);
routes.put('/relatorios/:id', relatoriosController.update);
routes.delete('/relatorios/:id', relatoriosController.delete);

export default routes;
