import userModel from "../models/userModel.js";

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// These plans mirror the client pricing cards for the local credit flow.
const creditPlans = [
    {id: 'Basic', credits: 100, price: 10},
    {id: 'Advanced', credits: 500, price: 50},
    {id: 'Business', credits: 5000, price: 250},
]

const registerUser = async (req, res)=>{
    try{
        const name = req.body.name?.trim();
        const email = req.body.email?.trim().toLowerCase();
        const {password}= req.body;

        if(!name || !email || !password)
        {
            return res.status(400).json({success:false, message: 'Please fill in all required fields'})
        }

        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(409).json({success:false, message: 'An account with this email already exists. Please log in instead.'})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name, 
            email, 
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        // Return credits with auth data so the client can hydrate the navbar immediately.
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

        res.json({success: true, token, user: {name: user.name}, credits: user.creditBalance})

    } catch(error){
        console.log(error)
        if(error.code === 11000){
            return res.status(409).json({success: false, message: 'An account with this email already exists. Please log in instead.'})
        }

        res.status(500).json({success: false, message: 'Unable to create account. Please try again.'})
    }
}

const loginUser = async (req, res)=>{
    try{
        const email = req.body.email?.trim().toLowerCase();
        const {password} = req.body;

        if(!email || !password){
            return res.status(400).json({success:false, message: 'Please enter your email and password'})
        }

        const user = await userModel.findOne({email})

        if(!user){
            return res.status(401).json({success:false, message: 'Invalid email or password'})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(isMatch){
            // Include the current credit balance to avoid an extra request after login.
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

             res.json({success: true, token, user: {name: user.name}, credits: user.creditBalance})
        }else{
            return res.status(401).json({success:false, message: 'Invalid email or password'})
        }

    } 
    catch(error)
    {
       console.log(error)
       res.status(500).json({success: false, message: 'Unable to log in. Please try again.'})
    }
}

const userCredits = async(req, res)=>{
    try{
        const userId= req.userId;


        const user = await userModel.findById(userId)
        if(!user){
            return res.status(404).json({success: false, message: 'User not found'})
        }

        res.json({success: true, credits: user.creditBalance, user: {name: user.name}})
    }catch(error){

        console.log(error.message)
       res.json({success: false, message: error.message})

    }
}

const addCredits = async(req, res)=>{
    try{
        const {planId} = req.body;
        const userId = req.userId;
        // Validate plan IDs server-side; client pricing data is not trusted.
        const plan = creditPlans.find((item)=> item.id === planId);

        if(!plan){
            return res.status(400).json({success: false, message: 'Invalid credit plan'})
        }

        const user = await userModel.findByIdAndUpdate(
            userId,
            {$inc: {creditBalance: plan.credits}},
            // Return the updated document so the response contains the new balance.
            {returnDocument: 'after'}
        );

        if(!user){
            return res.status(404).json({success: false, message: 'User not found'})
        }

        res.json({
            success: true,
            message: `${plan.credits} credits added`,
            credits: user.creditBalance,
            user: {name: user.name}
        })
    }catch(error){
       console.log(error.message)
       res.json({success: false, message: error.message})
    }
}

export {registerUser, loginUser, userCredits, addCredits}
    
