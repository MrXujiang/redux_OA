import React, { Component } from 'react'
import {  
  Notification,
  message,
  Layout, 
  Icon
} from '@alex_xu/xui'
import { Upload } from 'antd'

import './index.less'
const { Header, Content, Footer } = Layout

const apiUrl = 'http://localhost:3001/api/v0'

class UploadPage extends Component {
    state = {
      fileList: []
    }

    componentDidMount() {
      fetch(apiUrl + '/files').then(res => res.json()).then(res => {
        this.setState({
          fileList: res.result
        })
      })
    }

    onChange = (info) => {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        console.log(info.file.response.url)
        this.setState((prev) => ({
          fileList: [...prev.fileList, info.file.response.url]
        }))
        message.pop({
          type: 'success',
          content: `${info.file.name} file uploaded successfully`
        })
      } else if (info.file.status === 'error') {
        message.pop({
          type: 'error',
          content: `${info.file.name} file upload failed.`
        })
      }
    }

    showAddress = (item) => {
      Notification.config({
        placement: 'topRight',
      })
      Notification.pop({
        type: 'success',
        message: '图片地址',
        duration: 10,
        description: item
      })
    }

    delFile = (item, e) => {
      e.stopPropagation()
      fetch(apiUrl + '/del?id=' + item.split('/uploads/')[1]).then(res => res.json()).then(res => {
        message.pop({
          type: 'success',
          content: res.result
        })
        this.setState(prev => {
          return {
            fileList: prev.fileList.filter(v => v !== item)
          }
        })
      })
    }

    //homeType 首页类型  0为立即申请按钮 1为搜索框
    render() {
      const props = {
        name: 'file',
        action: apiUrl + '/upload',
        listType: 'picture-card',
        multiple: true,
        showUploadList: false,
        headers: {
          authorization: 'authorization-text'
        }
      };
      return (
        <div className="upload-wrap">
          <Layout>
            <Header fixed>
              <div className="logo"><Icon type="FaBattleNet" style={{fontSize: '30px', marginRight: '12px'}} />XOSS</div>
            </Header>
            <Content style={{marginTop: '48px', backgroundColor: '#f0f2f5'}}>
              {
                this.state.fileList.map((item, i) => {
                  return <div key={i} className="imgBox" onClick={this.showAddress.bind(this, item)}>
                    <img src={item} alt=""/>
                    <span className="del-btn" onClick={this.delFile.bind(this, item)}><Icon type="FaMinusCircle" style={{fontSize: '24px'}} /></span>
                  </div>
                })
              }
              <Upload 
                {...props} 
                className="upload-btn"
                onChange={this.onChange}
              >
                +
              </Upload>
            </Content>
            <Footer style={{color: 'rgba(0,0,0, .5)'}}>趣谈前端 -- 徐小夕</Footer>
          </Layout>
        </div>
      )
    }
}

export default UploadPage

