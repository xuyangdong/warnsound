import React from 'react'
import {Upload,Button,Icon} from 'antd'

export default class MutiAvatarUploader extends React.Component {
	render(){
		return (
			<div>
				<Upload {...this.props.uploadProps}>
					<Button>
						<Icon type="upload" /> upload
					</Button>
				</Upload>
			</div>
		)
	}
}
