import JWT from "jsonwebtoken"

export const createToken = (user, res) => {
    const {email, _id} = user
    const token = JWT.sign({email, id: _id},process.env.SECURETY_JWT,{
        expiresIn: '7d',
    })

    res.cookie("token",token,{
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
    })


    return token
}