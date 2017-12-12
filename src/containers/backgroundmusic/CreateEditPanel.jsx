import React from 'react'
import styles from './CreateEditPanel.scss'
import CreateEditHeader from '../../components/common/CreateEditHeader'
import {Form,Input,Upload,Button,Icon,Spin,Tag,Select,notification} from 'antd'
import _ from 'lodash'
import config from '../../config'
const FormItem = Form.Item
const tags =['pink','red','orange','green','cyan','blue','purple']
const Option = Select.Option
class CreateEditPanel extends React.Component {
	static contextTypes = {
		router:React.PropTypes.object
	}
	constructor(){
		super()
		this.state = {
			fileList:[],
			spin:false,
			backgroundMusicTag:[]
		}
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	componentWillReceiveProps(nextProps){
		if(!nextProps.backgroundMusicTag.isEmpty()){
			this.setState({
				backgroundMusicTag:nextProps.backgroundMusicTag.map(v => v.get('id')).toJS()
			})
		}
	}
	handleSubmit(e){
		const {getFieldValue} = this.props.form
		this.setState({
			spin:true
		})
		e.preventDefault()
		let formData = new FormData()
		formData.append('description',getFieldValue('description'))
		formData.append('uploadFile',this.state.fileList[0]||new File([],''))
		this.props.onSubmit(formData).then(res => {
			return res
		}).then(res => {
			this.setState({
				spin:false
			})
			notification.success({message:'背景音效上传成功'})
			this.addBackgroundMusicTag(res.id,this.state.backgroundMusicTag[0])
		})
		this.context.router.goBack()
	}
	addBackgroundMusicTag(backgroundMusicId,backgroundMusicIdTagId){
		fetch(config.api.backgroundmusic.backgroundMusicTag.add(backgroundMusicId,backgroundMusicIdTagId),{
			method:'post',
			headers:{
				'authorization':sessionStorage.getItem('auth')
			},
		}).then(res => res.json()).then(res => {
			console.log(res)
		})
	}
	deleteBackgroundMusicTag(backgroundMusicId,backgroundMusicIdTagId){
		fetch(config.api.backgroundmusic.backgroundMusicTag.add(backgroundMusicId,backgroundMusicIdTagId),{
			method:'delete',
			headers:{
				'authorization':sessionStorage.getItem('auth')
			},
		}).then(res => res.json()).then(res => {
			notification.success({message:'删除成功'})
		})
	}
	render(){
		const {getFieldDecorator} = this.props.form
		const {backgroundMusicInfo,backgroundMusicTag,tagList} = this.props
		return (
			<div className={styles.container}>
				<div>
					<CreateEditHeader onDelete={this.props.onDelete} title={this.props.title}/>
				</div>
				<div className={styles.formPanel}>
				<Form onSubmit={this.handleSubmit}>
					<FormItem
					  labelCol={{span:2}}
					  wrapperCol={{span:4}}
					  label={<span>描述</span>}
					>
					{getFieldDecorator('description',{
						initialValue:backgroundMusicInfo.get('description')
					})(
						<Input />
					)}
					</FormItem>
					<FormItem
					  labelCol={{span:2}}
					  wrapperCol={{span:4}}
					  label={<span>标签</span>}
					>
					{this.state.backgroundMusicTag.map((v,k) => {
						let colorIndex = _.random(0,6)
						return <Tag onClose={(e)=>{
							this.setState({
								backgroundMusicTag:this.state.backgroundMusicTag.filter(s => s != v)
							})
							if(this.props.type=='edit'){
								this.deleteBackgroundMusicTag(backgroundMusicInfo.get('id'),v)
							}
						}} closable color={tags[colorIndex%7]} key={k}>{tagList.find(s => s.get('id')==v).get('content')}</Tag>
					})}
					<Select style={{width:240}} onSelect={(value) => {
						if(this.props.type=='edit'){
							this.addBackgroundMusicTag(backgroundMusicInfo.get('id'),value)
						}
						this.setState({
							backgroundMusicTag:_.concat(this.state.backgroundMusicTag,value)
						})
					}}>

					{
						tagList.map((v,k)=> (
							<Option value={''+v.get('id')} title={v.get('content')} key={v.get('id')}>{v.get('content')}</Option>
						))
					}
					</Select>
					</FormItem>
					<FormItem
					  labelCol={{span:2}}
					  wrapperCol={{span:4}}
					  label={<span>上传</span>}
					>
					<Upload
					   fileList={this.state.fileList}
					   beforeUpload={(file,fileList)=>{
						   this.setState({
							   fileList:fileList,
						   })
						   return false
					   }}
					>
					   <Button>
						 <Icon type="upload" /> Upload
					   </Button>
					 </Upload>
					</FormItem>
					<FormItem
						labelCol={{span:2}}
						wrapperCol={{span:4,offset:2}}
					>
					  {this.state.spin?<Spin />:<Button type="primary" htmlType="submit">
						保存
					  </Button>}
					</FormItem>
				</Form>
				</div>
			</div>
		)
	}
}

export default Form.create()(CreateEditPanel)
