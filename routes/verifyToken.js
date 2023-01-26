const jwt = require("jsonwebtoken");
const User = require("../models/User");


const verifyToken = async(req ,res ,next)=>{
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(' ')[1];
        // console.log("no");
        try {
            // console.log("yes1");

            const user = jwt.verify(token, process.env.JWT_SEC)
        
            // console.log(user);
            const newuser = await User.findById(user.id);
            // console.log(newuser);
            req.user=newuser;
            next();
        }catch(err){
            res.status(401).json("you are not alowed to do that!");
        }            
    

    }else{
        return res.status(401).json("you are not authenticated!");
    }
};




const verifyTokenAndAuthorization = (req,res,next)=>{
    verifyToken(req,res,()=>{
        // console.log(req.user._id.toString());
        // console.log(req.params.id);
        if(req.user._id.toString() === req.params.id ){
            next();
        }else{
            res.status(403).json("you are not alowed to do that!");
        }
    });
};

const verifyTokenAndblog = (req,res,next)=>{
    // console.log("yes");
    
    verifyToken(req,res,()=>{
        // console.log(req.user.username);
        // console.log(req.body.username);
        if(req.user.username === req.body.username ){
            next();
        }else{
            res.status(403).json("you are not alowed to do that!");
        }
    });
};



module.exports = {verifyToken, verifyTokenAndAuthorization ,verifyTokenAndblog };