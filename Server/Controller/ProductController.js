import prisma from "../Database/db.config.js";

import asyncHandler from "express-async-handler";
import Joi from "joi";

const schemaProductCreation = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number(),
    rentPrice: Joi.number(),
    type: Joi.boolean().required()
});

const schemaTypeValidation = Joi.object({
    type: Joi.boolean().required()
});

class ProductController{
    createProduct = asyncHandler( async (req, res) => {
        const {error, value} = schemaProductCreation.validate(req.body, {
            stripUnknown: true
        });

        if (error){
            res.status(400)
            throw new Error(error.details[0].message)
        };

        // All attributes of product has been validated
        //Hence, extracting the value
        const {name, description, price, rentPrice, type} = value;

        // Retrieving and validating userID
        const {userID} = req.params;

        if (isNaN(userID)){
            res.status(400)
            throw new Error('Bad Request: Missing Required Field')
        }

        // Retrieving Category json string
        const {category} = req.body;

        // product must be in atleast one category
        if (category.length === 0) {
            res.status(400)
            throw new Error('Bad Request: Missing Required Field')
        }

        try{

            const result = await prisma.product.create({
                data:{
                    name: name,
                    description: description,
                    price: price,
                    rentprice: rentPrice,
                    type: type,
                    userid: Number(userID),
                    // softDelStat: false  // Always be taken as false initially from dbs
                }
            });

            const productID = result.productid;

            for (const iterator of category) {
                console.log(iterator)
                await prisma.categoryProduct.create({
                    data:{
                        productid: productID,
                        categoryid: iterator
                    }
                })
            }

            return res.status(201).json({
                message: 'Successful: Product created'
            });
        } catch (error){
            res.status(500)
            throw new Error(error.message)
        }
    });
    
    // this will be used for both selling and rending lists, hence validating type
    getProductsByType = asyncHandler(async (req, res) => {
        const {error, value} = schemaTypeValidation.validate(req.body);

        if (error){
            res.status(400)
            throw new Error(error.details[0].message)
        };

        const {type} = value;
        console.log(type)

        try{
            let productList = [];

            // if type == true, product is for sell
            // else, product is for renting
            // hence, the conditional queries below (will list according to type and more)

            if (type){
                // Will only list the items from Product table that have not been sold i.g. not in ProductSold table
                // Will only bring items that have not been soft deleted 
                productList = await prisma.$queryRaw`SELECT *
                FROM "Product"
                WHERE NOT EXISTS (
                    SELECT 1
                    FROM "ProductSold"
                    WHERE "ProductSold".productid = "Product".productid
                ) 
                AND "Product".type = ${type}
                AND "Product".softdelstat = false
                ORDER BY productid ASC;`
            } else {
                // Will only list the items from Product table that have not been sold i.g. not false as itemretrieved in ProductRent table
                // Will only bring items that have not been soft deleted 
                productList = await prisma.$queryRaw`SELECT *
                FROM "Product"
                WHERE NOT EXISTS (
                    SELECT 1
                    FROM "ProductRent"
                    WHERE "ProductRent".productid = "Product".productid
                    AND  "ProductRent".itemretrieved = false
                ) 
                AND "Product".type = ${type}
				ORDER BY productid ASC;`
            }

            console.log('productList', productList);

            let productListArr = [];    // Will be pushing all data here once everything is fetched

            // Quering such that the corresponding categories per product is fetched
            for (const iterator of productList) {
                const categoryNames = await prisma.$queryRaw`SELECT "Category".name as CategoryName
                FROM "Category"
                INNER JOIN "CategoryProduct" ON "Category".categoryid = "CategoryProduct".categoryid
                INNER JOIN "Product" ON "CategoryProduct".productid = "Product".productid
                WHERE "Product".productid = ${iterator.productid};`

                const categories = categoryNames.map(obj => obj.categoryname);  // Mapping since categoryNames was an array of objects

                iterator.Category = categories  // Putting it on iterator so that it stays under same object
                productListArr.push(iterator)   // Pushing all data in one array such that productListArr becomes arr of obj
            }
            
            return res.status(200).json(productListArr)

        } catch (error){
            res.status(500)
            throw new Error(error.message)
        }
    });

