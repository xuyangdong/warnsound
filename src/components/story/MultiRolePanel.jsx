import React from 'react'
import {Row,Col,Input,Button,Form,Table,Select,notification} from 'antd'
import UploadAvatar from '../../components/common/UploadAvatar'
import UploadAudio from '../../components/common/UploadAudio'
import {uploadIcon,uploadAudio} from 'actions/common'
import styles from './MultiRolePanel.scss'
import PropTypes from 'prop-types'
import config from '../../config'
import {fromJS} from 'immutable'
const FormItem = Form.Item
const Option = Select.Option

class CreateRolePart extends React.Component {
	static propTypes = {
		storyId:PropTypes.string.isRequired
	}
	constructor(){
		super()
		this.state = {
			coverFileList:[]
		}
	}
	uploadIcon = () => {
		if(this.state.coverFileList[0] && this.state.coverFileList[0].size>0){
			return uploadIcon(this.state.coverFileList[0]).then(res => {
				return res.obj.url
			})
		}else{
			return Promise.resolve(this.props.storySetInfo.get('coverUrl'))
		}
	}
	handleCreateRole = () => {
		const {getFieldValue,setFieldsValue} = this.props.form
		this.uploadIcon().then(iconUrl => {
			const jsonData = {
				storyId:this.props.storyId,
				name:getFieldValue('roleName'),
				roleReadGuide:getFieldValue('readGuide'),
				icon:iconUrl
			}
			fetch(config.api.story.role.add,{
				method:'post',
				headers:{
					'authorization':sessionStorage.getItem('auth'),
					'content-type':'application/json'
				},
				body:JSON.stringify(jsonData)
			}).then(res => res.json()).then(res => {
				notification.success({message:'创建成功'})
				setFieldsValue({
					roleName:'',
					readGuide:''
				})
				this.setState({
					coverFileList:[]
				})
				this.props.onCreate()
			})
		})

	}
	render(){
		const {getFieldDecorator} = this.props.form
		return (
			<div className={styles.createRole}>
				<div style={{flexGrow:'0'}} className={styles.createRoleItem}>
					<span>角色名称:</span>
					{getFieldDecorator('roleName')(<Input />)}
				</div>
				<div className={styles.createRoleItem}>
					<span>朗读指导:</span>
					{getFieldDecorator('readGuide')(<Input type='textarea' />)}
				</div>
				<div style={{flexGrow:'0'}} className={styles.createRoleItem}>
					<span>角色头像:</span>
					<UploadAvatar value={this.state.coverFileList}
					onChange={(file,fileList) => {
						this.setState({
							coverFileList:fileList
						})
					}}
					onRemove={() => {
						this.setState({
							coverFileList:[]
						})
					}}
					/>
				</div>
				<Button style={{width:150}} onClick={()=>{
					this.handleCreateRole()
				}}>创建角色</Button>
			</div>
		)
	}
}

const CreateRolePartFormHOC = Form.create()(CreateRolePart)

class MultiRolePanel extends React.Component {
	static propTypes = {
		storyId:PropTypes.string,
		storyContent:PropTypes.array,
	}
	constructor(){
		super()
		this.state = {
			readGuide:'',
			roleName:'',
			coverFileList:[],
			fileMap:fromJS({}),
			roleList:fromJS([]),
			urlMap:fromJS({}),
			roleMap:fromJS({})
		}
	}
	getRoleList = (props) => {
		fetch(config.api.story.role.get(''+props.storyId),{
			headers:{
				'authorization':sessionStorage.getItem('auth')
			}
		}).then(res => res.json()).then(res => {
			if(res.status == 2){
				// notification.error({message:res.errorMes})
			}else{

				this.setState({
					roleList:fromJS(res.obj)
				})
			}
		})
	}
	componentDidMount(){
		if(this.props.storyId!='undefined'){
			this.getRoleList(this.props)
		}
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.storyId!='undefined'){
			this.getRoleList(nextProps)
		}
	}
	getTableData = () => {
		const columns = [{
			title:'order',
			dataIndex:'order',
			key:'order'
		},{
			title:'content',
			dataIndex:'content',
			key:'content',
			render:(t,r) => {
				return (t||'').slice(0,30)+'...'
			}
		},{
			title:'角色',
			key:'role',
			render:(t,r) => {
				return (<Select style={{width:100}} onSelect={this.handleSelectRole.bind(r.order)}>
					{this.state.roleList.map((v,k) => {
						return <Option value={''+v.get('id')} key={k}>{v.get('name')}</Option>
					}).toJS()}
				</Select>)
			}
		},{
			title:'音频',
			key:'audio',
			render:(t,r) => {
				return (<UploadAudio
				preLoad={false}
				value={this.state.fileMap.get(r.order,[])}
				onChange={(file,fileList) => {
					const fileMap = this.state.fileMap
					this.setState({
						fileMap:fileMap.set(r.order,fileList)
					})
				}}
				preUpload={this.handlePreUploadAudio.bind(this,r.order)}
				/>)
			}
		}]
		const dataSource = this.props.storyContent.map((v,k) => ({
			...v,
			key:k
		}))
		return {
			columns,
			dataSource
		}
	}
	handleCreate = () => {
		this.getRoleList(this.props)
	}
	handleSelectRole = (order,value,option) => {
		const roleMap = this.state.roleMap
		this.setState({
			roleMap:roleMap.set(order,value)
		})
	}
	handlePreUploadAudio = (order,file) => {
		uploadAudio(file).then(res => {
			console.log(res)
			const urlMap = this.state.urlMap
			this.setState({
				urlMap:urlMap.set(order,res.obj.url)
			})
		})
	}
	render(){
		const {columns,dataSource} = this.getTableData()
		return (
			<div className={styles.container}>
				<div className={styles.createRolePart}>
					<CreateRolePartFormHOC storyId={this.props.storyId}
					onCreate={this.handleCreate}
					/>
				</div>
				<div className={styles.distributeRolePart}>
					<Table columns={columns} dataSource={dataSource}/>
				</div>
			</div>
		)
	}
}
export default Form.create()(MultiRolePanel)
