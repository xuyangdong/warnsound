import React from 'react'
import { Editor } from 'draft-js'
import styles from './DraftComponent.scss'
import { Button, Select,TreeSelect } from 'antd'
import { ContentState, EditorState, ContentBlock, Modifier, CharacterMetadata, DefaultDraftBlockRenderMap, AtomicBlockUtils, convertFromHTML, convertFromRaw} from 'draft-js'
import { Map, List } from 'immutable'
import 'draft-js/dist/Draft.css'
import MediaTextComponent from './MediaTextComponent'
import _ from 'lodash'
import {fromJS} from 'immutable'

const MAX_SENTENCE = 10
const separator = /[,|.|;|，|。|；]/
const Option = Select.Option

export default class DraftComponent extends React.Component {
    constructor( ) {
        super( )
        this.state = {
            editorState: EditorState.createEmpty( ),
            beautyEditorState: EditorState.createEmpty( )
        }
    }
    componentWillReceiveProps( nextProps ) {

        if ( nextProps.value && !nextProps.soundEffectByTag.isEmpty()) {
            let contentState = ContentState.createFromText(JSON.parse( nextProps.value || '[]' ).map( v => v.content ).join( '\n' ))
            let contentArray = JSON.parse( nextProps.value || '[]' )
            let blockArray = contentState.getBlocksAsArray()
            for(let index in contentArray){
                if(contentArray[index].soundEffectId){
                    let value = contentArray[index].soundEffectId
                    blockArray[index] = blockArray[index].set('data',fromJS({
                        soundEffectId:contentArray[index].soundEffectId,
                        soundEffectUrl:nextProps.soundEffectByTag.reduce((p,c) => {
                            let soundEffect = c.get('soundEffect')
                            let result = soundEffect.find(v => v.get('id')==value)
                            if(result){
                                p = result.get('url')
                            }
                            return p
                        },''),
                        soundEffectName:nextProps.soundEffectByTag.reduce((p,c) => {
                            let soundEffect = c.get('soundEffect')
                            let result = soundEffect.find(v => v.get('id')==value)
                            if(result){
                                p = result.get('description')
                            }
                            return p
                        },''),
                    }))
                }
            }
            contentState = ContentState.createFromBlockArray(blockArray)
            this.setState({
                editorState: EditorState.createWithContent( contentState )
            })
        }
    }
    onEditorStateChange = ( editorState ) => {
        const contentState = editorState.getCurrentContent()
        let selectState = editorState.getSelection()
        let blockKey = selectState.getStartKey()
        let block = contentState.getBlockForKey(blockKey)
        let blockData = block.getData().get('soundEffectId')
        this.setState({
            soundEffectId:blockData||'-1'
        })
        // this.setState({ editorState:EditorState.push(editorState,contentState,'change-block-data') });
        this.setState({ editorState,});
    }
    createBlock( block, i, text ) {
        return new ContentBlock(new Map({
            key: block.getKey( ) + `sub_${ i }`,
            text: text,
            type: block.getType( ),
            characterList: List(new Array( text.length )).map(v => CharacterMetadata.create( )),
            depth: block.getDepth( ),
            data: block.getData( )
        }))
    }
    splitBlock( blockArray ) {
        return blockArray.reduce(( p, c ) => {
            let length = c.getLength( )
            let text = c.getText( )
            let temp = [ ]
            let i = 0
            let sentence = ''
            for ( ; i < length; i++ ) {
                if (sentence.length <= MAX_SENTENCE && !separator.test(text.charAt( i ))) {
                    sentence = sentence + text.charAt( i )
                } else {
                    sentence = sentence + text.charAt( i )
                    temp.push(this.createBlock( c, i, sentence ))
                    sentence = ''
                }
            }
            if ( sentence ) {
                temp.push(this.createBlock( c, i, sentence ))
            }
            return p.concat( temp )
        }, [ ])
    }
    handleClick( e ) {
        const { editorState } = this.state
        let contentState = editorState.getCurrentContent( )
        let blockArray = contentState.getBlocksAsArray( )
        let newBlockArray = this.splitBlock( blockArray )
        this.setState({
            editorState: EditorState.createWithContent(ContentState.createFromBlockArray( newBlockArray ))
        })
    }
    handleSelectSoundEffect( value, node ) {
		let selectState = this.state.editorState.getSelection();
		let contentState = this.state.editorState.getCurrentContent();
        this.setState({
            soundEffectId:value
        })
        let newContentState = null;
        if(value=='-1'){
            newContentState = Modifier.setBlockData(contentState,selectState,new Map({
    			soundEffectId:'',
    			soundEffectUrl:'',
                soundEffectName:''
    		}))
            // newContentState = Modifier.setBlockType(newContentState,selectState,'unstyled')
        }else{
            newContentState = Modifier.setBlockData(contentState,selectState,new Map({
    			soundEffectId:value,
    			// soundEffectUrl:this.props.soundEffects.find(v => v.get('id')==value).get('url'),
                soundEffectUrl:this.props.soundEffectByTag.reduce((p,c) => {
                    let soundEffect = c.get('soundEffect')
                    let result = soundEffect.find(v => v.get('id')==value)
                    if(result){
                        p = result.get('url')
                    }
                    return p
                },''),
                // soundEffectName:this.props.soundEffects.find(v => v.get('id')==value).get('description')
                soundEffectName:this.props.soundEffectByTag.reduce((p,c) => {
                    let soundEffect = c.get('soundEffect')
                    let result = soundEffect.find(v => v.get('id')==value)
                    if(result){
                        p = result.get('description')
                    }
                    return p
                },'')
            }))
    		// newContentState = Modifier.setBlockType(newContentState,selectState,'mediaText')
        }
        this.setState({
            editorState:EditorState.createWithContent(newContentState)
        })

	}
	myBlockRenderer(contentBlock){
		const type = contentBlock.getType();
		if(type=='mediaText'){
			return {
		      component: MediaTextComponent,
		      editable: true,
		    };
		}
		return ;
	}
	myBlockRenderMap = DefaultDraftBlockRenderMap.merge(Map({
		'mediaText':{
			element:'div'
		}
	}))
	getData(){
		let contentState = this.state.editorState.getCurrentContent()
		let blockArray = contentState.getBlocksAsArray()
		return blockArray.map((v,k) => ({
			order:k,
			content:v.getText(),
			soundEffectId:v.getData().get('soundEffectId')
		}))
	}
    handleClearSoundEffect = () => {
        const {editorState} = this.state
        const contentState = editorState.getCurrentContent()
        const blockArray = contentState.getBlocksAsArray()
        const newblockArray = blockArray.map(v => {
            return v.set('data',(new Map({
                soundEffectId:'',
                soundEffectUrl:'',
                soundEffectName:''
            }))).set('type','unstyled')
        })
        const newContentState = ContentState.createFromBlockArray(newblockArray)
        this.setState({
            editorState:EditorState.createWithContent(newContentState)
        })
    }
    handlePastedText = (text,html) => {
        // console.log(html)
        // const _html = html?html.replace(/<br>/g,'<br /><br />').replace(/<div>/g,'\n').replace(/<\/div>/g,'\n'):html
        // console.log('_html',_html)
        // const blocksFromHTML = convertFromHTML(_html);
        // // blocksFromHTML.contentBlocks
        // const state = ContentState.createFromBlockArray(
        //   blocksFromHTML.contentBlocks,
        //   blocksFromHTML.entityMap
        // );
        // this.setState({
        //     editorState:EditorState.createWithContent(state)
        // })
        return false
    }
    handleClearSoundEffectByBlock = (block) => {
        const {editorState} = this.state
        const contentState = editorState.getCurrentContent()
        const blockArray = contentState.getBlocksAsArray()
        const newblockArray = blockArray.map(v => {
            return v.getKey()==block.getKey()?v.set('data',(new Map({
                soundEffectId:'',
                soundEffectUrl:'',
                soundEffectName:''
            }))).set('type','unstyled'):v
        })
        const newContentState = ContentState.createFromBlockArray(newblockArray)
        this.setState({
            editorState:EditorState.createWithContent(newContentState)
        })
    }
    renderDisplayPanel = () => {
        const {editorState} = this.state
        const contentState = editorState.getCurrentContent()
        const blockMap = contentState.getBlockMap()
        return (blockMap.map((v,k) => {
            if(v.get('data').isEmpty()||v.get('data').get('soundEffectUrl')===''){
                return (<div key={k}>&nbsp;</div>)
            }else{
                return <MediaTextComponent onDelete={this.handleClearSoundEffectByBlock} key={k} block={v}/>
            }
        }).toArray())
    }
    renderEffectTree = () => {
        const { soundEffectByTag } = this.props
        let treeData = soundEffectByTag.map(v => {
            return {
                label:''+v.getIn(['soundEffectTag','content']),
                value:''+v.getIn(['soundEffectTag','id']),
                key:''+v.getIn(['soundEffectTag','id']),
                children:v.get('soundEffect').map(v2 => {
                    return {
                        label:''+v2.get('description'),
                        value:''+v2.get('id'),
                        key:''+v2.get('id'),
                        isLeaf:true
                    }
                }).toJS()
            }
        }).toJS()
        treeData = _.concat([{
            label:'无音效',
            value:'-1',
            key:'-1'
        }],treeData)
        return (
            <TreeSelect
                style={{ width: 300 }}
                defaultValue='-1'
                value={this.state.soundEffectId||'-1'}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeData={treeData}
                placeholder="Please select"
                onSelect={this
                    .handleSelectSoundEffect
                    .bind( this )}
              />
        )
    }
    render( ) {
        const { editorState, beautyEditorState } = this.state;
        return (
            <div className={styles.container}>
                <div className={styles.toolBar}>
                <div>
                    <Button onClick={this
                        .handleClick
                        .bind( this )} style={{marginRight:10}}>一键美化</Button>
                    {this.renderEffectTree()}
                    </div>
                    <Button onClick={this.handleClearSoundEffect} type="danger" ghost>
                        <span>清除所有音效</span>
                    </Button>
                </div>
                <div className={styles.editPanel}>
                    <div className={styles.editPart}>
                        <Editor
						editorState={editorState}
						onChange={this.onEditorStateChange}
						blockRendererFn={this.myBlockRenderer}
						blockRenderMap={this.myBlockRenderMap}
                        handlePastedText={this.handlePastedText}
						/>
                    </div>
                    <div className={styles.displayPart}>
                    {this.renderDisplayPanel()}
                    </div>
                </div>
            </div>
        )
    }
}
