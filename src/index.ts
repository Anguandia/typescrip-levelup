import dotenv from "dotenv";
import express from 'express';
import * as routes from "./routes";
import cors from 'cors';
import socket from 'socket.io';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({}));
routes.register(app);

const server = app.listen(port);

const io = socket(server);
io.on('connection', (sock: any) => {
  sock.on('typing', (data: any) => {
    sock.broadcast.emit('typing', data.message);
  });
  sock.on('notification', (data: any) => {
    sock.broadcast.emit('notification', data);
  });
});
