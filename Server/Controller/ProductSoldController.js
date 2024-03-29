import prisma from "../Database/db.config.js";

import asyncHandler from "express-async-handler";

class ProductSoldController{
    sellProduct = asyncHandler(async (req, res) => {
        const {buyerID, sellerID, productID} = req.body;

        if (isNaN(buyerID) || isNaN(sellerID) || isNaN(productID)){
            res.status(400);
            throw new Error('Bad Request: Missing Required Fields')
        }

        try{
            await prisma.productSold.create({
                data:{
                    buyerid: Number(buyerID),
                    sellerid: Number(sellerID),
                    productid: Number(productID)
                }
            });

            const result = await prisma.product.update({
                where:{
                    productid: Number(productID)
                },
                data: {
                    userid: Number(buyerID)
                }
            })

            return res.status(201).json({
                message:`${result.name} sold`
            })
        } catch (error){
            res.status(500);
            throw new Error(error.message);
        }
    })
}

export default ProductSoldController;