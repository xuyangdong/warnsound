import React from 'react'
import {Table, Popconfirm, Button} from 'antd'
import EditableCell from '../common/EditableCell'
import './LogoEditableTable.scss'
import AddLogoItemModal from './AddLogoItemModal'

export default class EditableTable extends React.Component {
  _init = false
  constructor(props) {
    super(props);
    this.columns = [{
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    }, {
      title: '徽章类型',
      dataIndex: 'badgeTypeId',
      key: 'badgeTypeId'
    }, {
      title: '名称',
      dataIndex: 'name',
    },{
      title: '描述',
      dataIndex: 'description',
    }, {
      title: 'ICON',
      dataIndex: 'icon',
      render:(t,r) => {
          return <img src={t} style={{width:40}}/>
      }
    }, {
      title: 'Measure',
      dataIndex: 'measure',
    }, {
      title: 'extra',
      dataIndex: 'extra',
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record, index) => {
        return (
          (
              <div>
            <Popconfirm title="确定要删除?" onConfirm={() => this.onDelete(record.id)}>
              <a href="#">删除</a>
            </Popconfirm>
            &nbsp;<a onClick={()=>{
                this.setState({
                    record:record,
                    openAddLogoModal:true
                })
            }}>编辑</a>
            </div>
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
		  dataSource:this.props.data.toJS()
	  })
  }
  componentWillReceiveProps(nextProps){
      if(!this._init){
          if(!nextProps.data.isEmpty()){
            //   this._init = true
              this.setState({
        		  dataSource:nextProps.data.toJS()
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
  onDelete = (id) => {
    this.props.onDelete(id)
  }
  handleAdd = () => {
    this.setState({
        openAddLogoModal:true
    })
  }
  getData = () => {
	  return this.state.dataSource.map(v => ({
		  hint:v.name,
		  time:v.time
	  }))
  }
  handleOk = (data) => {
      if(this.state.record){
          this.props.onUpdate({
              ...data,
              id:this.state.record.id
          })
      }else{
          this.props.onSave({
              ...data
          })
      }
      this.setState({
          openAddLogoModal:false
      })
  }
  render() {
    const { dataSource } = this.state;
    console.log(dataSource)
    const columns = this.columns;
    return (
      <div>
        <Button className="editable-add-btn" onClick={this.handleAdd}>Add</Button>
        <Table bordered dataSource={dataSource} columns={columns} />
        {this.state.openAddLogoModal?<AddLogoItemModal onCancel={()=>{
            this.setState({
                openAddLogoModal:false,
                record:null
            })
        }}
        onOk={this.handleOk}
        data={this.state.record}
        />:null}
      </div>
    );
  }
}
