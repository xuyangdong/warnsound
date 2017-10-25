import React from 'react'
import styles from './InputWithCount.scss'
import {Input} from 'antd'
import _ from 'lodash'

export default class InputWithCount extends React.Component {
	constructor(){
		super()
	}
	componentWillMount(){
		this.setState({
			remainCount:this.props.count
		})
	}
	componentDidMount(){
		this.setState({
			remainCount:this.props.count
		})
	}
	componentWillReceiveProps(nextProps){
		this.setState({
			remainCount:nextProps.count
		})
	}
	handleChange = (e) => {
		if(e.target.value.length<=this.props.count){
			this.props.onChange(e)
		}
	}
	render(){
		return (
			<div className={styles.container}>
				<Input {..._.omit(this.props,['count','onChange'])} onChange={this.handleChange} />
				<div className={styles.count}>{`${this.props.count - (this.props.value||'').length} | ${this.props.count}`}</div>
			</div>
		)
	}
}
