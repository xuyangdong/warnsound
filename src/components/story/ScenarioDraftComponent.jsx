import React from 'react'
import { Editor,EditorState,ContentState } from 'draft-js'
import styles from './ScenarioDraftComponent.scss'
import 'draft-js/dist/Draft.css'

export default class ScenarioDraftComponent extends React.Component {
	_init = false
	constructor(){
		super()
		this.state = {
			editorState: EditorState.createEmpty( ),
		}
	}
	getData = () => {
		let contentState = this.state.editorState.getCurrentContent()
		let blockArray = contentState.getBlocksAsArray()
		let rawContentArray = blockArray.map((v,k) => ({
			order:k,
			content:v.getText().trim(),
		}))
		return rawContentArray
	}
	preProcess = (props) => {
		const {value} = props
		if(!this._init){
            if ( props.value ) {
                this._init = true
                let valueToArray = []
                try{
                    valueToArray = JSON.parse( props.value || '[]' )
                }catch (e) {
                    valueToArray
                }
                let contentState = ContentState.createFromText(valueToArray.map( v => v.content ).join( '\n' ))
				this.setState({
					editorState:EditorState.createWithContent( contentState )
				})
			}
		}
	}
	componentWillReceiveProps(nextProps){
		this.preProcess(nextProps)
	}
	render(){
		const {editorState} = this.state
		return (
			<div className={styles.container}>
				<Editor
				editorState={editorState}
				onChange={(editorState) => {
					this.setState({
						editorState
					})
				}}
				blockStyleFn={(contentBlock)=>{
				   const type = contentBlock.getType();
					  if (type === 'unstyled') {
						  return styles.unstyled;
					}
				}}
				onBlur={()=>{this.props.onBlur(this.getData())}}
				/>
			</div>
		)
	}
}
