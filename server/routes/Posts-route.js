const express = require('express');
const router = express.Router();
const { Posts } = require('../models');
const multer = require('multer');
const moment = require('moment');
const fs = require('fs');

const { validateToken } = require("../middlewares/AuthMiddleware");

// img storage config
var imgconfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads");
    },
    filename: (req, file, callback) => {
        callback(null, `image-${Date.now()}.${file.originalname}`);
    }
});

// img filter
const isImage = (req, file, callback) => {
    if (file.mimetype.startsWith("image")) {
        callback(null, true);
    } else {
        callback(null, Error("only image is allowed"));
    }
};

var upload = multer({
    storage: imgconfig,
    fileFilter: isImage
});

// informatii postare
router.post("/postare", upload.single("photo"), validateToken, async (req, res) => {
    const { fnume, fspecie, frasa, fgen, fvarsta, fdescriere, fboli } = req.body;
    const { filename } = req.file;

    const { email } = req.user; 

    try {
        let date = moment().format("YYYY-MM-DD hh:mm:ss");

        const post = await Posts.create({
            img: filename,
            date,
            nume: fnume,
            specie: fspecie,
            rasa: frasa,
            gen: fgen,
            varsta: fvarsta,
            descriere: fdescriere,
            boli: fboli,
            email: email 
        });

        return res.status(201).json({ status: 201, data: post });
    } catch (error) {
        return res.status(422).json({ status: 422, error });
    }
});

// get post info
router.get("/getdata", async (req, res) => {
    try {
        const posts = await Posts.findAll();
        console.log("data get");
        res.status(201).json({ status: 201, data: posts });
    } catch (error) {
        res.status(422).json({ status: 422, error });
    }
});

router.get('/byId/:id', async (req, res) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    res.json(post);
})

// delete post
router.delete("/:id", validateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Posts.findOne({ where: { id: id } });
        const deletedPost = await Posts.destroy({ where: { id: id } });
        if (deletedPost) {
            const imagePath = `./uploads/${post.img}`;
            fs.unlinkSync(imagePath);

            console.log("data delete");
            res.status(201).json({ status: 201, data: deletedPost });
        } else {
            console.log("Post not found");
            res.status(404).json({ status: 404, message: "Post not found" });
        }
    } catch (error) {
        res.status(422).json({ status: 422, error });
    }
});


router.get('/edit/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Posts.findByPk(id);
        return res.json(post);
    } catch (err) {
        return res.json({ Error: err.message });
    }
});

// update post
router.put('/update/:id', upload.single('photo'), validateToken, async (req, res) => {
    try {
        const id = req.params.id;
        const { nume, specie, rasa, gen, varsta, descriere, boli } = req.body;
        const { email } = req.user;

        const post = await Posts.findByPk(id);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        let date = moment().format("YYYY-MM-DD hh:mm:ss");
        let img = post.img;

        if (req.file) {
            const imagePath = `./uploads/${post.img}`;
            fs.unlinkSync(imagePath);
            
            img = req.file.filename;
        }

        await post.update({
            img,
            date,
            nume,
            specie,
            rasa,
            gen,
            varsta,
            descriere,
            boli,
            email: email
        });

        return res.status(201).json({ status: 201, data: post });
    } catch (err) {
        return res.status(422).json({ status: 422, err });
    }
});




module.exports = router;