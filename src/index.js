import React from 'react'
import ReactDOM from 'react-dom'
import Routers from './routers'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from 'store/reducers'
import ErrorBoundary from "components/errorBoundary"

const middleWares = [thunk];

const store = compose(applyMiddleware(...middleWares))(createStore)(reducers);

const unsubscribe = store.subscribe(() =>
  	console.log("store: ", store.getState())
)

function render() {
	ReactDOM.render(
		(<ErrorBoundary>
        <Provider store={store}>
          <Routers />
        </Provider>
			</ErrorBoundary>), document.getElementById('root')
	);
}

// 支持react热替换
if(module.hot){
	module.hot.accept(Routers, render);
}

render()
