import dotenv from 'dotenv';
dotenv.config();
import app from './app';

const PORT = process.env.PORT || 4000;

async function start() {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start().catch(err => {
  console.error('Failed to start server', err);
  process.exit(1);
});
