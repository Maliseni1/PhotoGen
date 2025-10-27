import express from "express";
import {registerUser, loginUser, userCredits, addCredits} from "../controllers/userController.js";
import userAuth from "../middlewares/auth.js";


const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/credits', userAuth, userCredits)
userRouter.post('/add-credits', userAuth, addCredits)

export default userRouter;
