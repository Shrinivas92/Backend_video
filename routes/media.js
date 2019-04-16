var express = require('express');
var router = express.Router();
var MediaModel = require('../models/items');

router.post ('/create', (req, res, next)=> {
  let newMedia = new MediaModel({
      user_id: req.body.user_id,
      video_title: req.body.video_title,
      video_url: req.body.video_url,
      start_time: req.body.start_time,
      end_time: req.body.end_time
  })
  MediaModel.add(newMedia, (err, media)=> {
    if(err) {
     return res.json({
            status: 500,
            message: 'internal server error'
        })
    }
    if(media) {
        return res.status(200).json ({
            status: 200,
            message: 'media added'
        })
    }

  })
})

router.get('/', (req, res)=>{
MediaModel.getMedia(function(err, media){
    if(err) {
        return res.status(500).json({
            status: 500,
            message: 'internal server error'
        })
    }
    if(media) {
       return res.status(200).json({
            status: 200,
            media: media
        })
    }
})
})

router.post('/delete', function(req,res){
    MediaModel.deleteMedia(req.body._id,(req,media)=> {
        if(err){
           return res.status(500).json({
                status: 500,
                message: 'internal server error'
            })
        }
        if(media) {
            return res.status(200).json({
                status: 200,
                message: 'media deleted'
            })
        }

    }) 
})

router.post('/getid', function(req,res){
    MediaModel.getByid(req.body.user_id, (req,media)=>{
        if(err){
            return res.status(500).json({
                status:500,
                message: 'internal server error'
            })
        }
        if(media) {
            return res.status(200).json({
                status: 200,
                media: media
            })
        }
    })
})

router.post('/update', function(res, res, ){
    var media_id = req.body.media_id;
    var video_title = req.body.video_title;
    var video_url = req.body.video_url;
    var start_time = req.body.start_time;
    var end_time = req.body.end_time

    MediaModel.updateMedia(media_id, video_title, video_url, start_time,end_time, (err, media)=> {
        if(err) {
            return res.status(500).json({
                status: 500,
                message: 'internal server error'
            })
        }
        if(media) {
            return res.status(200).json({
                status: 200,
                message: 'media updated successfully'
            })
        }
    })

})