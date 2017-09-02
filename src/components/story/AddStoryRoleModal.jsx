import React from 'react'
import {Modal,Input,Table,Popconfirm} from 'antd'
import PropTypes from 'prop-types'
import styles from './AddStoryRoleModal.scss'
import UploadAvatar from '../../components/common/UploadAvatar'
import _ from 'lodash'
import UploadOtherFile from '../../components/common/UploadOtherFile'
import EditableTable from '../common/EditableTable'
import EditableCell from '../common/EditableCell'
import {fromJS} from 'immutable'

export default class AddStoryRoleModal extends React.Component {
	_init = false
	static propTypes = {
		content:PropTypes.array.isRequired,
	}
	constructor(){
		super()
		this.state = {
			roleName:'',
			roleIconFileList:[],
			roleAudioFileList:[],
			roleExtra:fromJS([]),
			readTime:''
		}
	}
	componentDidMount(){
		const {storyRoleInfo} = this.props
		if(!storyRoleInfo.isEmpty()){
			this.setState({
				roleName:storyRoleInfo.get('name'),
				readGuide:storyRoleInfo.get('roleReadGuide'),
				roleIconFileList:storyRoleInfo.get('icon')?[_.extend(new File([],''),{
					uid:-1,
					url:storyRoleInfo.get('icon')
				})]:[],
				roleAudioFileList:storyRoleInfo.get('audio')?[_.extend(new File([],''),{
					uid:-1,
					url:storyRoleInfo.get('audio')
				})]:[],
				roleExtra:storyRoleInfo.get('extra'),
				readTime:storyRoleInfo.get('readTime')
			})
		}
	}
	componentWillReceiveProps(nextProps){
		const {storyRoleInfo} = nextProps

		if(!this._init){
			if(!storyRoleInfo.isEmpty()){
				this._init = true
				this.setState({
					roleName:storyRoleInfo.get('name'),

					roleIconFileList:[_.extend(new File([],''),{
						uid:-1,
						url:storyRoleInfo.get('icon')
					})],
					roleAudioFileList:[_.extend(new File([],''),{
						uid:-1,
						url:storyRoleInfo.get('audio')
					})],
					roleExtra:storyRoleInfo.get('extra'),
					readTime:storyRoleInfo.get('readTime')
				})
			}
		}
	}
	handleCancel = () => {
		this.props.onCancel()
	}
	handleOk = () => {
		// console.log({
		// 	roleName:this.state.roleName,
		// 	roleIconFileList:this.state.iconFileList,
		// 	roleAudioFileList:this.state.audioFileList,
		// 	roleExtra:this.refs.editableTable.getData()
		// })
		this.props.onOk({
			roleName:this.state.roleName,
			roleIconFile:this.state.roleIconFileList[0],
			roleAudioFile:this.state.roleAudioFileList[0],
			roleExtra:this.refs.editableTable.getData(),
			roleReadGuide:this.state.readGuide,
			readTime:this.state.readTime
		})
	}
	getData(){
		return {
			roleName:this.state.roleName,
			roleIconFile:this.state.roleIconFileList[0],
			roleAudioFile:this.state.roleAudioFileList[0],
			roleExtra:this.refs.editableTable.getData(),
			roleReadGuide:this.state.readGuide,
			readTime:this.state.readTime
		}
	}
	render(){
		return (
			<Modal visible={true} width={800}
			onOk={this.handleOk}
			onCancel={this.handleCancel}
			title='添加角色'
			>
			<div className={styles.header}>
				<div className={styles.firstField}>
					<Input addonBefore='角色名称' style={{width:200,flexShrink:0}} value={this.state.roleName} onChange={(e) => {
						this.setState({
							roleName:e.target.value
						})
					}}/>
					<Input addonBefore='朗读时间' style={{ marginLeft:10,width:200,flexShrink:0}} value={this.state.readTime} onChange={(e) => {
						this.setState({
							readTime:e.target.value
						})
					}}/>
					<Input type='textarea' style={{width:200}} placeholder='朗读指导' autosize={{minRows:4,maxRows:4}} style={{marginLeft:10}} addonBefore='朗读指导' value={this.state.readGuide} onChange={(e) => {
						this.setState({
							readGuide:e.target.value
						})
					}}/>
				</div>
				<div className={styles.secondField}>
					<UploadOtherFile key='1' hint='上传音频' value={this.state.roleAudioFileList} onChange={(file,fileList) => {
						this.setState({
							roleAudioFileList:fileList
						})
					}}
					onRemove={()=>{
						this.setState({
							roleAudioFileList:[]
						})
					}}
					/>
					<UploadAvatar key='2' hint='上传图片' value={this.state.roleIconFileList} onChange={(file,fileList) => {
						this.setState({
							roleIconFileList:fileList
						})
					}}
					onRemove={() => {
						this.setState({
							roleIconFileList:[]
						})
					}}
					/>
				</div>
			</div>
			<div className={styles.content}>
			<EditableTable data={this.state.roleExtra} ref='editableTable' />
			</div>
			</Modal>
		)
	}
}
