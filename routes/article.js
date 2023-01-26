const router = require("express").Router();
const { verifyTokenAndblog } = require("./verifyToken");
const Article = require("../models/Article");

const collect = require('collect.js');


//create post

router.put("/", verifyTokenAndblog ,async (req, res) => {

    // console.log("yes");
    const post = new Article(req.body);
    try {
        const savedPost = await post.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(501).json(err);
    }

});


//update

router.put("/:id",verifyTokenAndblog , async (req, res) => {

    try {
        const post = await Article.findById(req.params.id);
        // console.log(req.body.username)
        // console.log(req.body.username)

        if (req.body.username === req.body.username) {
            try {
                const updatedPost = await Article.findByIdAndUpdate(req.params.id,
                    {
                        $set: req.body
                    }, { new: true }
                    );
                    // console.log(updatedPost);
                    res.status(200).json(updatedPost);
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("you can only update your post...")
        }
    } catch (err) {
        res.status(500).json(err);
    }
});


//delete

router.delete("/:id",async (req, res) => {

    try {
        const post = await Article.findById(req.params.id);
        if (post.username === req.body.username) {

            try {
                await Article.findByIdAndDelete(req.params.id);
                res.status(200).json("post deleted...");
            } catch (err) {
                res.status(500).json(err);
            }

        } else {
            res.status(401).json("you can delete your post only..");
        }
    } catch (err) {
        res.status(500).json(err);
    }

});

// get all post

router.get("/", async (req, res) => {
    const catName = req.query.cat;
    const username = req.query.user;
    const page = Number(req.query.page) || 1
    const skips = (page-1) * 10 || 10

    try {
        let posts;
        if (username) {
            posts = await Article.find({username});
        } else if (catName) {
            posts = await Article.find({
                category: {
                    $in: [catName],
                },
            });
        } else {
            // console.log("yes");
             posts = await Article.find();
        }
        // console.log(posts);
        posts = collect(posts).skip(skips).slice(0,10)
        res.status(200).json(posts);



    } catch (err) {
        res.status(500).json(err);
    }
});


// get post


router.get("/:id", async (req, res) => {
    try {
        
        const post = await Article.findById(req.params.id);

        res.status(200).json(post);
    } catch (err) {
        res.json(500).json(err);
    }
})




module.exports = router