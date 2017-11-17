require("babel-register")({
        'presets': ["es2015", 'stage-3'],
});
require('babel-polyfill');

var getAllStoryWithOutReadGuide = require('./getAllStoryWithOutReadGuide').getAllStoryWithOutReadGuide

//获取所有没有阅读指导的故事
getAllStoryWithOutReadGuide()
