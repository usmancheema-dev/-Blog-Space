import express from 'express';
import cors from 'cors';
import path from 'path';
const app = express();
app.use(cors({origin: "*"}));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "30kb" }));

export { app };