import React from 'react'
import styles from './DisplayHotSearchModal.scss'
import {Modal,Table,InputNumber,Select,notification} from 'antd'
import {fromJS} from 'immutable'
import config from '../../config'
import PropTypes from 'prop-types'
const Option = Select.Option

export default class DisplayHotSearchModal extends React.Component {
	static propTypes = {
		hotTagList:PropTypes.object
	}
	constructor(){
		super()
		this.state = {
			tagList:fromJS([]),
			movingTag:'-1',
		}
	}
	componentDidMount(){
		fetch(config.api.storyTag.get(0,100000),{
			headers:{
				'authorization':sessionStorage.getItem('auth')
			}
		}).then(res => res.json()).then(res => {
			this.setState({
				tagList:fromJS(res.obj)
			})
		})
	}
	getTableData = () => {
		const columns = [{
			title:'标签名',
			dataIndex:'content',
			key:'content'
		},{
			title:'移动',
			key:'move',
			render:(t,r) => {
				return this.state.movingTag==r.key?<InputNumber onBlur={this.hanldeMove.bind(this,)}/>:(<a onClick={() => {
					this.setState({
						movingTag:r.key
					})
				}}>移动</a>)
			}
		},{
			title:'移除',
			key:'delete',
			render:(t,r) => {
				return (<a onClick={() => {
					this.props.onChange(this.props.hotTagList.delete(r.key))
				}}>移除</a>)
			}
		}]
		const dataSource = this.props.hotTagList.map((v,k) => {
			return this.state.tagList.find(v1 => v1.get('id')==v,{},fromJS({})).set('key',k)
		}).toJS()
		return {
			dataSource,
			columns
		}
	}
	handleOk = () => {
		let formData = new FormData()
		this.props.hotTagList.forEach(v => {
			formData.append('tagIds',v)
		})
		fetch(config.api.storyTag.hotTag.add,{
			method:'post',
			headers:{
				'authorization':sessionStorage.getItem('auth')
			},
			body:formData
		}).then(res => res.json()).then(res => {
			if(res.status==2){
				notification.error({message:res.errorMes})
			}else{
				this.props.onCancel()
			}
		})
	}
	hanldeMove = (e) => {
		if(e.target.value==''){
			return
		}
		let fromTag = this.props.hotTagList.get(this.state.movingTag)
		let tempList = this.props.hotTagList.set(this.state.movingTag,this.props.hotTagList.get(e.target.value))
		this.props.onChange(tempList.set(e.target.value,parseInt(fromTag)))
	}
	render(){
		const {dataSource,columns} = this.getTableData()
		return (
			<Modal visible={true}
				onCancel={this.props.onCancel}
				title='热搜标签'
				onOk={this.handleOk}
			>
				<div>
					<Select style={{width:200}} onSelect={(value) => {
						this.props.onChange(this.props.hotTagList.push(parseInt(value)))
					}}>
					{this.state.tagList.map((v,k) => {
						return (<Option value={''+v.get('id')} key={k}>{v.get('content')}</Option>)
					})}
					</Select>
					<Table size='small' dataSource={dataSource} columns={columns}/>
				</div>
			</Modal>
		)
	}
}
