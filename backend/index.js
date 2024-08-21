import express from 'express'
import { dbConnect } from './DB/dbConnection.js'
import dotenv from 'dotenv'
import authRouter from './modules/User/user.routes.js'
import cookieParser from 'cookie-parser'

const app = express()

const port = 5000

dotenv.config()
app.use(express.json())
app.use(cookieParser())

app.use('/auth',authRouter)

app.all('*',(req, res, next)=>{
    return next(new Error('Not Found Page!'),{cause: 404})
})

app.use((error, req, res, next)=>{
    const statusError = error.cause || 500

    res.status(statusError).json({
        success: false,
        message: error.message
    })
})
app.listen(port, () =>{ 
    dbConnect() 
    console.log(`Example app listening on port ${port}!`)
})