import React from 'react'
import {
	   AtomicBlockUtils,
	   Editor,
	   EditorState,
	   RichUtils,
	   convertToRaw,
	   ContentBlock,
	   ContentState,
	   CharacterMetadata,
	   DefaultDraftBlockRenderMap,
	   Entity,
	   Modifier
} from 'draft-js'
import {
	Icon,
	Button,
	Input
} from 'antd'
import {
	Map,
	List
} from 'immutable'
import styles from './ReadGuideInput.scss'
import 'draft-js/dist/Draft.css'
import classnames from 'classnames/bind'
import PropTypes from 'prop-types'
import {uploadIcon} from 'actions/common'
import _ from 'lodash'
const cx = classnames.bind(styles)
const Audio = (props) => {
	return <audio controls src={props.src} className={styles.media}/>;
};
const Image = (props) => {
	return <img src={props.src} className={styles.media}/>;
};
const Video = (props) => {
	return <video controls src={props.src} className={styles.media}/>;
};
const Media = (props) => {
	const entity = props.contentState.getEntity(
	  props.block.getEntityAt(0)
	);
	const {src} = entity.getData();
	const type = entity.getType();
	let media = null;
	if (type === 'audio') {
	  media = <Audio src={src} />;
	} else if (type === 'image') {
	  media = <Image src={src} />;
	} else if (type === 'video') {
	  media = <Video src={src} />;
	}
	return media;
};

const typeMap = ['','image','video','audio']

export default class ReadGuideInput extends React.Component {
	constructor(){
		super()
		this.state = {
			editorState:EditorState.createEmpty()
		}
	}
	getBlockArray = (jsonData) => {
		const {editorState} = this.state
		const contentState = editorState.getCurrentContent()
		const selectState = editorState.getSelection()
		let newEditorState = editorState,newContentState = contentState,
		newSelectState = selectState
		jsonData.forEach((v,k) => {
			newContentState = Modifier.splitBlock(newContentState,selectState)
			let newBlock = newContentState.getLastBlock()
			newEditorState = EditorState.set(editorState,{
				currentContent:newContentState
			})
			newEditorState = EditorState.moveFocusToEnd(newEditorState)
			newSelectState = newEditorState.getSelection()
		})
		return newEditorState.getCurrentContent().getBlocksAsArray()
	}
	_preProcessData = (props) => {
		const rawData = props.value||''
		const {editorState} = this.state
		const contentState = editorState.getCurrentContent()
		const selectState = editorState.getSelection()
		let postData = []
		let newEditorState = editorState,newContentState = contentState,
		newSelectState = selectState
		try{
			let jsonData = JSON.parse(rawData||'[]')
			let blockArray = this.getBlockArray(jsonData)
			jsonData.forEach((v,k) => {
				if(v.type==0){
					postData.push(blockArray[k].set('text',v.content).set('characterList',List(new Array(v.content.length)).map(v => CharacterMetadata.create())))
				}else{
					let entityKey = Entity.create(typeMap[v.type],'IMMUTABLE',{
						src:v.content
					})
					postData.push(blockArray[k]
						.set('text',' ')
						.set('type','atomic')
						.set('characterList',List([1]).map(v => CharacterMetadata.create({
							entity:entityKey
						}))))
				}
			})
		}catch(e){
			newContentState = ContentState.createFromText(rawData)
			postData = newContentState.getBlocksAsArray()
		}
		return postData
	}
	componentWillReceiveProps(nextProps){
		const blockArray = this._preProcessData(nextProps)
		const {editorState} = this.state
		if(blockArray.length>0 && nextProps.value != this.props.value){
			this.setState({
				editorState:EditorState.createWithContent(ContentState.createFromBlockArray(blockArray))
			})
		}
	}

	_confirmMedia = (urlValue,urlType) => {
		 const {editorState} = this.state;
		 const contentState = editorState.getCurrentContent();
		 const contentStateWithEntity = contentState.createEntity(
		   urlType,
		   'IMMUTABLE',
		   {src: urlValue}
		 );
		 const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
		 const newEditorState = EditorState.set(
		   editorState,
		   {currentContent: contentStateWithEntity}
		 );

		 this.setState({
            editorState: AtomicBlockUtils.insertAtomicBlock(
              newEditorState,
              entityKey,
              ' '
            )});
	}

