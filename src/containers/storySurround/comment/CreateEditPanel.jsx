import React from 'react'
import CreateEditHeader from '../../../components/common/CreateEditHeader'
import styles from './CreateEditPanel.scss'
import {Form,Select,Upload,Input,InputNumber,Button,Spin,notification,Radio,Cascader} from 'antd'
import _ from 'lodash'
import UploadAvatar from '../../../components/common/UploadAvatar'
import UploadAudio from '../../../components/common/UploadAudio'
import {uploadToOSS} from 'actions/common'
import {jsonToFormData} from 'project-utils'
import {fromJS} from 'immutable'
import MutiAvatarUploader from '../../../components/common/MutiAvatarUploader'
const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group

class CreateEditPanel extends React.Component {
	_init = false
	static contextTypes = {
		router:React.PropTypes.object
	}
	constructor(){
		super()
		this.state = {
			coverList:[]
		}
	}
	// componentWillReceiveProps(nextProps){
	// 	if(!nextProps.commentInfo.isEmpty() && !this._init){
	// 		this._init = true
	// 		this.setState({
	// 			coverList:nextProps.nativeWorkInfo.get('coverUrl')?[_.extend(new File([],''),{
	// 				uid:-1,
	// 				url:nextProps.nativeWorkInfo.get('coverUrl')
	// 			})]:[],
	// 		})
	// 	}
	// }
	uploadCoverList = () => {
		if(this.state.coverList[0] && this.state.coverList[0].size>0){
			return uploadToOSS(this.state.coverList[0]).then(res => {
				return res
			})
		}else{
			return Promise.resolve(this.props.nativeWorkInfo.get('coverUrl'))
		}
	}
	uploadFile = () => {
		return this.uploadCoverList()
	}
	handleSubmit = (e) => {
		e.preventDefault()
		const {getFieldValue} = this.props.form
		let jsonData = {
			content:getFieldValue('content'),
			picUrls:JSON.stringify(this.state.coverList.map(v => v.url))
		}
		let formData = jsonToFormData(jsonData)
		this.props.onSubmit(formData).then(res => {
			this.context.router.goBack(0)
		})
		// this.props.onSubmit(jsonData)
	}
	render(){
		const {getFieldDecorator} = this.props.form
		const {commentInfo} = this.props
		const uploadProps = {
			accept:'image/*',
			listType:'picture',
			customRequest:(args) => {
				uploadToOSS(args.file).then(url => {
					this.setState({
						coverList:_.concat(this.state.coverList,{
							uid:args.file.uid,
							name:args.file.name,
							status:'done',
							url:url
						})
					})
					args.onSuccess(url)
				})
			}
		}
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
						  label={<span>内容</span>}
						>
						{getFieldDecorator('content',{
							initialValue:''+commentInfo.get('content',' ')
						})(
							<Input type='textarea' />
						)}
						</FormItem>

						<FormItem
							labelCol={{span:2}}
							wrapperCol={{span:4}}
							label={<span>图片</span>}
						>
							<MutiAvatarUploader uploadProps={uploadProps}/>
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
