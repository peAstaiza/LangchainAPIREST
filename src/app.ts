import express from 'express';
//routes
import chatRoutes from './routes/chat.routes'
const app = express();

app.set("port",4000);
//
app.use('/api/chat',chatRoutes);
app.use(express.json());
//

export default app;