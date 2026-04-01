import { Router } from "express";
import {creatArticle , getSingleArticle , getArticle } from "../controllers/article.Controller.js";
const Articlerouter = Router();


Articlerouter.post('/article/:id',creatArticle);
Articlerouter.get('/',getArticle);
Articlerouter.get('/:id',getSingleArticle);

export{Articlerouter};