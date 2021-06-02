import './App.css';
import 'antd/dist/antd.css';
import React from 'react';
import Home from './view/home/home.jsx';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import todoApp from '../src/store/reducers/index.js';

const store = createStore(todoApp);

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
