import 'dotenv/config';
import App from './app';  
import HealthController from './controllers/health';
import { PORT } from './config/env';

const app = new App(PORT, [new HealthController()]);
app.listen();