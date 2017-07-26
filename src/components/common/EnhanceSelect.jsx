import React from 'react'
import { Select,Tag } from 'antd'
import PropTypes from 'prop-types'
const tags =['pink','red','orange','green','cyan','blue','purple']

export default class EnhanceSelect extends React.Component {
	static propTypes = {
		value: PropTypes.array,
		onChange: PropTypes.func
	}
	render(){
		return (
			<div>
				<div>
				{this.props.value.map(v => ({
					
				}))}
				</div>
				<Select />
			</div>
		)
	}
}
