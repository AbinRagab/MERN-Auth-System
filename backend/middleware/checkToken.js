import { asyncHandler } from "../utils/AsyncHandler.js";
import jwt from 'jsonwebtoken'


export const checkToken = asyncHandler(async (req,res,next)=>{
    const token = req.cookies.token

    // check token exist or not
    if(!token) return next(new Error('Un Authorized'))

    // vrify token
    const decode = jwt.decode(token, process.env.SECURETY_JWT)
    if(!decode) return next(new Error('is Un Authorized'))
    // reAssign id in Req

    req.id = decode.id

    next()
})