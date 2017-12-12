require("babel-register")({
        'presets': ["es2015", 'stage-3'],
});
require('babel-polyfill');

// var getAllStoryWithOutReadGuide = require('./getAllStoryWithOutReadGuide').getAllStoryWithOutReadGuide
// var putOssObject = require('./OSSPutObject').putOssObject
var stsPutObject = require('./OSSPutObject').stsPutObject

//上传oss object
// putOssObject()
stsPutObject()

//获取所有没有阅读指导的故事
// getAllStoryWithOutReadGuide()
