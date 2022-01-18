import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

//import reducers from './reducers'
import {thing} from "./actions/useData"

import App from "./App"

const store = createStore(thing, compose(applyMiddleware(thunk)))

ReactDOM.render(
<Provider store={store} >
<App></App>
</Provider>
, document.getElementById('root'))