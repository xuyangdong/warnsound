import React from 'react'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {EditorState} from 'draft-js'
export default class DraftComponent extends React.Component{
	constructor(){
		super()
		this.state = {
			editorState:EditorState.createEmpty()
		}
	}
	onEditorStateChange = (editorState) => {
		console.log(editorState.getSelection())
		this.setState({
		editorState,
		});
	}
	render() {
	  const { editorState } = this.state;
	  return (<Editor
	    editorState={editorState}
	    onEditorStateChange={this.onEditorStateChange}
	  />)
	}
}
