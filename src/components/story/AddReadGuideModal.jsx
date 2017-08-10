import React from 'react'
import {Modal,Input} from 'antd'
export default class AddReadGuideModal extends React.Component {
	constructor(){
		super()
		this.state = {
			guide : ''
		}
	}
	componentDidMount(){
		const {editorState} = this.props
        const contentState = editorState.getCurrentContent()
		const selectionState = editorState.getSelection()
		const anchorKey = selectionState.getAnchorKey();
		const currentContent = editorState.getCurrentContent()
		const currentContentBlock = currentContent.getBlockForKey(anchorKey)


	}

	render(){
		return (
			<Modal
			visible={true}
			title='添加阅读指导'
			onOk={()=>{
				this.props.onOk(this.state.value)
			}}
			onCancel={this.props.onCancel}
			>
			<Input type='textarea' autosize={{minRows:5,maxRows:5}}
			value={this.state.value} onChange={(e) => {
				this.setState({
					value:e.target.value
				})
			}}/>
			</Modal>
		)
	}
}
