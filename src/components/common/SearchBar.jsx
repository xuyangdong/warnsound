import React from 'react'
import {Row,Col,Input,Button,TreeSelect} from 'antd'
import PropTypes from 'prop-types';
import config from '../../config'
import _ from 'lodash'


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
		},{
			storyTagTree:[]
		})
	}
	componentDidMount(){
		fetch(config.api.storyTag.get(0,100000),{
			headers:{
				authorization:sessionStorage.getItem('auth')
			}
		}).then(res => res.json()).then(res => {
			let treeData = res.obj.filter(v => v.parentId == 0).map(v => ({
				value:''+v.id,
				key:''+v.id,
				label:v.content,
				otherData:v
			}))
			treeData = treeData.map(v => ({
				...v,
				children:res.obj.filter(t => t.parentId == v.value).map(t => ({
					value:''+t.id,
					key:''+t.id,
					label:t.content,
					otherData:t
				}))
			}))
			this.setState({
				storyTagTree:_.concat([{
					value:'',
					key:'-1',
					label:'所有标签'
				}],treeData)
			})
		})
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
			if(c != 'storyTagTree'){
				p[c] = ''
			}
			return p
		},{})
		// this.state = cleanCondition
		this.setState({
			...cleanCondition
		})
		this.props.onSearch(cleanCondition)
	}
	render(){
		const {searchCondition} = this.props
		const span = Math.floor(24/(searchCondition.length+1))
		return (
			<Row type='flex' justify='end' gutter={16}>
			{
				searchCondition.map((v,k) => {
					if(v != 'tag'){
						return (<Col key={k} span={span}>
							<Input value={this.state[v]} onChange={(e)=>{
								this.handleInputChange(v,e.target.value)
							}}
							onPressEnter={()=>{
								this.handleSearch()
							}}
							addonBefore={<span>{dict[v]}</span>}
							/>
						</Col>)
					}else{
						return (<Col key={k} span={span}>
							<TreeSelect
					        style={{ width: '100%' }}
					        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
							value={this.state[v]}
					        treeData={this.state.storyTagTree}
					        placeholder="故事标签"
					        onChange={(value,label)=>{
								this.handleInputChange(v,value)
							}}
					        />
							</Col>
						)
					}
				})
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
