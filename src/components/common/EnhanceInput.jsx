import React,{PropTypes} from 'react'
import {Input} from 'antd'
import _ from 'lodash'

const MAX_SENTENCE = 10
export default class EnhanceInput extends React.Component {
	constructor(){
		super()
		this.state = {
			firstEdit:true
		}
	}
	handleChange = (e) => {
		this.props.onChange(e)
	}
	handleFocuse = () => {
		if(this.state.firstEdit){
			let mockEvent = {
				target:{
					value:''
				}
			}
			this.props.onChange(null)
			this.setState({
				firstEdit:false
			})
		}
	}
	render(){
		return (
			<Input value={this.props.value} onFocus={this.handleFocuse} onChange={this.handleChange}/>
		)
	}
}
