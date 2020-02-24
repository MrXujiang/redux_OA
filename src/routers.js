import React, { Component } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

// 路由配置
import Home from "./pages/Home"


class Routers extends Component {
  render() {
    return (
        <Router basename={''}>
            <Switch>
                <Route exact path="/" component={Home} />
            </Switch>
        </Router>
    )
  }
}

export default Routers