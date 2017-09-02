import React from 'react'
import { Select,Tag } from 'antd'
import PropTypes from 'prop-types'
import _ from 'lodash'
const Option = Select.Option
const tags =['pink','red','orange','green','cyan','blue','purple']

export default class EnhanceSelect extends React.Component {
	static propTypes = {
		value: PropTypes.array,
		options: PropTypes.array,
		onChange: PropTypes.func
	}
	static defaultProps = {
		options:[],
		mode:'multiple'
	}
	render(){
		return (
			<div>
				<div>
				{(this.props.value||[]).map((v,k) => {
					let colorIndex = _.random(0,6)
					return <Tag closable onClose={(e)=>{
						this.props.onChange(_.filter(this.props.value,p => p!=v))
					}} key={k} color={tags[colorIndex%7]}>{(_.find(this.props.options,option => option.value==v)||{}).title}</Tag>
				})}
				<Select style={{marginBottom:10}} onChange={(value)=>{
					if(this.props.mode=='multiple'){
						this.props.onChange(_.concat(this.props.value,value))
					}else{
						this.props.onChange([value])
					}
				}} {..._.omit(this.props,['value','options','onChange'])}>
				{this.props.options.map((v,k) => {
					return <Option title={''+v.title} value={''+v.value} key={k}>{v.label||v.title}</Option>
				})}
				</Select>
				</div>
			</div>
		)
	}
}
