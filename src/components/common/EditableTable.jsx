import React from 'react'
import {Table, Popconfirm, Button} from 'antd'
import EditableCell from './EditableCell'
import './EditableTable.scss'

export default class EditableTable extends React.Component {
  _init = false
  constructor(props) {
    super(props);
    this.columns = [{
      title: '内容',
      dataIndex: 'name',
      width: '30%',
      render: (text, record, index) => (
        <EditableCell
          value={text}
          onChange={this.onCellChange(index, 'name')}
        />
      ),
    },{
      title: '时长',
      dataIndex: 'time',
      width: '30%',
      render: (text, record, index) => (
        <EditableCell
          value={text}
          onChange={this.onCellChange(index, 'name')}
        />
      ),
    }, {
      title: '删除',
      dataIndex: 'operation',
      render: (text, record, index) => {
        return (
          (
            <Popconfirm title="确定要删除?" onConfirm={() => this.onDelete(index)}>
              <a href="#">删除</a>
            </Popconfirm>
          )
        );
      },
    }];

    this.state = {
      dataSource: [],
      count: 2,
    };
  }
  componentDidMount(){
	  this.setState({
		  dataSource:this.props.data.map((v,k) => ({
			  name:v.get('hint'),
			  time:v.get('time'),
			  key:k
		  })).toJS()
	  })
  }
  componentWillReceiveProps(nextProps){
      if(!this._init){
          if(!nextProps.data.isEmpty()){
              this._init = true
              this.setState({
        		  dataSource:nextProps.data.map((v,k) => ({
        			  name:v.get('hint'),
        			  time:v.get('time'),
        			  key:k
        		  })).toJS()
        	  })
          }
      }
  }
  onCellChange = (index, key) => {
    return (value) => {
      const dataSource = [...this.state.dataSource];
      dataSource[index][key] = value;
      this.setState({ dataSource });
    };
  }
  onDelete = (index) => {
    const dataSource = [...this.state.dataSource];
    dataSource.splice(index, 1);
    this.setState({ dataSource });
  }
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
  render() {
    const { dataSource } = this.state;
	console.log("asdfasdf",dataSource)
    const columns = this.columns;
    return (
      <div>
        <Button className="editable-add-btn" onClick={this.handleAdd}>Add</Button>
        <Table bordered dataSource={dataSource} columns={columns} />
      </div>
    );
  }
}
