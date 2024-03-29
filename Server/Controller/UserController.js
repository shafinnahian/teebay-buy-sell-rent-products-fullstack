import prisma from "../Database/db.config.js";

import asyncHandler from "express-async-handler"
import bcrypt from 'bcrypt';
import Joi from "joi";
import Jwt from "jsonwebtoken";

const schemaCreation = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required()
});

const schemaLogin = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
});

class UserController {

    registerUser = asyncHandler(async (req, res) => {
        const {error, value} = schemaCreation.validate(req.body);   // Validating the required data
    
        if (error) {    // If validation fails, we throw the error to errorMiddleware
            res.status(400)
            throw new Error(error.details[0].message)
        }
    
        const {name, email, password} = value;  // Once validated, we extract the data
    
        try{
            const isUserExists = await prisma.user.findFirst({
                where: {
                    email: email    // @unique, hence will always return if user exists
                }
            })
        
            if (isUserExists){
                res.status(409);    // Bad conflict
                throw new Error('Conflict: Email already registered')
            }
        
            const hashedPassword = await bcrypt.hash(password, 10);
        
            const newUser = await prisma.user.create({
                data:{
                    name: name,
                    email: email,
                    password: hashedPassword
                }
            })
            
            // if no error was caught, we return with the corresponding statusCode & message
            return res.status(201).json({
                message: 'Successful: User Created',
                ID: newUser.insertId
            });
    
        } catch (error) {
            res.status(500);
            throw new Error(error.message);
        }
    });

    loginUser = asyncHandler(async (req, res) => {
        const jwtSecret = process.env.JWT_SECRET || "aksodjfioasudf980s7adfiu";

        const {error, value} = schemaLogin.validate(req.body, {
            stripUnknown: true  // As we don't need Name, we are stripping it off from the function
        })

        if (error){
            res.status(400);
            throw new Error(error.details[0].message)
        }

        const {email, password} = value;

        try{
            const isUserExists = await prisma.user.findFirst({
                where:{
                    email: email
                }
            });

            if (!isUserExists){
                res.status(404)
                throw new Error('User with email not registered')
            }
            
            // If the user exists, we'll compare the inputed password w/ the pre existing hashed one
            const isPasswordMatched = await bcrypt.compare(password, isUserExists.password);

            if (!isPasswordMatched){
                res.status(409)
                throw new Error('Password did not match')
            }

            const expiredInSeconds = 24*60*60;   // 24hours in seconds

            //The payload will have all necessary data for the dashboard
            const tokenPayload = {
                Email : isUserExists.email,
                Name: isUserExists.name,
                AdminID : isUserExists.userid
            };

            const token = Jwt.sign(tokenPayload, jwtSecret,{
                expiresIn: expiredInSeconds, // Login expires in 24 hours
            });

            return res.status(200).json({
                admin:tokenPayload,
                token
            });

        } catch (error){
            res.status(500);
            throw new Error(error.message);
        }
    })

    getUserInfo = asyncHandler(async (req, res) => {
        const {userID} = req.params;

        if (isNaN(userID)){
            res.status(400);
            throw new Error(`Bad Request: ID is ${userID}`)
        }

        try{
            const isUserExists = await prisma.user.findFirst({
                where:{
                    userid: Number(userID)
                }
            });

            if (!isUserExists){
                res.statusCode = 404;
                throw new Error('User with ID not registered')
            }

            return res.status(200).json({
                email: isUserExists.email,
                name: isUserExists.name
            });

        } catch (error){
            res.status(500)
            throw new Error(error.message);
        }
    });
}

export default UserController;