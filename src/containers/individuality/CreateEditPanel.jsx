import React from 'react'
import styles from './CreateEditPanel.scss'
import CreateEditHeader from '../../components/common/CreateEditHeader'
import {Form,Input,Icon, Button, notification, Select } from 'antd'
import UploadAvatar from '../../components/common/UploadAvatar'
import _ from 'lodash'
import StoryTagSelector from '../../components/storyTag/StoryTagSelector'
const FormItem = Form.Item
const Option = Select.Option

class CreateEditPanel extends React.Component {
	static contextTypes = {
		router:React.PropTypes.object
	}
	constructor(){
		super()
    this.uuid = 0
		this.state = {
			questionFileList:[]
		}
	}
	componentWillReceiveProps(nextProps){
		if(!nextProps.individualityInfo.isEmpty()){
			this.setState({
				questionFileList:nextProps.individualityInfo.get('pic')?[_.extend(new File([],''),{
					uid:-1,
					url:nextProps.individualityInfo.get('pic')
				})]:[]
			})
		}
	}
	handleAdd = () => {
		const {getFieldDecorator,getFieldValue,setFieldsValue} = this.props.form
		const keys = getFieldValue('keys')
    this.uuid = this.uuid + 1
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
				tagId:getFieldValue(`tagId-${v}`),
				answerFile:this.state[`answer-${v}`]?this.state[`answer-${v}`][0]:new File([],''),
				icon:answerItemsRemote[v]?answerItemsRemote[v].icon:''
			})
		})
		let jsonData = {
			questionName,
			questionFile,
			// icon:this.state.questionFileList[0]?this.state.questionFileList[0].size>0?'':this.state.questionFileList[0].url:'',
      icon:this.state.questionFileList[0]?this.state.questionFileList[0].size>0?'':this.state.questionFileList[0].url:'',
			answerItems,
      quesType:getFieldValue('questionType'),
      style:getFieldValue('style')
		}
		notification.info({message:'请求已提交'})
		this.props.onSubmit(jsonData)
		this.context.router.goBack(0)
	}
	render(){
		const {getFieldDecorator,getFieldValue} = this.props.form
		const {individualityInfo,storyTags} = this.props
		let answerItemsRemote = []
		try{
			answerItemsRemote = JSON.parse(individualityInfo.get('extra'))
			answerItemsRemote = answerItemsRemote.map((v,k) => {
				if(typeof v.tagId === 'string'){
					let tagArray = v.tagId.split(',')
					return {
						..._.omit(v,'tagId'),
						tagId:_.concat([],tagArray)
					}
				}else{
					return v
				}
			})
			getFieldDecorator('keys', { initialValue: answerItemsRemote.map((v,k) => k) });
      this.uuid = answerItemsRemote.length
		}catch(e){
			//just for data bind, to bind keys -> []
			getFieldDecorator('keys', { initialValue: [] });
		}


		const keys = getFieldValue('keys')
		// console.log("-->:",answerItemsRemote)
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
				{getFieldDecorator(`tagId-${v}`,{
					initialValue:(answerItemsRemote[v]&&answerItemsRemote[v].tagId)?answerItemsRemote[v].tagId:[]
				})(<StoryTagSelector mode='multiple' options={storyTags.toJS()}/>)}
				</FormItem>
			)
		})
		return (
			<div className={styles.container}>
				<div>
					<CreateEditHeader onDelete={this.props.onDelete} title={this.props.title}/>
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
            <FormItem
              label="排版"
              labelCol={{span:2}}
              wrapperCol={{span:7}}
            >
            {getFieldDecorator('style',{
              initialValue:''+individualityInfo.get('style')
            })(
							<Select>
                <Option value='0' key='0'>双列</Option>
                <Option value='1' key='1'>单列</Option>
                <Option value='2' key='2'>单列紧缩</Option>
              </Select>
						)}
            </FormItem>
            <FormItem
              label="是单选(多选)"
              labelCol={{span:2}}
              wrapperCol={{span:7}}
            >
            {getFieldDecorator('questionType',{
              initialValue:''+individualityInfo.get('quesType')
            })(
							<Select>
                <Option value='0' key='0'>单选</Option>
                <Option value='1' key='1'>多选</Option>
              </Select>
						)}
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
