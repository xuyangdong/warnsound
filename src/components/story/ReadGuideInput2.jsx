import React from 'react'
import Wangeditor from 'wangeditor'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import {notification} from 'antd'

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
		this.editor.customConfig.uploadImgShowBase64 = true
		this.editor.create()
	}
	getData = () => {
		return this.editor.txt.html()
	}
	componentDidUpdate(){
		let html = this.props.value
		try{
			let array = JSON.parse(this.props.value)
			if(typeof array == 'array'){
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
