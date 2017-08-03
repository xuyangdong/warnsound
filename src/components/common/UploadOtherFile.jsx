import React from 'react'
import {Upload,Button,Icon} from 'antd'

export default class UploadOtherFile extends React.Component {
	render(){
		return (
	      <Upload>
		    <Button>
		      <Icon type="upload" /> {this.props.hint||'upload'}
		    </Button>
		  </Upload>
		)
	}
}
