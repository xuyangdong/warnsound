import React from 'react'
import EditableTable from '../components/common/EnhanceTable'

export default class AddStoryROleEditableTableHOC extends React.Component {
	handleAdd = () => {
      const { count, dataSource } = this.state;
      const newData = {
        key: count,
        name: `输入要阅读的内容`,
        time:'00:00',
      };
      this.setState({
        dataSource: [...dataSource, newData],
        count: count + 1,
      });
    }
	getData = () => {
  	  return this.state.dataSource.map(v => ({
  		  hint:v.name,
  		  time:v.time
  	  }))
    }
	render(){
		return (
			<EditableTable ref='table' />
		)
	}
}
