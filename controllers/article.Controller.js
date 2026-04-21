import { asyncHandler } from "../utils/asyncHandler.js"
import { Article } from "../models/Article.schema.js";
import { User } from "../models/User.schema.js";


const createArticle = asyncHandler(async (req, res) => {
    const { title, content } = req.body;
    
    if (!req.user) {
        return res.status(401).json({ msg: ' Unauthorized: User not found' });
    }

    const article = await Article.create({
        title: title,
        content: content,
        createdBy: req.user._id
    });

    if (!article) {
        return res.status(400).json({ msg: ' Cannot create article' });
    }

    return res.status(200).json({ msg: " Article created successfully", article });
});

const getArticle = asyncHandler(async (req, res) => {
    const articles = await Article.find().sort({ createdAt: -1 });

    if (!articles || articles.length === 0) {
        return res.status(404).json({ msg: ' No articles found' });
    }

    return res.status(200).json({ msg: articles });
});

const getSingleArticle = asyncHandler(async (req, res) => {

    const { title } = req.params;
    
    if (!title) {
        return res.status(400).json({ msg: 'Article title required' });
    }

    const article = await Article.findOne({ title });

    if (!article) {
        return res.status(404).json({ msg: 'Article not found' });
    }

    return res.status(200).json({ msg: article });
});


export { createArticle, getArticle, getSingleArticle };