import mongoose from "mongoose"


export const dbConnect = async ()=>{
    return await mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log('DB connected Succesfully..')
    }).catch((err)=>{
        console.log('DB Catch Err',err);
    })
}


// vx1358bv9ZJapVlK
// 