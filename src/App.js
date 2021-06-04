import './App.css';
import 'antd/dist/antd.css';
import React from 'react';
import Home from './view/home/home.jsx';
import { Provider } from 'react-redux';
import store from '../src/store/reducers/index.js';
import API from '../src/request/api';

window.__proto__.API = API;

export default class App extends React.Component { 
  render () {
    return (
      <Provider store={store}>
        <div className="App">
          <Home></Home>
        </div>
      </Provider>
    )
  } 
}
