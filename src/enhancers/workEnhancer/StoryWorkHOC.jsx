import React from 'react'
import {getStoryWork,getStoryInfo} from 'actions/storyWork'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

export default (WorkContainer) => {
	class StoryWorkContainer extends React.Component {
		componentDidMount(){
			if(this.props.storyWork.get('data').isEmpty()){
				this.props.getStoryWork(this.props.params.id,0,10)
			}
			if(this.props.storyWork.get('story').isEmpty()){
				this.props.getStoryInfo(this.props.params.id)
			}
			if(this.props.storyWork.getIn(['story','id']) != this.props.params.id){
				this.props.getStoryWork(this.props.params.id,0,10)
				this.props.getStoryInfo(this.props.params.id)
			}
		}
		getWork = (page,pageSize) => {
			this.props.getStoryWork(this.props.params.id,page,pageSize)
		}
		render(){
			return (<WorkContainer
			work={this.props.storyWork}
			title={`${this.props.storyWork.getIn(['story','title'])}的故事的作品`}
			getWork={this.getWork}
			prefix={`stories/${this.props.storyWork.getIn(['story','id'])}`}
			/>)
		}
	}
	return connect(state => ({
		storyWork:state.get('storyWork')
	}),dispatch => ({
		getStoryWork:bindActionCreators(getStoryWork,dispatch),
		getStoryInfo:bindActionCreators(getStoryInfo,dispatch)
	}))(StoryWorkContainer)
}
