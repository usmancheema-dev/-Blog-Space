import { DB_Name } from './constant.js'
import dotenv from 'dotenv';
import { DBConnection } from './connection.js';
import { router } from './routes/user.route.js'
import { app } from './app.js';
import { Articlerouter } from './routes/article.route.js';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config(); 


const port = process.env.PORT || 2000;

// API routes
app.use('/api/v1/users', router);
app.use('/api/v1/articles', Articlerouter);

// Serve frontend
app.use(express.static(path.join(__dirname, 'frontend')));
app.listen(port, () => console.log(`Server running on port: ${port}`));
DBConnection()
.then(() => {console.log(`DB ${DB_Name} connected successfully`);})
.catch((err) => {
    console.error(`Error connecting ${DB_Name}:`, err);
    process.exit(1); // ensures Railway knows app failed
});
