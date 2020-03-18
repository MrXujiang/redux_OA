import React, { Component } from 'react'
import { 
  Alert, 
  Button, 
  xNotification,
  message,
  Layout, 
  Icon, 
  Badge,
  Card,
  Progress,
  Modal,
  Input,
  Spin,
  Select,
  Empty
} from '@alex_xu/xui'
import { connect } from 'react-redux'
import { createTodo, editTodo, doneTodo, deleteTodo, failTodo } from 'store/actions'
import { formatBt } from 'utils/tool'

import './index.less'

const { Header, Content, Footer } = Layout
const { Textarea } = Input

const mapStateToProps = (state) => {
    let { capacity, curCapacity, hasDoneTodos, hasFailTodos, unDoneTodos, ctLoading, ctErrorMes } = state
    return {
      capacity, curCapacity, hasDoneTodos, hasFailTodos, unDoneTodos, ctLoading, ctErrorMes
    }
}

const mapDispatchToProps = dispatch => {
    return {
      createTodo(data, cb) {
        dispatch(createTodo(data, cb))
      },
      editTodo(data, cb) {
        dispatch(editTodo(data, cb))
      },
      doneTodo(data, cb) {
        dispatch(doneTodo(data, cb))
      },
      deleteTodo(data, cb) {
        dispatch(deleteTodo(data, cb))
      },
      failTodo(data, cb) {
        dispatch(failTodo(data, cb))
      }
    }
}

const iconStyle = {
  color: 'green', 
  marginRight: '3px', 
  fontSize: '16px', 
  verticalAlign: '-3px'
}

class Home extends Component {
    state = {
      modalVisible: false,
      modalTit: '添加todo',
      curTodo: {},
      failNum: 0,
      isEdit: false
    }

    data = {
      type: ['error', 'warning', 'processing', 'success'],
      typeText: ['每天', '周次', '月次', '季度'], 
      todo: {}
    }

    componentDidMount() {
      // 每隔15分钟检测一下todo是否到期
      setInterval(() => {
        this.props.unDoneTodos.forEach((item, i) => {
          let now = new Date(),
              month = now.getMonth() + 1,
              date = now.getDate(),
              nowStr = now.getFullYear() + '-' + (month < 10 ? '0' + month : month) + '-' + (date < 10 ? '0' + date : date)
          // 如果截止时间小于当前时间，则当前计划失败
          if(+new Date(item.endDate) < +new Date(nowStr)) {
            this.props.failTodo(i)
            this.setState((prev) => ({
              failNum: ++prev.failNum
            }))
          }
        })
      }, 15 * 60 * 1000)
    }

    showModal = () => {
      this.data.todo = {}
      this.setState({
        modalVisible: true,
        isEdit: false
      })
    }

    handleOk = () => {
      if(this.state.isEdit) {
        this.props.editTodo({...this.state.curTodo, ...this.data.todo}, () => {
          this.setState({
            modalVisible: false
          })
        })
      }else {
        this.props.createTodo({...this.data.todo}, () => {
          this.setState({
            modalVisible: false
          })
        })
      }
    }

    handleCancel = () => {
      this.setState({
        modalVisible: false,
        curTodo: {}
      })
    }

    handleChange = (type, v) => {
      this.data.todo[type] = v
    }

    handleEdit = (index) => {
      this.setState({
        curTodo: this.props.unDoneTodos[index],
        modalVisible: true,
        isEdit: true
      })
      this.data.todo.index = index
    }

    handleDone = (index) => {
      this.props.doneTodo(index, () => {
        message.pop({
          type: 'success',
          content: '恭喜你，成功完成此计划',
          duration: 2
        })
      })
    }

    handleRemove = (index) => {
      this.props.deleteTodo(index, () => {
        message.pop({
          type: 'success',
          content: '删除成功',
          duration: 2
        })
      })
    }

