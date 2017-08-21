import React from 'react'
import styles from './CreateEditPanel.scss'
import CreateEditHeader from '../../components/common/CreateEditHeader'
import {Form,Input,Icon, Button } from 'antd'
import UploadAvatar from '../../components/common/UploadAvatar'
import _ from 'lodash'
const FormItem = Form.Item

class CreateEditPanel extends React.Component {
	uuid = 0
	constructor(){
		super()
		this.state = {
			questionFileList:[]
		}
	}
	componentWillReceiveProps(nextProps){
		if(!nextProps.individualityInfo.isEmpty()){
			this.setState({
				questionFileList:nextProps.individualityInfo.get('icon')?[_.extend(new File([],''),{
					uid:-1,
					url:nextProps.individualityInfo.get('icon')
				})]:[]
			})
		}
	}
	handleAdd = () => {
		const {getFieldDecorator,getFieldValue,setFieldsValue} = this.props.form
		const keys = getFieldValue('keys')
		this.uuid ++
		const nextKeys = keys.concat(this.uuid);
		setFieldsValue({
	      keys: nextKeys,
	    });
	}
	handleRemove = (k) => {
		const {getFieldDecorator,getFieldValue,setFieldsValue} = this.props.form
		const keys = getFieldValue('keys')
		const nextKeys = keys.filter(v => v != k)
		setFieldsValue({
			keys: nextKeys
		})
	}
	handleSave = () => {
		const {getFieldValue} = this.props.form
		const {individualityInfo} = this.props
		let answerItemsRemote = []
		try{
			answerItemsRemote = JSON.parse(individualityInfo.get('extra'))
		}catch(e){
			// console.log(e)
		}
		let questionName = getFieldValue('question')
		let questionFile = this.state.questionFileList[0]
		let answerItems = []
		let keys = getFieldValue('keys')
		keys.forEach(v => {
			answerItems.push({
				answerName:getFieldValue(`answer-${v}`),
				answerFile:this.state[`answer-${v}`]?this.state[`answer-${v}`][0]:new File([],''),
				icon:answerItemsRemote[v]?answerItemsRemote[v].icon:''
			})
		})
		let jsonData = {
			questionName,
			questionFile,
			icon:this.state.questionFileList[0]?this.state.questionFileList[0].size>0?'':this.state.questionFileList[0].url:'',
			answerItems
		}
		this.props.onSubmit(jsonData)
	}
	render(){
		const {getFieldDecorator,getFieldValue} = this.props.form
		const {individualityInfo} = this.props
		let answerItemsRemote = []
		try{
			answerItemsRemote = JSON.parse(individualityInfo.get('extra'))
			getFieldDecorator('keys', { initialValue: answerItemsRemote.map((v,k) => k) });
		}catch(e){
			//just for data bind, to bind keys -> []
			getFieldDecorator('keys', { initialValue: [] });
		}

		const keys = getFieldValue('keys')
		const answerItems = keys.map(v => {
			return (
				<FormItem
					label={`答案-${v}`}
					labelCol={{span:2}}
					wrapperCol={{span:7}}
					key={`answer-${v}`}
				>
				<div className={styles.itemContent}>
					{getFieldDecorator(`answer-${v}`,{
						initialValue:answerItemsRemote[v]?answerItemsRemote[v].answerName:''
					})(
						<Input style={{width:150}}/>
					)}
					<UploadAvatar
						value={this.state[`answer-${v}`]||(answerItemsRemote[v]&&answerItemsRemote[v].icon?[_.extend(new File([],''),{
							uid:-1,
							url:answerItemsRemote[v].icon
						})]:[])}
						onChange={(file,fileList)=>{
							this.setState({
								[`answer-${v}`]:fileList
							})
						}}
						onRemove={(file,fileList)=>{
							this.setState({
								[`answer-${v}`]:[]
							})
						}}
					/>
					<Icon
		              className={styles.dynamicDeleteButton}
		              type="minus-circle-o"
		              disabled={keys.length === 1}
		              onClick={() => this.handleRemove(v)}
		            />
				</div>
				</FormItem>
			)
		})
		return (
			<div className={styles.container}>
				<div>
					<CreateEditHeader title={this.props.title}/>
				</div>
				<div className={styles.formPanel}>
					<Form>
						<FormItem
						  label="题目"
						  labelCol={{span:2}}
						  wrapperCol={{span:7}}
						>
						<div className={styles.itemContent}>
							{getFieldDecorator('question',{
								initialValue:individualityInfo.get('name')
							})(
								<Input style={{width:150}}/>
							)}
							<UploadAvatar
							value={this.state.questionFileList}
							onChange={(file,fileList)=>{
								this.setState({
									questionFileList:fileList
								})
							}}
							onRemove={()=>{
								this.setState({
									questionFileList:[]
								})
							}}
							/>
						</div>
						</FormItem>
						{answerItems}
						<FormItem
						  label=""
						  labelCol={{span:2}}
						  wrapperCol={{span:4,offset:2}}
						>
							<Button type="dashed" onClick={this.handleAdd}>
				            	<Icon type="plus" /> 添加一个答案
				          	</Button>
						</FormItem>
						<FormItem
						  label=""
						  labelCol={{span:2}}
						  wrapperCol={{span:4,offset:2}}
						>
							<Button type="primary" onClick={this.handleSave}>
				            	保存
				          	</Button>
						</FormItem>
					</Form>
				</div>
			</div>
		)
	}
}

export default Form.create()(CreateEditPanel)
