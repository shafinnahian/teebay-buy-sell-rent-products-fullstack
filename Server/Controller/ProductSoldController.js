import prisma from "../Database/db.config.js";

import asyncHandler from "express-async-handler";

class ProductSoldController{
    sellProduct = asyncHandler(async (req, res) => {
        const {buyerID, sellerID, productID} = req.body;

        if (isNaN(buyerID) || isNaN(sellerID) || isNaN(productID)){
            res.status(400);
            throw new Error('Bad Request: Missing Required Fields')
        }


        // At first we validate the existence of both buyer and seller
        const isBuyerExists = await prisma.user.findFirst({
            where:{
                userid: Number(buyerID)
            }
        })

        if (!isBuyerExists){
            res.status(404)
            throw new Error(`Buyer with ID ${buyerID} does not exist`)
        }

        const isSellerExists = await prisma.user.findFirst({
            where:{
                userid: Number(sellerID)
            }
        });

        if (!isSellerExists){
            res.status(404)
            throw new Error(`Seller with ID ${sellerID} does not exist`)
        }

        try{
            // Once existence is validated, we register the transaction
            await prisma.productSold.create({
                data:{
                    buyerid: Number(buyerID),
                    sellerid: Number(sellerID),
                    productid: Number(productID)
                }
            });

            // Since owner changed, we must update Product.userid
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
    });

    listBoughtProducts = asyncHandler( async (req, res) => {
        const {buyerID} = req.params;

        if (isNaN(buyerID)){
            res.status(400);
            throw new Error('Bad Request: Missing Required Fields')
        }

        try {
            const productList = await prisma.$queryRaw`SELECT 
            "Product".productid AS productID, "Product".name AS name, "Product".price AS price, "Product".description AS description
            FROM "Product"
            INNER JOIN "ProductSold" ON "Product".productid="ProductSold".productid
            WHERE "ProductSold".buyerid = ${Number(buyerID)}`;

            let productArr = []

            for (const iterator of productList) {
                const categoryNames = await prisma.$queryRaw`SELECT "Category".name as CategoryName
                FROM "Category"
                INNER JOIN "CategoryProduct" ON "Category".categoryid = "CategoryProduct".categoryid
                INNER JOIN "Product" ON "CategoryProduct".productid = "Product".productid
                WHERE "Product".productid = ${iterator.productid};`

                const categories = categoryNames.map(obj => obj.categoryname);  // Mapping since categoryNames was an array of objects

                iterator.Category = categories  // Putting it on iterator so that it stays under same object
                productArr.push(iterator)   // Pushing all data in one array such that productListArr becomes arr of obj
            }

            return res.status(200).json(productArr);

        } catch (error) {
            res.status(500)
            throw new Error(error.message)
        }
    });

    listSoldProducts = asyncHandler( async (req, res) => {
        const {sellerid} = req.params;

        if (isNaN(sellerid)){
            res.status(400);
            throw new Error('Bad Request: Missing Required Fields')
        }

        try {
            const productList = await prisma.$queryRaw`SELECT 
            "Product".productid AS productID, "Product".name AS name, "Product".price AS price, "Product".description AS description
            FROM "Product"
            INNER JOIN "ProductSold" ON "Product".productid="ProductSold".productid
            WHERE "ProductSold".sellerid = ${Number(sellerid)}`;

            let productArr = []

            for (const iterator of productList) {
                const categoryNames = await prisma.$queryRaw`SELECT "Category".name as CategoryName
                FROM "Category"
                INNER JOIN "CategoryProduct" ON "Category".categoryid = "CategoryProduct".categoryid
                INNER JOIN "Product" ON "CategoryProduct".productid = "Product".productid
                WHERE "Product".productid = ${iterator.productid};`

                const categories = categoryNames.map(obj => obj.categoryname);  // Mapping since categoryNames was an array of objects

                iterator.Category = categories  // Putting it on iterator so that it stays under same object
                productArr.push(iterator)   // Pushing all data in one array such that productListArr becomes arr of obj
            }

            return res.status(200).json(productArr);

        } catch (error) {
            res.status(500)
            throw new Error(error.message)
        }
    })
}

export default ProductSoldController;