	handleSelectFile = (fileUrl,fileType) => {
		this._confirmMedia(fileUrl,fileType)
	}

	mediaBlockRenderer = (block) => {
	  if (block.getType() === 'atomic') {
	      return {
	        component: Media,
	        editable: false,
	      };
	  }
        return null;
	}

	getData = () => {
		const {editorState} = this.state
		const contentState = editorState.getCurrentContent()
		const blockArray = contentState.getBlocksAsArray()
		return _.concat(blockArray.map((v,k) => {
			if(v.get('type')==='atomic'){
				//多媒体
				const entityKey = v.getEntityAt(0)
				const entity = contentState.getEntity(entityKey)
				const {src} = entity.getData()
				return {
					order:k,
					type:typeMap.indexOf(entity.getType()),
					content:src
				}
			}else{
				//文本
				return {
					order:k,
					type:0,
					content:v.getText()
				}
			}
		}).filter(v => !!v.content),[{order:blockArray.length,type:0,content:''}])
	}

	render(){
		return (
			<div className={styles.container}>
				<div className={styles.selectBar}>
					<SelectBar onSelectFile={this.handleSelectFile}/>
				</div>
				<div className={styles.editorPanel}>
					<Editor
						editorState={this.state.editorState}
						handleKeyCommand={this.handleKeyCommand}
						onChange={(state) => {
							this.setState({
								editorState:state
							})
						}}
						blockRendererFn={this.mediaBlockRenderer}
						blockStyleFn={(contentBlock)=>{
                           const type = contentBlock.getType();
                              if (type === 'unstyled') {
                                  return styles.unstyled;
                            }
                        }}
						ref="editor"
					/>
				</div>
			</div>
		)
	}
}

class SelectBar extends React.Component {
	constructor(){
		super()
		this.state = {
			itemName:''
		}
	}
	handleClick = (itemName,e) => {
		if(!!this.state.itemName && this.state.itemName == itemName){
			this.setState({
				itemName: ''
			})
		}else{
			this.setState({
				itemName:itemName
			})
		}
	}
	handleSelectFile = (fileUrl) => {
		this.props.onSelectFile(fileUrl,this.state.itemName)
	}
	render(){
		return (
			<div className={styles.selectBarContainer}>
				<div className={styles.selectItem} onClick={this.handleClick.bind(this,'image')}>
					<Icon type="picture" />
				</div>
				<div className={styles.selectItem} onClick={this.handleClick.bind(this,'video')}>
					<Icon type="video-camera" />
				</div>
				<div className={styles.selectItem} onClick={this.handleClick.bind(this,'audio')}>
					<Icon type="sound" />
				</div>
				<div className={cx('dropDownPanel',{
					'dropDownPanelActive':!!this.state.itemName
				})}>
					<DropDownPanel resourceType={this.state.itemName} onSelectFile={this.handleSelectFile}/>
				</div>
			</div>
		)
	}
}

class DropDownPanel extends React.Component {
	static propTypes = {
		resourceType:PropTypes.string
	}
	constructor(){
		super()
		this.state = {
			resourceUrl:''
		}
	}
	handleFileChange = (e) => {
		uploadIcon(e.target.files[0]).then(res => {
			this.props.onSelectFile(res.obj.url)
		})
	}
	render(){
		const {resourceType} = this.props
		return (
			<div className={styles.dropDownPanelContainer}>
				<Input placeholder='来自网络,请输入资源url' onPressEnter={(e)=>{
					e.preventDefault()
					this.props.onSelectFile(e.target.value)
				}}/>&nbsp;or&nbsp;
				<Button onClick={() => {
					this.refs.resourceFile.click()
				}}>来自文件，请选择{resourceType=='image'?'图片':resourceType=='video'?'视频':'音频'}</Button>
				<input type='file' ref='resourceFile' style={{display:'none'}} onChange={this.handleFileChange}/>
			</div>
		)
	}
}
