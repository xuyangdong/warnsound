import React from 'react'
import {Modal,Select} from 'antd'
import styles from './AddStoryModal.scss'
import PropTypes from 'prop-types'
import config from '../../config'
import {fromJS} from 'immutable'
import EnhanceTable from '../../components/common/EnhanceTable'
const Option = Select.Option

export default class AddStoryModal extends React.Component {
	static propTypes = {
		visible: PropTypes.bool,
		planId: PropTypes.oneOfType([PropTypes.string,PropTypes.number])
	}
	constructor(){
		super()
		this.state = {
			storyList:fromJS([]),
			choosenStoryList:fromJS([]),
			current:1,
			pageSize:10
		}
	}
	componentDidMount(){
		fetch(config.api.story.all(0,10000),{
			headers: {
				'authorization': sessionStorage.getItem('auth')
			}
		}).then(res => res.json()).then(res => {
			this.setState({
				storyList:fromJS(res.obj)
			})
		})
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.storyTopicId != this.props.storyTopicId){
			const { current, pageSize } = this.state
			this.getStoryInStoryTopic(nextProps.storyTopicId,current,pageSize)
		}
	}
	getStoryInStoryTopic = (storyTopicId,current,pageSize) => {
		fetch(config.api.storyTopic.story.get(storyTopicId),{
			headers:{
				'authorization':sessionStorage.getItem('auth')
			}
		}).then(res => res.json()).then(res => {
			this.setState({
				choosenStoryList:fromJS(res.obj.map(v => v.id))
			})
		})
	}
	getTableData = () => {
		const columns = [{
			title:'标题',
			dataIndex:'title',
			key:'title'
		},{
			title:'删除',
			render:(t,r) => {
				return (<a onClick={this.handleDeleteStory.bind(this,r.id)}>删除</a>)
			}
		}]
		const storyList = this.state.storyList.filter((v,k) => {
			return this.state.choosenStoryList.some(v1 => v1==v.get('id'))
		})
		const dataSource = storyList.map((v,k) => ({
			...v.toJS(),
			key:k
		})).toJS()
		return {
			columns,
			dataSource
		}
	}
	handleOk = () => {
		const storyList = this.state.storyList.filter((v,k) => {
			return this.state.choosenStoryList.some(v1 => v1==v.get('id'))
		})
		let formData = new FormData()
		formData.append('storyTopicId',this.props.storyTopicId)
		storyList.forEach(v => {
			formData.append('storyIds',v.get('id'))
		})
		fetch(config.api.storyTopic.story.add,{
			method:'post',
			headers:{
				'authorization':sessionStorage.getItem('auth')
			},
			body:formData
		}).then(res => res.json()).then(res => {
			this.props.onCancel()
		})
	}
	handleCancel = () => {
		this.props.onCancel()
	}
	handleDeleteStory = (id,e) => {
		e.preventDefault()
		this.setState({
			choosenStoryList:this.state.choosenStoryList.filter(v => v!=id)
		})
	}
	handleSelectStory = (value,option) => {
		this.setState({
			choosenStoryList:this.state.choosenStoryList.push(value)
		})
	}
	render(){
		const {columns,dataSource} = this.getTableData()
		const {
			choosenStoryList,
			storyList,
			current,
			pageSize,
		} = this.state
		return (
			<Modal
			visible={this.props.visible}
			title="添加故事"
			onOk={this.handleOk}
			onCancel={this.handleCancel}
			>
			<div className={styles.container}>
				<div className={styles.selectBar}>
					<Select style={{width:200}}
					showSearch
					optionFilterProp="children"
					onSelect={this.handleSelectStory}
					filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
					>
					{storyList.map((v,k) => {
						return (<Option value={''+v.get('id')} key={k}>{v.get('title')}</Option>)
					})}
					</Select>
				</div>
				<div className={styles.content}>
					<EnhanceTable columns={columns} dataSource={dataSource} pagination={{
						total:this.state.storyList.filter((v,k) => {
							return this.state.choosenStoryList.some(v1 => v1==v.get('id'))
						}).size,
						current:current,
						pageSize:pageSize,
						onChange:(current,pageSize) => {
							this.setState({
								current,
								pageSize
							})
						}
					}}/>
				</div>
			</div>
			</Modal>
		)
	}
}
