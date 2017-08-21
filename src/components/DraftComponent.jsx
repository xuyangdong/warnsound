import React from 'react'
import { Editor } from 'draft-js'
import styles from './DraftComponent.scss'
import { Button, Select,TreeSelect, Cascader, Tag} from 'antd'
import { ContentState, EditorState, ContentBlock, Modifier, CharacterMetadata, DefaultDraftBlockRenderMap, AtomicBlockUtils, convertFromHTML, convertFromRaw} from 'draft-js'
import { Map, List } from 'immutable'
import 'draft-js/dist/Draft.css'
import MediaTextComponent from './MediaTextComponent'
import _ from 'lodash'
import {fromJS} from 'immutable'
import ForkBlockData from '../model/ForkBlockData'
import AddReadGuideModal from '../components/story/AddReadGuideModal'

const MAX_SENTENCE = 18
const separator = /[,|.|;|，|。|；]/
const Option = Select.Option
class TreeData {
    constructor(treeData){
        this.treeData = treeData
    }
    findPath(value){
		let path = []
        function walk(treeData,tempPath = []){
            if(treeData){
				for(let treeNode of treeData){
					if(treeNode.value == value){
						path = path.concat(tempPath,treeNode)
					}else{
						tempPath.push(treeNode)
						walk(treeNode.children,tempPath)
						tempPath.pop()
					}
				}
			}
		}
		walk(this.treeData,[])
		return path
    }
}
export default class DraftComponent extends React.Component {
    _treeData = []
    _init = false
    constructor( ) {
        super( )
        this.state = {
            editorState: EditorState.createEmpty( ),
            beautyEditorState: EditorState.createEmpty( )
        }
    }
    preProcess(rawContentArray){
        let contentArray = []

        for(let content of rawContentArray){
            let contentSoundEffectId = content.soundEffectId
            let readGuide = content.readGuide
            let tempArray = content.content?content.content.split('*'):''
            for(let temp of tempArray){
                contentArray.push({
                    content:''+temp,
                    soundEffectId:contentSoundEffectId,
                    readGuide:readGuide
                })
            }
            contentArray.push({
                content:'',
            })
        }
        return contentArray
    }
    componentWillReceiveProps( nextProps ) {
        if(!this._init){
            if ( nextProps.value && !nextProps.soundEffectByTag.isEmpty()) {
                this._init = true
                let valueToArray = []
                try{
                    valueToArray = JSON.parse( nextProps.value || '[]' )
                }catch (e) {
                    valueToArray
                }
                let contentState = ContentState.createFromText(this.preProcess(valueToArray).map( v => v.content ).join( '\n' ))
                let contentArray = valueToArray
                let blockArray = contentState.getBlocksAsArray()
                contentArray = this.preProcess(contentArray)
                for(let index in contentArray){
                    if(contentArray[index].soundEffectId){
                        let value = contentArray[index].soundEffectId
                        blockArray[index] = blockArray[index].set('data',fromJS({
                            readGuide:contentArray[index].readGuide,
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
                    blockArray[index] = blockArray[index].setIn(['data','readGuide'],contentArray[index].readGuide)
                }
                contentState = ContentState.createFromBlockArray(blockArray)
                this.setState({
                    editorState: EditorState.createWithContent( contentState )
                })
            }
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

        // this.setState({
        //     editorState:EditorState.forceSelection(editorState,selectState)
        // });
        this.setState({
            editorState
        })
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
            if(text.length==0){
                temp.push(this.createBlock( c, i, '' ))
            }else{
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
            soundEffectId:value[value.length-1]
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
            newContentState = Modifier.mergeBlockData(contentState,selectState,new Map({
    			soundEffectId:value[value.length-1],
    			// soundEffectUrl:this.props.soundEffects.find(v => v.get('id')==value).get('url'),
                soundEffectUrl:this.props.soundEffectByTag.reduce((p,c) => {
                    let soundEffect = c.get('soundEffect')
                    let result = soundEffect.find(v => v.get('id')==value[value.length-1])
                    if(result){
                        p = result.get('url')
                    }
                    return p
                },''),
                // soundEffectName:this.props.soundEffects.find(v => v.get('id')==value).get('description')
                soundEffectName:this.props.soundEffectByTag.reduce((p,c) => {
                    let soundEffect = c.get('soundEffect')
                    let result = soundEffect.find(v => v.get('id')==value[value.length-1])
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
    handleAddReadGuild = (value) => {
        let selectState = this.state.editorState.getSelection();
		let contentState = this.state.editorState.getCurrentContent();
        let newContentState = null;

        newContentState = Modifier.mergeBlockData(contentState,selectState,new Map({
            readGuide:value,

        }))
        this.setState({
            editorState:EditorState.createWithContent(newContentState),
            openReadGuideModal:false
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
    prePostProcess(rawContentArray){
        let result = []
        let contentBlock = {
            keyArray:[]
        }
        rawContentArray.forEach((v,k) => {
            if(v.content){
                if(contentBlock.content){
                    contentBlock.content = contentBlock.content + '*' + v.content
                }else{
                    contentBlock.content = v.content
                }
                if(v.soundEffectId){
                    contentBlock.soundEffectId = v.soundEffectId
                    contentBlock.soundEffectUrl = v.soundEffectUrl
                    contentBlock.soundEffectName = v.soundEffectName
                }
                if(v.readGuide){
                    contentBlock.readGuide = v.readGuide
                }
                contentBlock.keyArray.push(v.blockKey)
            }else{
                result.push(contentBlock)
                contentBlock = {
                    keyArray:[]
                }
            }
        })
        if(result.length==0){
            result.push(contentBlock)
        }
        return result.map((v,k) => ({
            ...v,
            key: k
        }))
    }
	getData(){
		let contentState = this.state.editorState.getCurrentContent()
		let blockArray = contentState.getBlocksAsArray()
        let rawContentArray = blockArray.map((v,k) => ({
			order:k,
			content:v.getText().trim(),
			soundEffectId:v.getData().get('soundEffectId'),
            readGuide:v.getData().get('readGuide'),
		}))
        return this.prePostProcess(rawContentArray).map(v => _.omit(v,'keyArray'))
	}
    handleClearSoundEffect = () => {
        const {editorState} = this.state
        const contentState = editorState.getCurrentContent()
        const blockArray = contentState.getBlocksAsArray()
        const newblockArray = blockArray.map(v => {
            return v.set('data',(new Map({
                soundEffectId:'',
                soundEffectUrl:'',
                soundEffectName:'',
                readGuide:'',
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
            return block.getData().get('keyArray').find(kA => kA==v.getKey())?v.set('data',(new Map({
                soundEffectId:'',
                soundEffectUrl:'',
                soundEffectName:'',
                readGuide:v.getIn(['data','readGuide'])
            }))).set('type','unstyled'):v
        })
        const newContentState = ContentState.createFromBlockArray(newblockArray)
        this.setState({
            editorState:EditorState.createWithContent(newContentState)
        })
    }
    handleClearReadGuideByBlock = (block) => {
        const {editorState} = this.state
        const contentState = editorState.getCurrentContent()
        const blockArray = contentState.getBlocksAsArray()
        const newblockArray = blockArray.map(v => {
            return block.getData().get('keyArray').find(kA => kA==v.getKey())?v.setIn(['data','readGuide'],'').set('type','unstyled'):v
        })
        const newContentState = ContentState.createFromBlockArray(newblockArray)
        this.setState({
            editorState:EditorState.createWithContent(newContentState)
        })
    }
    renderDisplayPanel = () => {
        const {editorState} = this.state
        const contentState = editorState.getCurrentContent()
        // const blockMap = contentState.getBlockMap()

        let blockArray = contentState.getBlocksAsArray()
        let rawContentArray = blockArray.map((v,k) => ({
			order:k,
			content:v.getText(),
			soundEffectId:v.getData().get('soundEffectId'),
            soundEffectName:v.getData().get('soundEffectName'),
            soundEffectUrl:v.getData().get('soundEffectUrl'),
            readGuide:v.getData().get('readGuide'),
            blockKey:v.getKey()
		}))
        let forkData = this.prePostProcess(rawContentArray).map((v,k) => new ForkBlockData({
            data:{
                soundEffectId:v.soundEffectId,
                soundEffectName:v.soundEffectName,
                soundEffectUrl:v.soundEffectUrl,
                readGuide:v.readGuide,
                keyArray:v.keyArray
            },
            text:v.content,
            key:k,
        }))
        return (forkData.map((v,k) => {
            if(v.getData().isEmpty()||(!v.getData().get('soundEffectUrl')&&!v.getData().get('readGuide'))||(v.getData().get('soundEffectUrl')===''&&v.getData().get('readGuide')==='')){
                return (null)
            }else{
                return <MediaTextComponent
                onDeleteReadGuide={this.handleClearReadGuideByBlock}
                onDelete={this.handleClearSoundEffectByBlock} key={k} block={v}/>
            }
        }))
        // return (blockMap.map((v,k) => {
        //     if(v.get('data').isEmpty()||v.get('data').get('soundEffectUrl')===''){
        //         return (null)
        //     }else{
        //         return <MediaTextComponent onDelete={this.handleClearSoundEffectByBlock} key={k} block={v}/>
        //     }
        // }).toArray())
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
            key:'-1',
        }],treeData)
        this._treeData = new TreeData(treeData)
        return (
            <Cascader options={treeData} style={{ width: 300 }} expandTrigger="hover"
            value={this._treeData.findPath(this.state.soundEffectId||'-1').map(v => v.value)}
            onChange={this.handleSelectSoundEffect.bind(this)} />
            // <TreeSelect
            //     style={{ width: 300 }}
            //     defaultValue='-1'
            //     value={this.state.soundEffectId||'-1'}
            //     dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            //     treeData={treeData}
            //     placeholder="Please select"
            //     onSelect={this
            //         .handleSelectSoundEffect
            //         .bind( this )}
            //   />
        )
    }
    renderWordCountPanel = () => {
        const {editorState} = this.state
        const contentState = editorState.getCurrentContent()
        const selectionState = editorState.getSelection();
        const anchorKey = selectionState.getAnchorKey();
        const anchorOffset = selectionState.getAnchorOffset();
        const focusKey = selectionState.getFocusKey();
        const focusOffset = selectionState.getFocusOffset();

        let nextKey = contentState.getKeyAfter(anchorKey);
        let blockForKey = contentState.getBlockForKey(anchorKey);
        let wordCount = blockForKey.getText().slice(anchorOffset).length
        if(focusKey==anchorKey){
            wordCount = blockForKey.getText().slice(anchorOffset,focusOffset).length
        }
        while(nextKey != focusKey && nextKey && focusKey!=anchorKey){
            blockForKey = contentState.getBlockForKey(nextKey);
            wordCount += blockForKey.getText().length;
            nextKey = contentState.getKeyAfter();
        }
        if(focusKey!=anchorKey){
            blockForKey = contentState.getBlockForKey(focusKey);
            wordCount += blockForKey.getText().slice(0,focusOffset).length;
        }
        return <Tag color="purple" style={{marginLeft:10,fontSize:14}}>{`当前选中的字数:${wordCount}`}</Tag>
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
                    <Button style={{marginLeft:10}} onClick={()=>{
                        this.setState({
                            openReadGuideModal:true
                        })
                    }}>阅读指导</Button>
                    {this.renderWordCountPanel()}
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
                        blockStyleFn={(contentBlock)=>{
                           const type = contentBlock.getType();
                        //    console.log('->',type)
                              if (type === 'unstyled') {
                                  return styles.unstyled;
                            }
                        }}
						/>
                    </div>
                    <div className={styles.displayPart}>
                    {this.renderDisplayPanel()}
                    </div>
                </div>
                {this.state.openReadGuideModal?<AddReadGuideModal editorState={this.state.editorState}
                onOk={this.handleAddReadGuild}
                onCancel={()=>{
                    this.setState({
                        openReadGuideModal:false
                    })
                }}/>:null}
            </div>
        )
    }
}
