import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import { json } from 'body-parser';
import authRoutes from './routes/auth.route';
import petRoutes from './routes/pet.route';
import applicationRoutes from './routes/application.route';
import { errorHandler } from './middlewares/error.middleware';

const app = express();

app.use(cors());
app.use(json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/applications', applicationRoutes);

// health
app.get('/health', (req, res) => res.json({ ok: true }));

// global error handler
app.use(errorHandler);

export default app;
