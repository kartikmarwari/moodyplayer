const express = require('express');
const multer = require('multer');
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
const uploadFile = require("../service/storage.service");
const songModel=require("../models/song.model")
       


router.post('/songs', upload.single("audio"), async (req, res) => {
    try {
        console.log("Body:", req.body);
       console.log("Body:", req.file);

        const fileData = await uploadFile(req.file);
         const song = await songModel.create({
            title:req.body.title,
            artist:req.body.artist,
            audio:fileData.url,
            mood:req.body.mood,
         })

       
        res.status(201).json({
            message: "Song created successfully",
           song : song
        });
    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({
            message: "Upload failed",
            error: error.message
        });
    }
});

router.get('/songs',async (req,res)=>{
 const {mood}=req.query;
 const songs=await songModel.find({
   mood:mood
 })
res.status(200).json({
   message:"song fetched succesfuly",
   song:songs
})

})
module.exports = router;
