import './App.css';
import 'antd/dist/antd.css';
import React from 'react';
import  FrontendRouter from '@/view/home/FrontendRouter.jsx';
import { Provider } from 'react-redux';
import store from '../src/store/reducers/index.js';
import API from '../src/request/api';
import Cookies from 'js-cookie';

window.__proto__.API = API;
window.__proto__.Cookies = Cookies;

export default class App extends React.Component { 
  render () {
    return (
      <Provider store={store}>
        <div className="App">
          <FrontendRouter></FrontendRouter>
        </div>
      </Provider>
    )
  } 
}
