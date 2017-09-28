import React from 'react'
import {Input } from 'antd'
import PropTypes from 'prop-types'
import styles from './TimePointInput.scss'

export default class TimePointInput extends React.Component {
	_focused = false
	static propTypes = {
		value:PropTypes.string
	}
	constructor(){
		super()
		this.state = {
			errorMsg:''
		}
	}
	componentDidUpdate(){
		const valueParsed = this.props.value.split('/')
		const year = valueParsed[0]||''
		const date = valueParsed[1]||''
		if(year.length>=4 && !this._focused){
			this.refs.date.focus()
			this._focused = true
		}
	}
	handleBlurYear = () => {
		const valueParsed = this.props.value.split('/')
		const year = valueParsed[0]||''
		if(year.length!=4){
			this.setState({
				errorMsg:'年份非法输入,请输入例如2017'
			})
		}else{
			this.setState({
				errorMsg:''
			})
		}
	}
	handleBlurDate = () => {
		const valueParsed = this.props.value.split('/')
		const date = parseInt(valueParsed[1]||'')
		if(date < 1 ||date > 12){
			this.setState({
				errorMsg:'月份非法输入,请输入1~12中的任意值'
			})
		}else{
			this.setState({
				errorMsg:''
			})
		}
	}
	render(){
		const valueParsed = this.props.value.split('/')
		const year = valueParsed[0]||''
		const date = valueParsed[1]||''
		return (
			<div className={styles.container}>
				<div className={styles.inputWrapper}>
					<Input style={{width:100}} value={year} onChange={(e)=>{
						const newYear = e.target.value
						if(newYear.length>=4){

						}
						this.props.onChange(newYear+'/'+date)
					}} onBlur={this.handleBlurYear}/>/<Input ref='date' style={{width:60}} value={date} onChange={(e)=>{
						let newDate = e.target.value
						if(newDate.length<2){
							newDate = '0'+newDate
						}else{
							newDate = newDate.slice(newDate.length-2)
						}
						this.props.onChange(year+'/'+newDate)
					}} onBlur={this.handleBlurDate}/>
				</div>
				<div className={styles.errorWrapper}>
					<span>{this.state.errorMsg}</span>
				</div>
			</div>
		)
	}
}
