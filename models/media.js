'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const users = require('../models/users')

var MediaSchema = new Schema({
    upload_date:{
        type: String,
        required: false,
        default: new Date()
    },
    user_id: {
        type:schema.Types.ObjectId,
        required: true
    },
    video_title: {
        type: String,
        required: true
    },
    Video_Url: {
        type: String,
        required: true
    },
    start_time: {
        type: Number,
        required: true
    },
    end_time: {
        type: Number,
        required: true
    }
})

var Media = modeule.exports = mongoose.model('media', MediaSchema)

module.exports.add = function(newVideo, callback) {
    newVideo.save(callback)
}

module.exports.getMedia = function(callback, limit) {
    Media.find(callback).limit(limit)
}

module.exports.deleteMedia = function (media_id, callback) {
    Media.findOneAndDelete(
        { _id: media_id },
        callback)
}

module.exports.getByid = function(user_id, callback) {
    Media.find({user_id: user_id}, callback);
}
module.exports.updateMedia = function (item_id, mrp, selling_price, thumbnail, unit, callback) {
    console.log('item id is', media_id)
    var query = {  video_title: video_title, Video_Url: Video_Url , start_time: start_time, end_time: end_time }
    Media.findOneAndUpdate(
        { _id: media_id },
        query,
        callback)

}

