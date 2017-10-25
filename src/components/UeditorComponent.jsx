import React from 'react'
import PropTypes from 'prop-types'

export default class UeditorComponent extends React.Component {
	static propTypes = {
		editorId:PropTypes.string.isRequired
	}
	static defaultProps = {
		editorId:'container'
	}
	componentDidMount(){
		const UE = window.UE
		UE.registerUI('dialog', function (editor, uiName) {
	        var btn = new UE.ui.Button({
	            name   : 'xiumi-connect',
	            title  : '秀米',
	            onclick: function () {
	                var dialog = new UE.ui.Dialog({
	                    iframeUrl: 'xiumi-ue-dialog-v5.html',
	                    editor   : editor,
	                    name     : 'xiumi-connect',
	                    title    : "秀米图文消息助手",
	                    cssRules : "width: " + (window.innerWidth - 60) + "px;" + "height: " + (window.innerHeight - 60) + "px;",
	                });
	                dialog.render();
	                dialog.open();
	            }
	        });

	        return btn;
        });
		this.ueditor = UE.getEditor(this.props.editorId);
	}
	render(){
		return (
			<div>
				<script id={this.props.editorId} type="text/plain" style={{width:'550px',height:'500px'}}></script>
			</div>
		)
	}
}
