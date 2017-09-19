import React from 'react'
import CreateEditHeader from '../../components/common/CreateEditHeader'
import styles from './CreateEditPanel.scss'
import {Form,Select,Upload,Input,Button,Spin,notification,Radio,Cascader} from 'antd'
import _ from 'lodash'
import UploadAvatar from '../../components/common/UploadAvatar'
import AreaOption from 'area'
import {uploadIcon} from 'actions/common'
import {jsonToFormData} from 'project-utils'
const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group

class CreateEditPanel extends React.Component {
	static contextTypes = {
		router:React.PropTypes.object
	}
	constructor(){
		super()
		this.state = {
			headerImgList:[]
		}
	}
	componentWillReceiveProps(nextProps){
		if(!nextProps.userInfo.isEmpty()){
			this.setState({
				headerImgList:nextProps.userInfo.get('headImgUrl')?[_.extend(new File([],''),{
					uid:-1,
					url:nextProps.userInfo.get('headImgUrl')
				})]:[]
			})
		}
	}
	uploadIcon = () => {
		if(this.state.headerImgList[0] && this.state.headerImgList[0].size>0){
			return uploadIcon(this.state.headerImgList[0]).then(res => {
				return res.obj.url
			})
		}else{
			return Promise.resolve(this.props.userInfo.get('headImgUrl'))
		}
	}
	handleSubmit = (e) => {
		e.preventDefault()
		const {getFieldValue} = this.props.form
		this.uploadIcon().then(iconUrl => {
			const jsonData = {
				nickname:getFieldValue('nickname'),
				password:getFieldValue('password'),
				email:getFieldValue('email'),
				mobile:getFieldValue('mobile'),
				sex:getFieldValue('sex'),
				city:getFieldValue('city'),
				company:getFieldValue('company'),
				headImgUrl:iconUrl
			}
			let formData = jsonToFormData(jsonData)
			this.props.onSubmit(formData).then(
				this.context.router.goBack(0)
			)
		})

		// this.props.onSubmit(jsonData)
	}
	normalizeTitle = (value,prevValue,allValues) => {
		return value
	}
	render(){
		const {getFieldDecorator} = this.props.form
		const {userInfo} = this.props
		return (
			<div className={styles.container}>
				<div>
					<CreateEditHeader onDelete={this.props.onDelete} title={this.props.title}/>
				</div>
				<div>
					<Form onSubmit={this.handleSubmit}>
						<FormItem
						  labelCol={{span:2}}
						  wrapperCol={{span:4}}
						  label={<span>昵称</span>}
						>
						{getFieldDecorator('nickname',{
							initialValue:userInfo.get('nickname',' ')
						})(
							<Input />
						)}
						</FormItem>
						<FormItem
						  labelCol={{span:2}}
						  wrapperCol={{span:4}}
						  label={<span>密码</span>}
						>
						{getFieldDecorator('password',{
							initialValue:''
						})(
							<Input type='password'/>
						)}
						</FormItem>
						<FormItem
						  labelCol={{span:2}}
						  wrapperCol={{span:4}}
						  label={<span>邮箱</span>}
						>
						{getFieldDecorator('email',{
							initialValue:userInfo.get('email','')
						})(
							<Input />
						)}
						</FormItem>
						<FormItem
						  labelCol={{span:2}}
						  wrapperCol={{span:4}}
						  label={<span>手机号</span>}
						>
						{getFieldDecorator('mobile',{
							initialValue:userInfo.get('mobile','')
						})(
							<Input />
						)}
						</FormItem>
						<FormItem
						  labelCol={{span:2}}
						  wrapperCol={{span:4}}
						  label={<span>性别</span>}
						>
						{getFieldDecorator('sex',{
							initialValue:userInfo.get('sex',1)

						})(
							<RadioGroup>
								<Radio value={1}>男</Radio>
								<Radio value={2}>女</Radio>
							</RadioGroup>
						)}
						</FormItem>
						<FormItem
						  labelCol={{span:2}}
						  wrapperCol={{span:4}}
						  label={<span>城市</span>}
						>
						{getFieldDecorator('city',{
							initialValue:userInfo.get('city','')
						})(
							<Input />
						)}
						</FormItem>
						<FormItem
						  labelCol={{span:2}}
						  wrapperCol={{span:4}}
						  label={<span>公司</span>}
						>
						{getFieldDecorator('company',{
							initialValue:userInfo.get('company','')
						})(
							<Input />
						)}
						</FormItem>
						<FormItem
							labelCol={{span:2}}
							wrapperCol={{span:4}}
							label={<span>头像</span>}
						>
							<UploadAvatar value={this.state.headerImgList} onChange={(file,fileList)=>{
								this.setState({
									headerImgList:fileList
								})
							}} onRemove={()=>{
								this.setState({
									headerImgList:[]
								})
							}}/>
						</FormItem>

						<FormItem
							labelCol={{span:2}}
							wrapperCol={{span:4,offset:2}}
						>
						  {this.state.spin?<Spin/>:<Button type="primary" htmlType="submit">
							{this.state.spin?<Spin size='small'/>:'保存'}
						  </Button>}
						</FormItem>
					</Form>
				</div>
			</div>
		)
	}
}

export default Form.create()(CreateEditPanel)
