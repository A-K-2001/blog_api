const User = require("../models/User");
const { verifyTokenAndAuthorization } = require("./verifyToken");

const CryptoJS = require("crypto-js");
const router = require ("express").Router();

//  update
router.put("/:id",verifyTokenAndAuthorization,async (req,res)=>{
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,process.env.PASS_SEC
        ).toString();
    }

    try{
       
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set: req.body
        },{new:true}
        );
        res.status(200).json(updatedUser);
    }catch(err){
        res.status(500).json(err);
    }
});

// delete user

router.delete("/:id",verifyTokenAndAuthorization, async (req,res) => {

        if(req.body.password){
            req.body.password = CryptoJS.AES.encrypt(
                req.body.password,process.env.PASS_SEC
            ).toString();
        }

        try{

                const user = await User.findById(req.params.id);
                try{
                    await  Post.deleteMany({username : user.username});
                    await User.findByIdAndDelete(req.params.id);
                    res.status(200).json("User has been deleted....");
                }catch(err){
                    res.status(501).json(err);
                }

                User.deleteOne(username= req.body.username);


        }catch(err){
            res.status(400).json("user not found!!");
        }

   


});

module.exports = router