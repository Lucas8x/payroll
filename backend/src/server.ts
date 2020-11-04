export const port = process.env.PORT || 3001;
import path from 'path';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import routes from './routes';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.listen(port, () => {
  console.log(`Server listen port: ${port}`);
});
