import { DB_Name } from './constant.js'
import { DBConnection } from './connection.js';
import { router } from './routes/user.route.js'
import { app } from './app.js';
import dotenv from 'dotenv';
import { Articlerouter } from './routes/article.route.js';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: './.env' });

const port = process.env.PORT || 8080;

// API routes
app.use('/api/v1/users', router);
app.use('/api/v1/articles', Articlerouter);

// Serve frontend
app.use(express.static(path.join(__dirname, 'frontend')));

DBConnection()
   .then(() => {
      app.listen(port, () => console.log(`server successfully connected on port:${port}`));
   })
   .catch((err) => console.log(`error happened in connecting ${DB_Name}: ${err}`));