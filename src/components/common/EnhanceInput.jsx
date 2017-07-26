import React,{PropTypes} from 'react'
import {Input} from 'antd'
import _ from 'lodash'

const MAX_SENTENCE = 10
export default class EnhanceInput extends React.Component {
	_firstEdit = true
	constructor(){
		super()
		this.state = {
			firstEdit:true
		}
	}
	handleChange = (e) => {
		if(this._firstEdit){
			this.props.onChange(null)
			this._firstEdit = false
		}else{
			this.props.onChange(e)
		}

	}
	handleFocuse = () => {
		if(this.state.firstEdit){
			let mockEvent = {
				target:{
					value:''
				}
			}
			// this.props.onChange(null)
			// this.setState({
			// 	firstEdit:false
			// })
		}
	}
	render(){
		return (
			<Input {...this.props} value={this.props.value} onFocus={this.handleFocuse} onChange={this.handleChange}/>
		)
	}
}
