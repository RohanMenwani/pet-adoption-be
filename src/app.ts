import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import { json } from 'body-parser';

const app = express();

app.use(cors());
app.use(json());


// health
app.get('/health', (req, res) => res.json({ ok: true }));


export default app;
