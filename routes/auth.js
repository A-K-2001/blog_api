const User = require("../models/User");

const router = require("express").Router();

const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// register
router.post("/register", async (req, res) => {
    // console.log(req.body);
    const newUser = new User({
       
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC)
            .toString(),
    });

    try {

        const savedUser = await newUser.save();
        // console.log(savedUser);
        res.status(201).json(savedUser);

    } catch (err) {
        // console.log (err);
        res.status(500).json(err);
    }

});

// login

router.post("/login", async (req, res) => {
    try {
        
        const user = await User.findOne({ username: req.body.username });
        if(!user) {res.status(401).json("wrong credentials!"); return;}
        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
        const orginalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        if(orginalpassword !== req.body.password) { res.status(401).json("wrong credentials!"); return;}

        const accessToken = jwt.sign({
            id: user._id
        },process.env.JWT_SEC,
        {expiresIn:"3d"}
        );

        const {password, ...others}= user._doc;

        res.status(200).json({...others,accessToken});

    }
    catch (err) {
        res.status(500).json(err)
    }
});


module.exports = router