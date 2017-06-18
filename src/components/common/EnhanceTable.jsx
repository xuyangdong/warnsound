import React from 'react'
import {Table} from 'antd'
import {PropTypes} from 'react'
export default class EnhanceTable extends React.Component {
	static propTypes = {
		columns:PropTypes.array.isRequired,
		dataSource:PropTypes.array,

		pageSize:PropTypes.number,
		current:PropTypes.number,
		total:PropTypes.number,

		onChange:PropTypes.func,
	}
	render(){
		const {columns,dataSource,pageSize,current,total} = this.props
		return <Table columns={columns} dataSource={dataSource}
			pagination={{
				current:current,
				pageSize:pageSize,
				total:total,
				onChange:(page,pageSize)=>{
					this.props.onChange()
				}
			}}
		/>
	}
}
