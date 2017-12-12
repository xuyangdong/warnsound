import React from 'react'
import Wangeditor from 'wangeditor'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import {notification} from 'antd'

const baseUrl = 'http://120.79.0.217'
export default class ReadGuideInput2 extends React.Component {
	static propTypes = {
		id:PropTypes.string
	}
	static defaultProps = {
		id:'wangeditor'
	}
	componentDidMount(){
		const currentNode = ReactDOM.findDOMNode(this)
		this.editor = new Wangeditor(currentNode)
		// this.editor.customConfig.uploadImgShowBase64 = true
		this.editor.customConfig.uploadImgServer = baseUrl+'/manage/uploadUEditorImage'
		this.editor.customConfig.uploadImgMaxSize = 10 * 1024 * 1024
		this.editor.customConfig.uploadFileName = 'file'
		this.editor.customConfig.uploadImgHeaders = {
		    'authorization': sessionStorage.getItem('auth')
		}
		this.editor.customConfig.uploadImgHooks = {
			error: function (xhr, editor) {
		        // notification.error({message:'上传图片失败'})
		    },
			success: function (xhr, editor, result) {
		        notification.success({message:'上传图片成功'})
		    },
			customInsert: function (insertImg, result, editor) {
		        // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
		        // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
				if(result.status == 2){
					notification.error({message:'上传图片失败'})
				}else{
					var url = result.obj.url
			        insertImg(url)
				}
		    }
		}
		this.editor.create()
	}
	getData = () => {
		return this.editor.txt.html()
	}
	componentDidUpdate(){
		let html = this.props.value
		if(!html){
			return
		}
		try{
			let array = JSON.parse(this.props.value)
			if(typeof array == 'array' || typeof array == 'object'){
				html = array.reduce((p,c) => {
					if(c.type==0){
						p = p + `<p>${c.content}<\/p>`
					}else if(c.type==1){
						p = p + `<img src='${c.content}'\/>`
					}else if(c.type==2){
						p = p + `<video src=${c.content}\/>`
					}else {
						throw new Error('错误的类型')
					}
					return p
				},'')
			}else{
				html = this.props.value.slice(1,this.props.value.length-1)
			}
		}catch(e){
			notification.error({message:'解析出错'})
		}
		this.editor.txt.html(html)
		// console.log(this.editor)
	}
	render(){
		return (
			<div style={{width:'100%'}}></div>
		)
	}
}