    getProductList_userID = asyncHandler(async (req, res) => {
        const {userID} = req.params;

        if (isNaN(userID)){
            res.status(400)
            throw new Error('Bad Request: Missing Required Field')
        }

        try{
            const productList = await prisma.product.findMany({
                where:{
                    userid: Number(userID),
                    softdelstat: false
                }
            })

            console.log(productList);

            let productListArr = [];    // Will be pushing all data here once everything is fetched

            // Quering such that the corresponding categories per product is fetched
            for (const iterator of productList) {
                const categoryNames = await prisma.$queryRaw`SELECT "Category".name as CategoryName
                FROM "Category"
                INNER JOIN "CategoryProduct" ON "Category".categoryid = "CategoryProduct".categoryid
                INNER JOIN "Product" ON "CategoryProduct".productid = "Product".productid
                WHERE "Product".productid = ${iterator.productid};`

                const categories = categoryNames.map(obj => obj.categoryname);  // Mapping since categoryNames was an array of objects

                iterator.Category = categories  // Putting it on iterator so that it stays under same object
                productListArr.push(iterator)   // Pushing all data in one array such that productListArr becomes arr of obj
            }
            
            return res.status(200).json(productListArr)
        } catch (error){
            res.status(500)
            throw new Error(error.message)
        }
    });

    getProductByID = asyncHandler(async (req, res) => {
        const {productID} = req.params;

        if (isNaN(productID)){
            res.status(400)
            throw new Error('Bad Request: Missing Required Field')
        }

        try {
            const result = await prisma.product.findFirst({
                where:{
                    productid: Number(productID)
                }
            })

            let categoryArr = [];

            const categoryList = await prisma.$queryRaw`SELECT "Category".name as CategoryName, "Category".categoryid as categoryID
            FROM "Category"
            INNER JOIN "CategoryProduct" ON "Category".categoryid = "CategoryProduct".categoryid
            INNER JOIN "Product" ON "CategoryProduct".productid = "Product".productid
            WHERE "Product".productid = ${Number(productID)};`

            const categories = categoryList.map(category => category.categoryname);
            const categoryIDs = categoryList.map(category => category.categoryid)

            result.Category = categories;
            result.CategoryID = categoryIDs;

            console.log(result);

            return res.status(200).json(
                result
            );
        } catch (error) {
            res.status(500)
            throw new Error(error.message)
        }
    });
    
    updateProductInformation = asyncHandler(async (req, res) => {
        const {error, value} = schemaProductCreation.validate(req.body, {
            stripUnknown: true
        }); // Validating all data inserted
        
        if (error){
            res.status(400)
            throw new Error(error.details[0].message)
        };

        const {name, description, price, rentPrice, type} = value;

        // Retrieving and validating productID
        const {productID} = req.params;

        if (isNaN(productID)){
            res.status(400)
            throw new Error('Bad Request: Missing Required Field')
        }

        // Retrieving Category json string
        const {category} = req.body;

        // product must be in atleast one category
        if (category.length === 0) {
            res.status(400)
            throw new Error('Bad Request: Missing Required Field')
        }

        try {
            // Once all data is validated, we can proceed with updating the info
            const result = await prisma.product.update({
                where:{
                    productid: Number(productID)
                },
                data:{
                    name: name,
                    description: description, 
                    price: price, 
                    rentprice: rentPrice, 
                    type: type
                }
            });

            await prisma.categoryProduct.deleteMany({
                where:{
                    productid:Number(productID)
                }
            });

            for (const iterator of category) {
                console.log(iterator)
                await prisma.categoryProduct.create({
                    data:{
                        productid: Number(productID),
                        categoryid: iterator
                    }
                })
            }

            return res.status(200).json({
                message:`Update of ${name}: Successful`
            });
        } catch (error) {
            res.status(500)
            throw new Error(error.message)
        }
    })

    softDeleteProduct = asyncHandler(async (req, res) => {
        const {productID} = req.params;

        if (isNaN(productID)){
            res.status(400)
            throw new Error('Bad Request: Missing Required Field')
        }

        try{
            const result = await prisma.product.update({
                where:{
                    productid: Number(productID)
                },
                data:{
                    softdelstat: true
                }
            });
            
            return res.status(200).json({
                message:`Delete Successful: ${result.name} deleted`
            })
        } catch (error){
            res.status(500)
            throw new Error(error.message)
        }
    })
};

export default ProductController;