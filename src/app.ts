import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import { json } from 'body-parser';
import authRoutes from './routes/auth.route';

const app = express();

app.use(cors());
app.use(json());

//routes
app.use('/api/auth', authRoutes);

// health
app.get('/health', (req, res) => res.json({ ok: true }));


export default app;
