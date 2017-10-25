import React from 'react'
import UeditorComponent from '../../components/UeditorComponent'
export default class TestContainer extends React.Component {
	render(){
		return (
			<div>
				{this.props.children}
			</div>
		)
	}
}
