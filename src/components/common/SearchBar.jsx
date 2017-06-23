import React from 'react'
import {Row,Col,Input} from 'antd'
import PropTypes from 'prop-types';

export default class SearchBar extends React.Component {
	static propTypes = {
		searchCondition:PropTypes.array,
		onSearch:PropTypes.func
	}
	static defaultProps = {
		searchCondition:[]
	}
	handleInputChange = (key,value) => {
		this.setState({
			[key]:value
		})
	}
	handleSearch = () => {
		const queryCondition = this.props.searchCondition.reduce((p,c) => {
			return p[c] = this.state[c]
		},{})
		this.props.onSearch(queryCondition)
	}
	render(){
		const {searchCondition} = this.props
		const span = Math.floor(24/(searchCondition.length+1))
		return (
			<Row>
			{
				searchCondition.map(v => (
					<Col span={span}>
						<Input value={this.state[v]} onChange={(e)=>{
							this.handleInputChange(v,e.target.value)
						}}
						onPressEnter={()=>{
							this.handleSearch()
						}}
						/>
					</Col>
				))
			}
			<Col span={span}>
				<Button onClick={()=>{
					this.handleSearch()
				}}>查询</Button>
			</Col>
			</Row>
		)
	}
}
