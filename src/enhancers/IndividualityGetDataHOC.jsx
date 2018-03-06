import React from 'react'
import config from '../config'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fromJS} from 'immutable'
import {createQuestion,editQuestion,deleteQuestion} from 'actions/individual'
import {notification} from 'antd'

export default (CreateEditPanel) => {
	class IndividualCreateEditPanel extends React.Component {
		constructor(){
			super()
			this.state = {
				individualityInfo:fromJS({}),
				storyTags:fromJS([])
			}
		}
		componentDidMount(){
			fetch(config.api.storyTag.get(0,100000),{
				headers:{
					authorization:sessionStorage.getItem('auth')
				}
			}).then(res => res.json()).then(res => {
				this.setState({
					storyTags:fromJS(res.obj)
				})
			})
			if(this.props.type=='edit'){
				fetch(config.api.individual.query(this.props.params.id),{
					headers:{
						authorization:sessionStorage.getItem('auth')
					}
				}).then(res => res.json()).then(res => {
					this.setState({
						individualityInfo:fromJS(res)
					})
				})
			}
		}
		uploadIcon = (data) => {
			const fileList = data.questionFile&&data.questionFile.size>0?[data.questionFile]:[]
			const answerItems = data.answerItems
			answerItems.forEach(item => {
				if(item && item.answerFile && item.answerFile.size>0)
					fileList.push(item.answerFile)
			})
			let formData = new FormData()
			fileList.forEach(file => {
				formData.append('files',file)
			})
			if(fileList.length>0){

				return fetch(config.api.file.post,{
					method:'post',
					headers:{
						authorization:sessionStorage.getItem('auth')
					},
					body:formData
				}).then(res => res.json()).then(res => {
					if(res.status == 2){
						notification.error({message:res.errorMes})
					}else{
						const iconUrls = res.obj.multiUrls
						let jsonData = {
							name:data.questionName,
              quesType:data.quesType,
              style:data.style,
							pic:data.questionFile&&data.questionFile.size>0?iconUrls[0]:data.icon,
							extra:[]
						}
						//fileIndex=1是上传了题目ICON，fileIndex=0,是没有上传题目ICON
						let fileIndex = data.questionFile&&data.questionFile.size>0?1:0
						jsonData.extra = answerItems.map((v,k)=>{
							if(v.answerFile&&v.answerFile.size>0){
								console.log(":asdfasdfasdf:",iconUrls)
								return {
									answerName:v.answerName,
									icon:iconUrls[fileIndex++],
									tagId:v.tagId
								}
							}else{
								return {
									answerName:v.answerName,
									icon:v.icon,
									tagId:v.tagId
								}
							}
						})

						jsonData.extra = JSON.stringify(jsonData.extra)
						return jsonData
					}
				})
			}else{
				let jsonData = {
					name:data.questionName,
					pic:data.icon,
          quesType:data.quesType,
          style:data.style,
					extra:JSON.stringify(answerItems.map(v => ({
						answerName:v.answerName,
						icon:v.icon,
						tagId:v.tagId
					})))
				}
				return Promise.resolve(jsonData)
			}
		}
		handleCreate = (data) => {
			this.uploadIcon(data).then(res => {
				this.props.createQuestion(res)
			})
		}
		handleEdit = (data) => {
			this.uploadIcon(data).then(res => {
				this.props.editQuestion(res,this.props.params.id)
			})
		}
		handleDelete = () => {
			return this.props.deleteQuestion(this.props.params.id)
		}
		render(){
			const {individualityInfo,storyTags} = this.state
			const props = {
				individualityInfo,
				storyTags
			}
			return (
				<CreateEditPanel title='创建个性推荐' onSubmit={this.props.type=='create'?this.handleCreate:this.handleEdit} onDelete={this.handleDelete} {...props}/>
			)
		}
	}
	return connect(state => ({}),dispatch => ({
		createQuestion:bindActionCreators(createQuestion,dispatch),
		editQuestion:bindActionCreators(editQuestion,dispatch),
		deleteQuestion:bindActionCreators(deleteQuestion,dispatch)
	}))(IndividualCreateEditPanel)
}
