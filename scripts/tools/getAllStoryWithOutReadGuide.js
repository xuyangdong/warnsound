var request = require('request')
var crypto = require('crypto');
var config = require('../../src/config').default
var fs = require('fs')
var _ = require('lodash')
var iconv = require('iconv-lite')

function md5(str){
	var md5sum = crypto.createHash('md5');
	md5sum.update(str);
	str = md5sum.digest('hex');
	return str;
}
var userId = 'admin'
var password = md5('admin')
var authorization = null

function authorize(){
	if(authorization){
		return Promise.resolve(authorization)
	}else{
		return new Promise(function(resolve,reject){
			request({
				url:config.api.user.login(userId,password),
				method:'post'
			},function(err,response,body){
				if(err){
					reject(err)
				}else{
					authorization = JSON.parse(body)
					resolve(authorization)
				}
			})
		})
	}
}

function getAllStory(){
	return authorize().then(res => {
		return new Promise(function(resolve,reject){
			request({
				url:config.api.story.all(0,100000),
				headers:{
					'authorization':res.accessToken
				}
			},function(err,res,body){
				if(err){
					reject(err)
				}else{
					resolve(JSON.parse(body))
				}
			})
		})
	})
}

function getAllAmbitus(){
	return authorize().then(res => {
		return new Promise(function(resolve,reject){
			request({
				url:config.api.storySurround.get(0,10000),
				headers:{
					'authorization':res.accessToken
				}
			},function(err,res,body){
				if(err){
					reject(err)
				}else{
					resolve(JSON.parse(body))
				}
			})
		})
	})
}

exports.getAllStoryWithOutReadGuide = function(){
	return authorize().then(res => {
		// getAllStory()
		// getAllAmbitus()
		return Promise.all([getAllStory(),getAllAmbitus()])
	}).then(res => {
		var storyList = res[0].obj
		var ambitusList = res[1].obj
		var fileContent = ''
		storyList.filter(story => {
			var index = _.findIndex(ambitusList,ambitus => {
				return ambitus.storyid == story.id
			})
			return index == -1
		}).forEach(story => {
			fileContent = fileContent + `${story.id},${story.title}\n`
		})
		fs.writeFile('./getAllStoryWithOutReadGuide.csv',
		iconv.encode(fileContent,'gbk'),function(err){
			console.log('file err:',err)
		})
	}).catch(err => {
		console.log('err',err)
	})
}
