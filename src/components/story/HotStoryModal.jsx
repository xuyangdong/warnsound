import React from 'react'
import {Modal,Table,Select,InputNumber,notification} from 'antd'
import {fromJS} from 'immutable'
import config from '../../config'
const Option = Select.Option
export default class HotStoryModal extends React.Component {
	constructor(){
		super()
		this.state = {
			hotStoryList:fromJS([]),
			selectedStory:'',
			storyList:fromJS([])
		}
	}
	componentDidMount(){
		fetch(config.api.story.list,{
			headers:{
				'authorization':sessionStorage.getItem('auth')
			}
		}).then(res => res.json()).then(res => {
			this.setState({
				storyList:fromJS(res.obj)
			})
		})
		this.getHotStory()
	}
	getHotStory = () => {
		fetch(config.api.story.hotSearch.get(0,1000),{
			headers:{
				'authorization':sessionStorage.getItem('auth')
			}
		}).then(res => res.json()).then(res => {
			this.setState({
				hotStoryList:fromJS(res.obj),
				selectedStory:''
			})
		})
	}
	getTableData = () => {
		const columns = [{
			title:'故事名',
			dataIndex:'title',
			key:'title',
			filterDropdown:(
				<Select
					showSearch
					value={this.state.selectedStory}
					style={{width:150}}
					optionFilterProp='children'
					filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
					onSelect={value => {
						this.setState({
							selectedStory:value
						})
					}}
				>
				{this.state.storyList.map((v,k) => (
					<Option value={''+v.get('id')} key={k} >{v.get('title')}</Option>
				))}
				</Select>
			)
		},{
			title:'故事朗读次数',
			dataIndex:'tellCount',
			key:'tellCount'
		},{
			title:'设置故事朗读次数',
			key:'settingTellCount',
			render:(t,r) => {
				return (
					<InputNumber key={r.id} onBlur={this.handleChangeHotLevel.bind(this,r.id)} />
				)
			}
		}]
		const dataSource = this.state.hotStoryList.filter(v => {
			if(!!this.state.selectedStory){
				return this.state.selectedStory == ''+v.get('id')
			}else{
				return true
			}
		}).map((v,k) => ({
			...v.toJS(),
			key:k
		})).toJS()
		return {
			columns,
			dataSource
		}
	}
	handleChangeHotLevel = (storyId,e) => {
		let formData = new FormData()
		formData.append('id',storyId)
		formData.append('tellCount',e.target.value)
		fetch(config.api.story.tellCount.add,{
			method:'post',
			headers:{
				'authorization':sessionStorage.getItem('auth')
			},
			body:formData
		}).then(res => {
			notification.success({message:'更新热度等级成功'})
			this.getHotStory()
		}).catch(error => {
			notification.error({message:'更新热度等级失败'})
		})
	}
	render(){
		const tableConfig = this.getTableData()
		return (
			<Modal
				title='热搜故事'
				visible={true}
				onCancel={this.props.onCancel}
				onOk={this.props.onCancel}
			>
				<div>
					设置当前故事的收听次数：
					<InputNumber onBlur={this.handleChangeHotLevel.bind(this,this.props.currentStory)} />
				</div>
				<Table  {...tableConfig}/>
			</Modal>
		)
	}
}
