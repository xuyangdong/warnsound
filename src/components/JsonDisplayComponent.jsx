/* eslint-disable */
import React from 'react'
// import CodeMirrorInstance from 'codemirror'
// import CodeMirror from 'react-codemirror'
import CodeMirror from 'codemirror'
import ReactDOM from 'react-dom'
require('codemirror/lib/codemirror.css');
require('codemirror/mode/javascript/javascript');
require('codemirror/addon/edit/closebrackets')
require('codemirror/addon/fold/foldcode')
require('codemirror/addon/fold/foldgutter')
require('codemirror/addon/fold/foldgutter.css')
require('codemirror/addon/fold/brace-fold')
const JsonDisplayComponent = React.createClass({
	componentDidMount(){
		const dom = ReactDOM.findDOMNode(this)
		var options = {
		   mode: {name: "javascript", json: true},
		   lineNumbers: true,
		   lineWrapping: true,
		   extraKeys: {"Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); }},
		   foldGutter: true,
		   gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
		   autoCloseBrackets:true
		};
		this.myCodeMirror = CodeMirror(dom,options);
	},
	componentWillReceiveProps(nextProps){
		console.log(nextProps)
		this.myCodeMirror.doc.setValue(nextProps.content)
	},
	render(){
		console.log(this.props)
		return(
		<div style={{textAlign:'left'}}>
		</div>)
	}
})

export default JsonDisplayComponent
