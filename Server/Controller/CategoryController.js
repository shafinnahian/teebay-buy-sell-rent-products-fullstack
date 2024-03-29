import prisma from "../Database/db.config.js";
import asyncHandler from "express-async-handler";

class Category {
    getAllCategory = asyncHandler(async (req, res) => {
        const result = await prisma.category.findMany();

        return res.status(200).json(result)
    })
}

export default Category;