import React, { Component } from 'react'
import { 
  Alert, 
  Button, 
  Notification,
  message,
  Layout, 
  Icon, 
  Badge,
  Card,
  Progress,
  Modal,
  Input,
  Spin,
  Empty
} from '@alex_xu/xui'
import { Upload } from 'antd'

import './index.less'
const { Header, Content, Footer } = Layout

const apiUrl = 'http://localhost:3001/api/v0/upload'

class UploadPage extends Component {
    state = {
      fileList: []
    }

    componentDidMount() {
      
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
        duration: 0,
        description: item
      })
    }

    //homeType 首页类型  0为立即申请按钮 1为搜索框
    render() {
      const props = {
        name: 'file',
        action: apiUrl,
        multiple: true,
        headers: {
          authorization: 'authorization-text'
        }
      };
      return (
        <div className="home-wrap">
          <Layout>
            <Header fixed>
              <div className="logo"><Icon type="FaBattleNet" style={{fontSize: '30px', marginRight: '12px'}} />XOSS</div>
            </Header>
            <Content style={{marginTop: '48px', backgroundColor: '#f0f2f5'}}>
              <Upload 
                {...props} 
                onChange={this.onChange}
              >
                <Button>
                  Click to Upload
                </Button>
              </Upload>
              {
                this.state.fileList.map((item, i) => {
                  return <div key={i} className="imgBox" onClick={this.showAddress.bind(this, item)}>
                    <img src={item} alt=""/>
                  </div>
                })
              }
            </Content>
            <Footer style={{color: 'rgba(0,0,0, .5)'}}>趣谈前端 -- 徐小夕</Footer>
          </Layout>
        </div>
      )
    }
}

export default UploadPage

