import React from 'react'
import {getWorksTagWork,getWorksTagInfo} from 'actions/worksTagWork'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

export default (WorkContainer) => {
	class WorksTagWorkContainer extends React.Component {
		componentDidMount(){
			if(this.props.worksTagWork.get('data').isEmpty()){
				this.props.getWorksTagWork(this.props.params.id,0,10)
			}
			if(this.props.worksTagWork.get('worksTag').isEmpty()){
				this.props.getWorksTagInfo(this.props.params.id)
			}
			if(this.props.worksTagWork.getIn(['worksTag','info','id']) != this.props.params.id){
				this.props.getWorksTagWork(this.props.params.id,0,10)
				this.props.getWorksTagInfo(this.props.params.id)
			}
		}
		getWork = (page,pageSize) => {
			this.props.getWorksTagWork(this.props.params.id,page,pageSize)
		}
		render(){
			return (<WorkContainer
			work={this.props.worksTagWork}
			title={`${this.props.worksTagWork.getIn(['worksTag','info','content'])}的标签的作品`}
			getWork={this.getWork}
			prefix={`worksTag`}
			{...this.props}
			/>)
		}
	}
	return connect(state => ({
		worksTagWork:state.get('worksTagWork')
	}),dispatch => ({
		getWorksTagWork:bindActionCreators(getWorksTagWork,dispatch),
		getWorksTagInfo:bindActionCreators(getWorksTagInfo,dispatch)
	}))(WorksTagWorkContainer)
}
