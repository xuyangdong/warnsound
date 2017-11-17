import React from 'react'
import {getUserWork,getUserInfo} from 'actions/userWork'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

export default (WorkContainer) => {
	class UserWorkContainer extends React.Component {
		componentDidMount(){
			if(this.props.userWork.get('data').isEmpty()){
				this.props.getUserWork(this.props.params.id,0,10)
			}
			if(this.props.userWork.get('user').isEmpty()){
				this.props.getUserInfo(this.props.params.id)
			}
			if(this.props.userWork.getIn(['user','info','id']) != this.props.params.id){
				this.props.getUserWork(this.props.params.id,0,10)
				this.props.getUserInfo(this.props.params.id)
			}
		}
		getWork = (page,pageSize) => {
			this.props.getUserWork(this.props.params.id,page,pageSize)
		}
		render(){
			return (<WorkContainer
			work={this.props.userWork}
			title={`${this.props.userWork.getIn(['user','info','nickname'])}的用户的作品`}
			getWork={this.getWork}
			prefix={`user/${this.props.userWork.getIn(['user','info','id'])}`}
			{...this.props}
			/>)
		}
	}
	return connect(state => ({
		userWork:state.get('userWork')
	}),dispatch => ({
		getUserWork:bindActionCreators(getUserWork,dispatch),
		getUserInfo:bindActionCreators(getUserInfo,dispatch)
	}))(UserWorkContainer)
}
