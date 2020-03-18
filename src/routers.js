import React, { Component } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

// 路由配置
import Home from "./pages/Home"
import Upload from "./pages/Upload"
import 'styles/common.less'


class Routers extends Component {
  render() {
    return (
        <Router basename={''}>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/upload" component={Upload} />
            </Switch>
        </Router>
    )
  }
}

export default Routers