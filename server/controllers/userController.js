import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from 'google-auth-library';

const googleAuth = async (req, res) => {
    try {
        const { credential } = req.body; // Google ID token from frontend

        if (!credential) {
            return res.json({ success: false, message: 'No Google credential provided' });
        }

        // Verify with Google
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { sub: googleId, email, name, picture } = payload;

        // Find or create user
        let user = await userModel.findOne({ email });

        if (user) {
            // Existing user — link Google ID if not already linked
            if (!user.googleId) {
                user.googleId = googleId;
                await user.save();
            }
        } else {
            // New Google user
            user = new userModel({
                name,
                email,
                googleId,
                // no password, creditBalance defaults to 5
            });
            await user.save();
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.json({
            success: true,
            token,
            user: { name: user.name, _id: user._id }
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Google authentication failed' });
    }
}

const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        if (!name || !email || !password) {
            return res.json({success:false, message: 'Please fill all the fields'})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name, email, password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

        res.json({success:true, token, user:{name: user.name, _id: user._id}})

    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false, message: 'User not found'})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(isMatch){
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
            return res.json({success:true, token, user:{name: user.name, _id: user._id}})  
        } else{
            return res.json({success:false, message: 'Invalid credentials'})    
        }
    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }
}

const userCredits = async (req, res) => {
    try{
        const {userId} = req;
        const user = await userModel.findById(userId)
        res.json({success:true, credits:user.creditBalance, user:{name:user.name, _id:user._id}})

    } catch(error){
        console.log(error.message)
        res.json({success: false, message:error.message})
    }
}

const addCredits = async (req, res) => {
    try {
        const userId = req.userId;
        const { credits } = req.body;

        if (!userId || !credits) {
            return res.json({ success: false, message: 'Missing userId or credits' });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        user.creditBalance += Number(credits);
        await user.save();

        res.json({ success: true, message: 'Credits added successfully', credits: user.creditBalance });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { googleAuth, registerUser, loginUser, userCredits, addCredits };