    //homeType 首页类型  0为立即申请按钮 1为搜索框
    render() {
      const { capacity, curCapacity, hasDoneTodos, hasFailTodos, unDoneTodos, ctLoading } = this.props
      let hasDoneNum = hasDoneTodos.length,
          hasFailNum = hasFailTodos.length,
          totalTodos = hasDoneNum + hasFailNum,
          effectRate = totalTodos ? hasDoneNum / totalTodos * 100 : 0
      console.log(unDoneTodos, hasDoneTodos)
      return (
          <div className="home-wrap">
              <Layout>
                <Header fixed>
                  <div className="logo"><Icon type="FaBattleNet" style={{fontSize: '30px', marginRight: '12px'}} />XOA</div>
                  <div className="hd-right-box">
                    <Badge count={this.state.failNum} dot wrapStyle={{marginRight: '30px', cursor: 'pointer'}}>
                      <Icon type="FaBell" style={{fontSize: '14px', verticalAlign: '-2px'}} />
                    </Badge>
                    <div className="volumn-box">
                      已用<span>{ formatBt(curCapacity) }</span>，总容量<span>{ formatBt(capacity) }</span>
                    </div>
                  </div>
                </Header>
                <Content style={{marginTop: '48px', backgroundColor: '#f0f2f5'}}>
                  <div className="task-pane-wrap">
                    {
                      unDoneTodos.map((item, i) => (
                        <Card 
                          title={item.title} 
                          className="todo-card" 
                          action={[
                            <span onClick={this.handleEdit.bind(this, i)}>编辑</span>,
                            <span onClick={this.handleDone.bind(this, i)}>完成</span>,
                            <span onClick={this.handleRemove.bind(this, i)}>删除</span>
                          ]}
                          key={i}>
                          <div className="todo-desc">{ item.desc }</div>
                          <div className="todo-status">
                            <div>开始时间： { item.startDate }</div>
                            <div>结束时间： { item.endDate }</div>
                            <div><Badge status={this.data.type[item.type || 0]} text={this.data.typeText[item.type || 0]}></Badge></div>
                          </div>
                        </Card>
                      ))
                    }
                    <div className="add-todo-btn" onClick={this.showModal}><Icon type="FaPlus" /></div>
                  </div>
                  <div className="task-status-list">
                    <Card title="执行率" style={{width: '100%', marginBottom: '16px'}}>
                      <Progress percent={effectRate} themeColor="#06c" width={150} />
                    </Card>
                    <Card 
                      title={
                        <span>
                          <Icon 
                            type="FaMedal" 
                            style={iconStyle} 
                          />
                          已完成
                        </span>
                      } 
                      style={{width: '100%', marginBottom: '16px'}}>
                        {
                          hasDoneNum ? hasDoneTodos.map((item, i) => (
                            <div className="status-list-item" key={i}><Icon type="FaCheckCircle" style={{...iconStyle, fontSize: '14px'}} />{ item.title }</div>
                          )) : <Empty style={{paddingTop: '20px', paddingBottom: '20px'}} />
                        }
                    </Card>
                    <Card title={<span><Icon type="FaRegTired" style={{...iconStyle, color: 'red'}} />已失败</span>} style={{width: '100%', marginBottom: '16px'}}>
                      {
                        hasFailNum ? hasFailTodos.map((item, i) => (
                          <div className="" key={i}><Icon type="FaGrinSquintTears" style={{...iconStyle, fontSize: '14px', color: 'red'}} />{ item.title }</div>
                        )) : <Empty style={{paddingTop: '20px', paddingBottom: '20px'}} />
                      }
                    </Card>
                  </div>
                </Content>
                <Footer style={{color: 'rgba(0,0,0, .5)'}}>趣谈前端 -- 徐小夕</Footer>
              </Layout>
              <Modal 
                visible={this.state.modalVisible} 
                title={this.state.modalTit}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                destroyOnClose
              >
                <div className="todo-form">
                  <div className="form-control">
                    <span className="label">标题：</span><Input placeholder="请输入todo标题" className="todo-ipt" defaultValue={this.state.curTodo.title} onChange={this.handleChange.bind(this, 'title')} />
                  </div>
                  <div className="form-control">
                    <span className="label">开始时间：</span><Input placeholder="请输入完成日期" type="date" className="todo-ipt" defaultValue={this.state.curTodo.startDate} onChange={this.handleChange.bind(this, 'startDate')} />
                  </div>
                  <div className="form-control">
                    <span className="label">结束时间：</span><Input placeholder="请输入完成日期" type="date" className="todo-ipt" defaultValue={this.state.curTodo.endDate} onChange={this.handleChange.bind(this, 'endDate')} />
                  </div>
                  <div className="form-control">
                    <span className="label">计划类型：</span>
                    <Select placeholder="请输入计划类型" type="date" className="todo-select" defaultValue={this.state.curTodo.type} onChange={this.handleChange.bind(this, 'type')}>
                      <option value="0">每天</option>
                      <option value="1">周次</option>
                      <option value="2">月次</option>
                      <option value="3">季度</option>
                    </Select>
                  </div>
                  <div className="form-control">
                    <span className="label">描述：</span><Textarea placeholder="请输入todo描述" rows={6} className="todo-ipt" defaultValue={this.state.curTodo.desc} onChange={this.handleChange.bind(this, 'desc')} />
                  </div>
                </div>
              </Modal>
              <Spin isLoading={ctLoading} />
          </div>
      )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

