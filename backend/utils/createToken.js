import JWT from "jsonwebtoken"

export const createToken = (user, res) => {
    const {email, _id} = user
    const token = JWT.sign({email, id: _id},process.env.SECURETY_JWT,{
        expiresIn: '7d',
    })

    res.cookie("token",token)

    return token
}