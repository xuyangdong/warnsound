import React from 'react'
import {Row,Col,Input,Button} from 'antd'
import PropTypes from 'prop-types';

const dict = {
	'title':'标题',
	'author':'作者',
	'press':'出版社',
	'content':'内容',
	'tag':'标签'
}
export default class SearchBar extends React.Component {
	static propTypes = {
		searchCondition:PropTypes.array,
		onSearch:PropTypes.func
	}
	static defaultProps = {
		searchCondition:[]
	}
	componentWillMount(){
		this.state = this.props.searchCondition.reduce((p,c) => {
			p[c] = ''
			return p
		},{})
	}
	handleInputChange = (key,value) => {
		this.setState({
			[key]:value
		})
	}
	handleSearch = () => {
		const queryCondition = this.props.searchCondition.reduce((p,c) => {
			p[c] = this.state[c]
			return p
		},{})
		this.props.onSearch(queryCondition)
	}
	clean = () => {
		let cleanCondition = Object.keys(this.state).reduce((p,c) => {
			p[c] = ''
			return p
		},{})
		this.state = cleanCondition
		this.props.onSearch(cleanCondition)
	}
	render(){
		const {searchCondition} = this.props
		const span = Math.floor(24/(searchCondition.length+1))
		return (
			<Row type='flex' justify='end' gutter={16}>
			{
				searchCondition.map((v,k) => (
					<Col key={k} span={span}>
						<Input value={this.state[v]} onChange={(e)=>{
							this.handleInputChange(v,e.target.value)
						}}
						onPressEnter={()=>{
							this.handleSearch()
						}}
						addonBefore={<span>{dict[v]}</span>}
						/>
					</Col>
				))
			}
			{searchCondition.length>0?(<Col span={span}>
				<Button onClick={()=>{
					this.handleSearch()
				}}>查询</Button>
			</Col>):null}
			</Row>
		)
	}
}
