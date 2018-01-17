import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from './ReadGuideInput4.scss'
import { uploadToOSS } from 'actions/common'
import {notification} from 'antd'

export default class EditorConvertToHTML extends Component {
    state = {
        editorState: EditorState.createEmpty( )
    }

	_convertFromServerToEditor = (props) => {
		let html = props.value||'<p></p>'
		try{
			let array = JSON.parse(this.props.value)
			if(typeof array == 'array' || typeof array == 'object'){
				html = array.reduce((p,c) => {
					if(c.type==0){
						p = p + `<p>${c.content}<\/p>`
					}else if(c.type==1){
						p = p + `<img src='${c.content}'\/>`
					}else if(c.type==2){
						p = p + `<video src=${c.content}\/>`
					}else {
						throw new Error('错误的类型')
					}
					return p
				},'')
			}else{
				html = this.props.value.slice(1,this.props.value.length-1)
			}
		}catch(e){
			notification.error({message:'解析出错'})
		}
		const blocksFromHtml = htmlToDraft(html);
		const { contentBlocks, entityMap } = blocksFromHtml;
		const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
		const editorState = EditorState.createWithContent(contentState);
		return editorState
	}

	componentDidMount() {
		const editorState = this._convertFromServerToEditor(this.props)
		this.setState({
			editorState,
		})
	}

	componentWillReceiveProps(nextProps) {
		const editorState = this._convertFromServerToEditor(nextProps)
		this.setState({
			editorState,
		})
	}

    onEditorStateChange : Function = ( editorState ) => {
        this.setState({ editorState });
    };

    render( ) {
        const { editorState } = this.state;
		const toolbar = {
			image: {
				alignmentEnabled: 'LEFT',
				uploadCallback: ( file ) => {
					return uploadToOSS( file ).then(url => ({
						data: {
							link: url
						}
					}))
				},
				inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
				alt: {
					present: false,
					mandatory: false
				},
				defaultSize: {
					height: 'auto',
					width: 'auto'
				}
			}
		}
        return (
            <div>
                <Editor
				editorState={editorState}
				wrapperClassName={styles.wrapper}
				editorClassName="demo-editor"
				onEditorStateChange={this.onEditorStateChange}
				toolbar={toolbar}
				localization={{
			      locale: 'zh',
			    }}
				/>
            </div>
        );
    }
}
