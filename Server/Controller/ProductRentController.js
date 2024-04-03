import prisma from "../Database/db.config.js";

import asyncHandler from "express-async-handler";

class ProductRentController{
    rentProduct = asyncHandler(async (req, res) => {
        const {rentToID, rentFromID, productID, rentDate, dueDate} = req.body;

        if (isNaN(rentToID) || isNaN(rentFromID) || isNaN(productID)){
            res.status(400);
            throw new Error('Bad Request: Missing Required Fields')
        }


        // At first we validate the existence of both rentie and owner
        const rentToUser = await prisma.user.findFirst({
            where:{
                userid: Number(rentToID)
            }
        })

        if (!rentToUser){
            res.status(404)
            throw new Error(`Buyer with ID ${rentToID} does not exist`)
        }

        const rentFromUser = await prisma.user.findFirst({
            where:{
                userid: Number(rentFromID)
            }
        });

        if (!rentFromUser){
            res.status(404)
            throw new Error(`Seller with ID ${rentFromID} does not exist`)
        }

        try{
            const rentdate = new Date(rentDate);    // Formatting the day it has been rented
            const formateedRentDate = rentdate.toISOString();

            const duedate = new Date(dueDate);  // Formatting the day it is due
            const formattedDuedate = duedate.toISOString();

            // If itemretrieved is false, the item is currently in rent
            const ifItemRented = await prisma.productRent.findFirst({
                where:{
                    productid: Number(productID),
                    itemretrieved: false
                }
            });

            if (ifItemRented){
                return res.status(409).json({
                    message:`Item ID ${productID} already rented`
                })
            }

            // Once existence is validated, we register the transaction
            const result = await prisma.productRent.create({
                data:{
                    rentto_id: Number(rentToID),
                    rentfrom_id: Number(rentFromID),
                    productid: Number(productID),
                    rentdate: formateedRentDate,
                    duedate: formattedDuedate
                }
            });

            return res.status(201).json({
                message:`${rentFromUser.name} rented to ${rentToUser.name}`
            })
        } catch (error){
            res.status(500);
            throw new Error(error.message);
        }
    });

    getRentedProduct_UserID = asyncHandler(async (req, res) => {
        const {rentFromID} = req.params;

        try {
            const itemLists = await prisma.productRent.findMany({
                where:{
                    rentfrom_id: Number(rentFromID)
                }
            })
            console.log(itemLists);
            let rentedItems = [];

            for (const iterator of itemLists) {
                const product = await prisma.product.findFirst({
                    where:{
                        productid: iterator.productid   // Fetching all relevent information of the product
                    }
                })
                const productCategory = await prisma.$queryRaw`SELECT "Category".name
                FROM "Category"
                INNER JOIN "CategoryProduct"
                ON "CategoryProduct".categoryid = "Category".categoryid
                WHERE "CategoryProduct".productid = ${iterator.productid}`  // Bringing all categories based on products

                const categories = productCategory.map(obj => obj.name);  // Mapping since categoryNames was an array of objects

                iterator.name = product.name;
                iterator.description = product.description
                iterator.rentprice = product.rentprice
                iterator.Category = categories

                rentedItems.push(iterator); // All relevent information has been pushed to a new arr
            }

            return res.status(200).json(rentedItems);

        } catch (error) {
            res.status(500);
            throw new Error(error.message);
        }
    })

    getRentedProduct_RentTo = asyncHandler(async (req, res) => {
        const {rentToID} = req.params;

        try {
            const itemLists = await prisma.productRent.findMany({
                where:{
                    rentto_id: Number(rentToID)
                }
            })
            console.log(itemLists);
            let rentedItems = [];

            for (const iterator of itemLists) {
                const product = await prisma.product.findFirst({
                    where:{
                        productid: iterator.productid
                    }
                })
                
                const productCategory = await prisma.$queryRaw`SELECT "Category".name
                FROM "Category"
                INNER JOIN "CategoryProduct"
                ON "CategoryProduct".categoryid = "Category".categoryid
                WHERE "CategoryProduct".productid = ${iterator.productid}`  // Bringing all categories based on products

                const categories = productCategory.map(obj => obj.name);  // Mapping since categoryNames was an array of objects

                iterator.name = product.name;
                iterator.description = product.description
                iterator.rentprice = product.rentprice
                iterator.Category = categories

                rentedItems.push(iterator); // All relevent information has been pushed to a new arr
            }

            return res.status(200).json(rentedItems);

        } catch (error) {
            res.status(500);
            throw new Error(error.message);
        }
    })

    updateRetrievalStatus = asyncHandler(async (req, res) => {
        const {productID} = req.params;

        if (isNaN(productID)){
            res.status(400);
            throw new Error('Bad Request: Missing Required Fields')
        }

        try{
            const isItemRented = await prisma.productRent.findFirst({
                where:{
                    productid: Number(productID),
                    itemretrieved: false
                }
            })

            if (!isItemRented){
                res.status(404)
                throw new Error(`Product with ID ${productID} is not rented`)
            };

            console.log(isItemRented);
            await prisma.productRent.update({
                where:{
                    productrent_id: isItemRented.productrent_id
                },
                data:{
                    itemretrieved: true
                }
            })

            return res.status(200).json({
                message:`Rent status updated`
            })
        } catch (error){
            res.status(500);
            throw new Error(error.message);
        }
    })
}

export default ProductRentController;