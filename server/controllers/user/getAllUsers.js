const User = require("../../models/userSchema");

const getAllUsers = async(req,res)=>{
    try {
        const data = await User.find({});

        if(!data){
            return res.status(404).json({
                msge : "NO data found",
                
            })
           
        }
         return res.json({
           data,
         });
    } catch (error) {
         return res.json({
         msge : "Error"
         });
    }
}

module.exports = { getAllUsers };