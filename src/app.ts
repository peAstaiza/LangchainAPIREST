import express from 'express';

const app = express();
app.set("port",4000)
console.log(app.get("port"))

export default app;