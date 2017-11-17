import React from 'react'
import {Row,Col,Input,Button,Form,Table,Select,notification,Modal,Icon,Popover} from 'antd'
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
			return Promise.resolve(this.state.coverFileList[0].url||'')
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
	uploadingFileCount = 0
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
			roleMap:fromJS({}),
		}
	}
	getData = () => {
		return this.state.roleMap
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
	getRoleInfo = (props) => {
		fetch(config.api.story.role.info(props.storyId),{
			headers:{
				'authorization':sessionStorage.getItem('auth')
			}
		}).then(res => res.json()).then(res => {
			const roleMsg = res.obj.roleMsg
			let roleMap = this.state.roleMap
			let urlMap = this.state.urlMap

			roleMsg.forEach(v => {
				let content = []
				try {
					content = JSON.parse(v.content)
				}catch(e){}
				content.forEach(v1 => {
					roleMap = roleMap.set(v1.order,v.roleId)
					urlMap = urlMap.set(v1.order,v1.url)
				})
			})
			this.setState({
				roleMap,
				urlMap
			})
		})
	}
	componentDidMount(){
		if(this.props.storyId!='undefined'){
			this.getRoleList(this.props)
			this.getRoleInfo(this.props)
		}
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.storyId!='undefined'){
			this.getRoleList(nextProps)
			this.getRoleInfo(nextProps)
		}
	}
	getTableData = () => {
		const {urlMap,roleMap} = this.state
		const columns = [{
			title:'order',
			dataIndex:'order',
			key:'order'
		},{
			title:'content',
			dataIndex:'content',
			key:'content',
			render:(t,r) => {
				const content = (
					<p>{t}</p>
				)
				return (
					<Popover content={content}>
					  <p>{t.length>22?`${t.substring(0,10)}...${t.substring(t.length-10)}`:t}</p>
					</Popover>
				)
			}
		},{
			title:'角色',
			key:'role',
			render:(t,r) => {
				return (<Select optionLabelProp='title' style={{width:100}} value={''+roleMap.get(r.order,'-1')} onChange={value => {
					this.setState({
						roleMap:roleMap.set(r.order,value)
					})
				}} onSelect={this.handleSelectRole.bind(this,r.order)}>
					<Option value='-1' title='无角色' key={-1}>
						无角色
					</Option>
					{this.state.roleList.map((v,k) => {
						return (<Option value={''+v.get('id')} title={v.get('name')} key={k}>
						<div className={styles.optionContent}>
						{v.get('name')}
						<Icon type='delete' onClick={this.handleDeleteRole.bind(this,v.get('id'))}></Icon>
						</div>
						</Option>)
					}).toJS()}
				</Select>)
			}
		},{
			title:'上传音频',
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
				preUpload={this.handlePreUploadAudio.bind(this,r.order)}/>)
			}
		},{
			title:'试听',
			key:'tryListen',
			render:(t,r) => {
				return (<audio src={urlMap.get(r.order)} style={{display:'block'}} controls></audio>)
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
	handleDeleteRole = (id,e) => {
		e.stopPropagation()
		fetch(config.api.story.role.delete(id),{
			method:'delete',
			headers:{
				'authorization':sessionStorage.getItem('auth')
			}
		}).then(res => {
			this.getRoleList(this.props)
		})
	}
	handleCreate = () => {
		this.getRoleList(this.props)
		this.props.onCreateRole()
	}
	handleSelectRole = (order,value,option) => {
		const roleMap = this.state.roleMap
		this.setState({
			roleMap:roleMap.set(order,value)
		})
	}
	handlePreUploadAudio = (order,file) => {
		this.uploadingFileCount++
		uploadAudio(file).then(res => {
			const urlMap = this.state.urlMap
			this.setState({
				urlMap:urlMap.set(order,res.obj.url)
			})
			this.uploadingFileCount--
		})
	}
	handleConfirmRoleMsg = () => {
		const {roleMap,urlMap} = this.state
		const result = {}
		const blockWithRole = []
		const jsonData = {}
		if(this.uploadingFileCount>0){
			Modal.warning({
				title: 	`还有${this.uploadingFileCount}个文件正在上传`,
				content: '',
			});
			return ;
		}
		roleMap.forEach((roleId,order) => {
			if(result[roleId]){
				result[roleId].push({
					order:order,
					url:urlMap.get(order)||''
				})
			}else{
				result[roleId] = [{
					order:order,
					url:urlMap.get(order)||''
				}]
			}
			blockWithRole.push(order)
		})
		const promiseArray = []
		jsonData.storyId = this.props.storyId
		jsonData.roleMsg = []
		Object.keys(result).map(roleId => {
			jsonData.roleMsg.push({
				roleId:roleId,
				content:JSON.stringify(result[roleId])
			})
		})
		jsonData.roleMsg.push({
			roleId:'-1',
			content:JSON.stringify(this.props.storyContent.filter(v => {
				return !(blockWithRole.indexOf(v.order)>-1)
			}).map(v => ({
				order:v.order,
				url:''
			})))
		})
		fetch(config.api.story.role.attach,{
			method:'post',
			headers:{
				'authorization':sessionStorage.getItem('auth'),
				'content-type':'application/json'
			},
			body:JSON.stringify(jsonData)
		}).then(res => res.json()).then(res => {
			if(res.status==2){
				notification.error({message:res.errorMes})
			}else{
				notification.success({message:'角色音频信息已保存'})
			}
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
				<Button  onClick={this.handleConfirmRoleMsg}>保存角色修改</Button>
			</div>
		)
	}
}
export default MultiRolePanel
