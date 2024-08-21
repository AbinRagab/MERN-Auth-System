import { Router } from "express";
import * as userController from './user.controller.js'
import { checkToken } from "../../middleware/checkToken.js";

const router = Router()

router.get('/check-Auth',checkToken,userController.checkAuth)
router.post('/login',userController.login)
router.put('/confirmEmail',userController.confirmEmail)
router.post('/signup',userController.signup)
router.post('/logout',userController.logout)
router.post('/forgetPassword',userController.forgetPassword)
router.post('/resetPassword/:token',userController.resetPassword)


export default router