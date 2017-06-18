import React,{PropTypes} from 'react'
import {Input} from 'antd'
import _ from 'lodash'

const MAX_SENTENCE = 10
export default class EnhanceInput extends React.Component {
	content = []
	separator = /[,|.|;|，|。|；]/
	static propTypes = {
		value:PropTypes.string,
		autoBeauty:PropTypes.bool,
		onChange:PropTypes.func
	}
	constructor(){
		super()
		this.handleChange = this.handleChange.bind(this)
		this.formatSentence = this.formatSentence.bind(this)
	}
	handleChange(value){
		this.props.onChange(value)
	}
	beauty(value){
		let sentence = ''
		value = value.replace(/\n/ig,'')
		this.content = []
		for(let i = 0;i<value.length;i++){
			if(sentence.length<=MAX_SENTENCE&&!this.separator.test(value.charAt(i))){
				sentence = sentence + value.charAt(i)
			}else{
				this.content.push(sentence+value.charAt(i))
				sentence = ''
			}
		}
		if(sentence){
			this.content.push(sentence)
		}
		return this.content.join('\n')
	}
	formatSentence(value){
		if(this.props.autoBeauty){
			return this.beauty(value)
		}else{
			return value
		}
	}
	render(){
		return (
			<Input type='textarea' {..._.omit(this.props,['autoBeauty'])} value={this.formatSentence(this.props.value||'')} onChange={this.handleChange}/>
		)
	}
}
