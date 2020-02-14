import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import Debug from 'debug';
import { serve, setup } from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { config } from 'dotenv';

import routes from './routes';
import { serverErrorHandler, notFoundErrorHandler } from './middlewares';

config();
const { BASE_URL } = process.env;

const swaggerDoc = YAML.load(path.join(__dirname, './docs/docs.yml'));

const debug = Debug('dev');

const app = express();
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(`${BASE_URL}/docs`, serve, setup(swaggerDoc));

app.use(morgan('dev'));

app.use(BASE_URL, routes);
app.use(BASE_URL, serverErrorHandler);
app.use(notFoundErrorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, debug(`server running on port: ${PORT}`));

export default app;
