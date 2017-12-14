import React from 'react'
import CreateEditHeader from '../../components/common/CreateEditHeader'
import styles from './CreateEditPanel.scss'
import {Form,Select,Upload,Input,InputNumber,Button,Spin,notification,Radio,Cascader} from 'antd'
import _ from 'lodash'
import {uploadIcon,uploadMutil} from 'actions/common'
import {jsonToFormData} from 'project-utils'
import {fromJS} from 'immutable'
import DestinationUtils from 'destination-utils'
import JsonDisplayComponent from '../../components/JsonDisplayComponent'
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
			content:'',
			destinationType:'',
			description:'',
			args:fromJS([])
		}
	}
	assemblyExtraFieldAndContentField = (formData) => {
		if(this.state.destinationType!=2){
			//普通跳转
			return
		}
		const selectedActivity = this.contentTypeList.find((v,k) => {
			return k == this.state.content
		})
		formData.append('extraField',JSON.stringify(this.state.args.reduce((p,c,k) => {
			p[c.get('key')] = c.get('value')
			return p
		},{})))
		formData.append('content',selectedActivity.uri)
	}
	handleSubmit = (e) => {
		e.preventDefault()
		const {getFieldValue} = this.props.form
		let formData = new FormData()
		formData.append('destinationType',this.state.destinationType)
		formData.append('description',this.state.description)
		this.assemblyExtraFieldAndContentField(formData)
		this.props.onSubmit(formData).then(res => {
			this.context.router.goBack(0)
		})
		// this.props.onSubmit(jsonData)
	}
	renderDestinationContent = () => {
		if(this.state.destinationType==2){
			//跳转到activity
			this.contentTypeList = DestinationUtils.getAsJsonObj()
			return (
				<Select value={this.state.content} onSelect={(value) => {
					const selectedActivity = this.contentTypeList.find((v,k) => k==value)
					this.setState({
						content:value,
						args:fromJS(selectedActivity.args)
					})
				}}>
				{this.contentTypeList.map((v,k) => (
					<Option value={`${k}`} key={k}>{v.title}</Option>
				))}
				</Select>
			)
		}else{
			return <Input value={this.state.content} onChange={(e) => {
				this.setState({
					content:e.target.value
				})
			}}/>
		}
	}
	renderArgsPanel = () => {
		const selectedActivity = this.contentTypeList.find((v,k) => {
			return k == this.state.content
		})
		return selectedActivity.args.map((v,k) => {
			if(!!v.value){
				//默认参数
				return (
					<FormItem
					key={`a${k}`}
					labelCol={{span:2}}
					wrapperCol={{span:4}}
					label={<span>{this.state.args.getIn([k,'key'])||'默认参数'}</span>}
					>
						<Input readOnly value={this.state.args.getIn([k,'value'])}/>
					</FormItem>
				)
			}else{
				//指定参数
				return (
					<FormItem
					key={`a${k}`}
					labelCol={{span:2}}
					wrapperCol={{span:4}}
					label={<span>{this.state.args.getIn([k,'description'])||'默认参数'}</span>}
					>
						<Input value={this.state.args.getIn([k,'value'])} onChange={(e) => {
							this.setState({
								args:this.state.args.setIn([k,'value'],e.target.value)
							})
						}} />
					</FormItem>
				)
			}
		})
	}
	render(){
		const {destinationInfo} = this.props
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
						  label={<span>跳转地内容</span>}
						>
						{this.renderDestinationContent()}
						</FormItem>
						{this.state.destinationType==2?this.renderArgsPanel():null}
						<FormItem
						  labelCol={{span:2}}
						  wrapperCol={{span:4}}
						  label={<span>跳转类型</span>}
						>
							<Select style={{width:'100%'}} value={this.state.destinationType} onSelect={(value) => {
								this.setState({
									destinationType:value,
								})
							}}>
								<Option value='1' key='1'>跳转到APP</Option>
								<Option value='2' key='2'>跳转到APP固定的activity</Option>
								<Option value='3' key='3'>跳转到一个URL里面</Option>
							</Select>
						</FormItem>
						<FormItem
						  labelCol={{span:2}}
						  wrapperCol={{span:4}}
						  label={<span>描述内容</span>}
						>
						<Input value={this.state.description} onChange={(e) => {
							this.setState({
								description:e.target.value
							})
						}} />
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
