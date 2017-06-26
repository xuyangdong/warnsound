import React from 'react'
import { Editor } from 'draft-js'
import styles from './DraftComponent.scss'
import { Button, Select } from 'antd'
import { ContentState, EditorState, ContentBlock, Modifier, CharacterMetadata, DefaultDraftBlockRenderMap, AtomicBlockUtils} from 'draft-js'
import { Map, List } from 'immutable'
import 'draft-js/dist/Draft.css'
import MediaTextComponent from './MediaTextComponent'

const MAX_SENTENCE = 10
const separator = /[,|.|;|，|。|；]/
const Option = Select.Option

const Media = (props) => {
    const entity = props.contentState.getEntity(
        props.block.getEntityAt(0)
    )
    const {soundEffectName,soundEffectUrl,soundEffectId} = entity.getData();

    return (<MediaTextComponent soundEffectName={'asdf'} soundEffectUrl={'asdf'}/>)

}
export default class DraftComponent extends React.Component {
    constructor( ) {
        super( )
        this.state = {
            editorState: EditorState.createEmpty( ),
            beautyEditorState: EditorState.createEmpty( )
        }
    }
    componentWillReceiveProps( nextProps ) {
        if ( nextProps.value ) {
            let contentState = ContentState.createFromText(JSON.parse( nextProps.value || '[]' ).map( v => v.content ).join( '\n' ))
            this.setState({
                editorState: EditorState.createWithContent( contentState )
            })
        }
    }
    onEditorStateChange = ( editorState ) => {
        const contentState = editorState.getCurrentContent()
        this.setState({ editorState:EditorState.push(editorState,contentState,'change-block-data') });
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
    handleSelectSoundEffect( value, option ) {
		let selectState = this.state.editorState.getSelection();
		let contentState = this.state.editorState.getCurrentContent();
        let newContentState = null;
        if(value=='-1'){
            newContentState = Modifier.setBlockData(contentState,selectState,new Map({
    			soundEffectId:'',
    			soundEffectUrl:''
    		}))
            newContentState = Modifier.setBlockType(newContentState,selectState,'unstyled')

        }else{
            newContentState = Modifier.setBlockData(contentState,selectState,new Map({
    			soundEffectId:this.state.soundEffectId,
    			soundEffectUrl:this.props.soundEffects.find(v => v.get('id')==value).get('url'),
                soundEffectName:this.props.soundEffects.find(v => v.get('id')==value).get('description')
            }))
    		newContentState = Modifier.setBlockType(newContentState,selectState,'mediaText')
            // const contentStateWithEntity = contentState.createEntity(
            //     'media','MUTABLE',
            //     {
            //         soundEffectId:this.state.soundEffectId,
            //         soundEffectUrl:this.props.soundEffects.find(v => v.get('id')==value).get('url'),
            //         soundEffectName:this.props.soundEffects.find(v => v.get('id')==value).get('description')
            //     }
            // )
            // const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
            // const newEditorState = EditorState.set(
            //     this.state.editorState,
            //     {currentContent: contentStateWithEntity}
            // )
            // this.setState({
            //     editorState: AtomicBlockUtils.insertAtomicBlock(
            //         newEditorState,
            //         entityKey,
            //         'ABC'
            //     )
            // })
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
		}else if(type=='atomic'){
            return {
                component:Media,
                editable:false
            }
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
    render( ) {
        const { editorState, beautyEditorState } = this.state;
        return (
            <div className={styles.container}>
                <div className={styles.toolBar}>
                <div>
                    <Button onClick={this
                        .handleClick
                        .bind( this )} style={{marginRight:10}}>一键美化</Button>
                    <Select defaultValue='-1' style={{
                        width: 240
                    }} value={this.state.soundEffectId||'-1'} onChange={value => {
						this.setState({
							soundEffectId:value
						})
					}} onSelect={this
                        .handleSelectSoundEffect
                        .bind( this )}>
                        <Option value={'-1'} title='无音效' key={-1}>无音效</Option>
                        {this
                            .props
                            .soundEffects
                            .map(( v, k ) => (
                                <Option value={'' + v.get( 'id' )} title={v.get( 'description' )} key={k}>{v.get( 'description' )}</Option>
                            ))
                            .toJS( )}
                    </Select>
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
						/>
                    </div>
                </div>
            </div>
        )
    }
}
