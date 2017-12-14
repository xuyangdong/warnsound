import React from 'react'
import ReadGuideInput2 from './ReadGuideInput2'

export default class WangEditorTestWrapper extends React.Component {
	render(){
		return (
			<div>
			<button onClick={() => {
				console.log(this.refs.editor.getData())

			}}>click</button>
			<ReadGuideInput2 ref='editor'/>
			</div>
		)
	}
}
