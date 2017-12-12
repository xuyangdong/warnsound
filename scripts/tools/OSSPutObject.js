var request = require('request')
var crypto = require('crypto');
var config = require('../../src/config').default
var fs = require('fs')
var _ = require('lodash')
var OSS = require('ali-oss')

exports.putOssObject = function (){
	request(config.api.auth.oss,function(err,res,body){
		let jsonObj = JSON.parse(body).obj
		let filePath = '/Users/xyd/Desktop/test.png'

		var req = request({
			url:`${jsonObj.host}/test.png`,
			method:'put',
			headers:{
				'Authorization':`OSS ${jsonObj.accessid}:${jsonObj.signature}`,
				'Date':new Date().toString()
			}
		},function(err1,res1,body1){
			console.log(body1)
		})
		var form = req.form()
		form.append("file",fs.createReadStream(filePath))
	})
}

exports.stsPutObject = function(){
	request(config.api.auth.sts,function(e,r,b){
		let jsonObj = JSON.parse(b).obj
		var client = new OSS.Wrapper({
			accessKeyId: jsonObj.AccessKeyId,
			accessKeySecret: jsonObj.AccessKeySecret,
			stsToken: jsonObj.SecurityToken,
			endpoint: 'warmtale-backend-bucket',
			bucket: 'oss-cn-beijing.aliyuncs.com'
		})

		client.put("test",new Buffer("foo")).then(res => {
			console.log(res)
		}).catch(err => {
			console.log(err)
		})
	})
}
