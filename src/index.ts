import dotenv from "dotenv";
import express from 'express';
import * as routes from "./routes";
import bodyParser from "body-parser";
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({}))
routes.register( app );

app.listen(port);