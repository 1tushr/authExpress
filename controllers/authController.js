const User =require( "../models/users");
exports.signup= async(req,res)=>{
    const newUser=await User.create(req.body);
    res.status(201).json({
        status:'success',
        data:{
            user:newUser
        }
    });
};


