import express from "express";
import {registerController,loginController,testController, forgotPasswordController} from "../controllers/authController.js"
import {isAdmin,requireSingIn} from "../middleware/authMiddleware.js";

const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post('/register',registerController);

//LOGIN || POST
router.post('/login',loginController);

//Forgot Password || POST
router.post("/forgot-password",forgotPasswordController)

//Test Routes
router.get("/test",requireSingIn,isAdmin,testController);

//protected route auth
router.get('/user-auth',requireSingIn, (req,res)=>{
    res.status(200).send({
        ok:true
    });
});

export default router;