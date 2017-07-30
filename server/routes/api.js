const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const video = require('../models/video');

const db = "mongodb://userdeepu:userdeepu2017@ds117913.mlab.com:17913/mediaplayer";
mongoose.Promise = global.Promise;
mongoose.connect(db, function(err){
    console.error("Error! : "+ err);
});

router.get('/videos', function(req, res){
    console.log('get videos works');
    video.find({})
    .exec(function(err, videos){
        if(err){
                console.log('error get videos');
        }
        else{
            res.json(videos);
        }
    })
});

router.get('/video/:id', function(req, res){
    console.log('get video by id works');
    video.findById(req.params.id)
    .exec(function(err, video){
        if(err){
                console.log('error get video');
        }
        else{
            res.json(video);
        }
    })
});

router.post('/video',function(req,res){
    console.log('post video');
    console.log(req.body);
    
    let newvideo = new video();
    newvideo.title = req.body.title;
    newvideo.description = req.body.description;
    newvideo.url = req.body.url;
    newvideo.save(function(err, insertedVideo){
        if(err){
            console.log('Post request failed while adding new video.')
        }
        else{
            res.json(insertedVideo);
        }
    });
})

router.post('/video/update',function(req,res){
    console.log('Update video by id works');
    console.log(req.body);
    video.findByIdAndUpdate(req.body.id,
        {
            $set: { 
                 title: req.body.title,
                 description: req.body.description,
                 url: req.body.url
            }
        },
        {
            new: true
        },
        function(err, updatedVideo){
            if(err){
            console.log('Error updating video.')
        }
        else{
            res.json(updatedVideo);
        }
    });
});

module.exports = router;