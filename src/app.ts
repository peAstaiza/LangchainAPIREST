import express from 'express';
import bodyParser from 'body-parser';
import chatRoutes from './routes/chat.routes';
const app = express();
// settings
app.set("port",4000);
//middlewares
app.use(bodyParser.json());
//routes
app.use('/api/chat',chatRoutes);
//

export default app;