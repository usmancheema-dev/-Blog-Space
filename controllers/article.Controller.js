import { asyncHandler } from "../utils/asyncHandler.js"
import { Article } from "../models/Article.schema.js";
import { raw } from "express";


const creatArticle = asyncHandler(async (req, res) => {

    const { title, content, } = req.body;
    const userId = req.params.id;
    if (!userId) {
        return res.status(400).json({ msg: "User ID required (for testing)" });
    }

    const article = await Article.create({
        title: title,
        content: content,
        createdBy: userId

    })

    if (!article) {
        return res.status(400).json({ msg: 'can not make article' })
    }
    return res.status(200).json({ msg: article.content }),
        console.log(article.createdBy);

})


const getArticle = asyncHandler(async (req, res) => {
    const id = req.params.id;
    if (!id) { return res.status(400).json({ msg: 'user id not match' }) }

    const article = await Article.findById(id);

    if (!article) {
        return res.status(400).json({ msg: 'can not get user profile' })
    }
        return res.status(400).json({ msg: ' user Fetch successfuly :' })


}

)



const getSingleArticle = asyncHandler(async (req, res) => {
    const ID = req.params.id;
    if (!ID) { return res.status(400).json({ msg: 'user id not match' }) }

    const article = await Article.findById(ID);
    if (!article) {
        return res.status(400).json({ msg: ' can not get  articles' })
    }
    return res.status(200).json({ msg: article })


}

)


export { creatArticle, getArticle, getSingleArticle };