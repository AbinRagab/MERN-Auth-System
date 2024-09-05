import { nanoid } from "nanoid"
import bcryptjs from 'bcryptjs'
import crypto from 'crypto'
import { asyncHandler } from "../../utils/AsyncHandler.js"
import 'cookie-parser'
import { User } from "../../DB/models/user.model.js"
import { createToken } from "../../utils/createToken.js"
import { sendByEmailtrap, sendEmailForgetPassword, sendEmailUpdatedPassword, sendWelcomeEmail } from "../../sendEmail/sendByEmailtrap.js"
import  jwt  from 'jsonwebtoken';


// sign Up Controller
export const signup = asyncHandler(async(req,res,next)=>{
    const {name, email , password} = req.body

    // Check If Email is Found Or Not
    const isUser = await User.findOne({email})
    if(isUser) return next(new Error('Email Is Already Exist..!'))

    // Hash Password
    const hashPassword = await bcryptjs.hash(password, 10)

    // confirm Email Code send To Email
    const confirmEmailCode = nanoid(6)

    // Create User In Db
    const newUser = await User.create({
        name,
        email,
        password: hashPassword,
        confirmEmailCode,
        confirmEmailCodeDateEnd: Date.now() + 24 * 60 * 60 * 1000 //24h
    })

    // jwt create Token And Put Token In Cookies
    const token = createToken(newUser, res)

    // Send Email By Mail Trap
    await sendByEmailtrap(email,confirmEmailCode )

    //Response
    res.status(201).json({
        success: true,
        message: 'Account Created SuccessFully..',
        newUser,
        token
    })

})

// Confirm Email And Send Welcome Massege
export const confirmEmail = asyncHandler(async(req, res, next)=>{
    const {code} = req.body
    // check that Codwe is Found And Date Is Not Ended
    const user = await User.findOne({
        confirmEmailCode: code,
        confirmEmailCodeDateEnd: {$gt: Date.now()}
    })
    // if User Is NOt Founded
    if(!user) return next(new Error('The Code is Not Valid Or Expaired!'))
    // Make confirmEmailCode , confirmEmailCodeDateEnd undefiend
    user.confirmEmailCode = undefined;
    user.confirmEmailCodeDateEnd = undefined;
    user.activation = true
    await user.save()

    // send Welcome Email
    await sendWelcomeEmail( user.email , user.name)

    // res
    res.status(200).json({
        success: true,
        message: "Your Account Activated Successfully",
        user,
    })
})

// Log in
export const login = asyncHandler(async(req,res,next)=>{
    const {email, password} = req.body

    // check that Email is Not Found
    const user = await User.findOne({email})
    if(!user) return next(new Error('The Email Or PassWord Is Incorrect'))
    
    // Check that Password Is Match or No
    const correctPassword = bcryptjs.compareSync(password, user.password)
    if(!correctPassword) return next(new Error('The Email Or PassWord Is Incorrect'))    

    // update Login Date
    user.lastloginDate = new Date();
    await user.save()

    // create token and set it in Cookies
    const token = createToken(user,res )
    // return res
    res.status(200).json({
        success: true,
        message: 'Welcome Again',
        token,
        user
    })
})

// Send Reset PassWord email
export const forgetPassword = asyncHandler(async(req, res, next)=>{
    const {email} = req.body

    // Check if This PassWord Exist Or No
    const user = await User.findOne({email})
    if(!user) return next(new Error('this Email Is Not Found'))
    
    // create Reset Token
    const resetToken = crypto.randomBytes(10).toString("hex")
    const resetTokenExpire = Date.now() + 1 *  60 * 60 * 1000

    user.resetTokenExpire =resetTokenExpire;
    user.resetToken = resetToken;
    await user.save()

    await sendEmailForgetPassword(email,`${process.env.CLIENT_URL}/resetPassword/${resetToken}`,res)

    res.status(200).json({
        success: true,
        message: "Chech Your Mails"
    })


})
// Set New Passwords
export const resetPassword = asyncHandler(async (req,res,next)=>{
    const {token} = req.params
    const {password} = req.body

    // serch on db for User By resetToken and resetTokenExpire
    const user = await User.findOne({
        resetToken: token,
        resetTokenExpire: {$gt: Date.now()}
    })

    // Ceck If This Token Is Valid Or No
    if(!user) return next(new Error('THis Token Is Invalied or is Expire'))

    // Update PassWord
    const hashPassword = bcryptjs.hashSync(password, 10)
    
    user.password = hashPassword;
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;
    
    await user.save()

    // send Email That PassWord Update SuccessFully
    await sendEmailUpdatedPassword(user.email, res)
    res.json({
        success: true,
        message: 'Password Updated Successfully'
    })

})
// logout By Delete Coockes
export const logout = asyncHandler(async(req,res,next)=>{
    res.clearCookie('token')

    res.status(200).json({
        success: true,
        message: "Log Out Successfully"
    })
})
// checkAuth
export const checkAuth = asyncHandler(async(req,res,next)=>{
    

    const token = req.headers.token
    console.log(token);
    
    const payload = jwt.verify(token, process.env.SECURETY_JWT)
    const user = await User.findById(payload.id).select("-password")
    if(!user) return next(new Error('this User Is Not Exist!!'))

    // checkAuth
    res.json({
        success: true,
        user    
    })
})