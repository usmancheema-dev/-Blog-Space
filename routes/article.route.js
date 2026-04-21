import { Router } from "express";
import { createArticle, getSingleArticle, getArticle } from "../controllers/article.Controller.js";
import { JwtVerification } from "../middlewares/jwt.auth.js";

const Articlerouter = Router();

Articlerouter.post('/creates', JwtVerification, createArticle);

Articlerouter.get('/', getArticle);
Articlerouter.get('/:title', getSingleArticle);

export { Articlerouter };