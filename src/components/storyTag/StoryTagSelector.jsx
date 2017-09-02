import React from 'react'
import { Select,Tag } from 'antd'
import PropTypes from 'prop-types'
import _ from 'lodash'
const Option = Select.Option
const tags =['pink','red','orange','green','cyan','blue','purple']

export default class StoryTagSelector extends React.Component {
	static propTypes = {
		value:PropTypes.array,
		options:PropTypes.array,
		mode:PropTypes.string
	}
	constructor(){
		super()
		this.state = {
			firstTagOption:'',
			secondTagOption:''
		}
	}
	render(){
		const firstTag = this.props.options.filter(v => v.parentId == 0)
		return (
			<div>
				{this.props.value.map((v,k) => {
					let colorIndex = _.random(0,6)
					return (
						<Tag closable onClose={(e)=>{
							this.props.onChange(_.filter(this.props.value,p => p!=v))
						}} key={k} color={tags[colorIndex%7]}>{(_.find(this.props.options,option => option.id==v)||{}).content}</Tag>
					)
				})}
				<Select style={{marginBottom:10,width:150}} value={this.state.firstTagOption} onChange={(value) => {
					this.setState({
						firstTagOption:value
					})
				}} >
				{
					firstTag.map((v,k) => {
						return <Option title={''+v.content} value={''+v.id} key={k}>{v.content}</Option>
					})
				}
				</Select>
				<Select style={{marginBottom:10,width:150}} onChange={(value)=>{
					if(this.props.mode=='multiple'){
						this.props.onChange(_.concat(this.props.value,value))
					}else{
						this.props.onChange([value])
					}

				}}>
				{this.props.options.filter(v => v.parentId==this.state.firstTagOption).map((v,k) => {
					return <Option title={''+v.content} value={''+v.id} key={k}>{v.content}</Option>
				})}
				</Select>
			</div>
		)
	}
}
