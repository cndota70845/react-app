import './App.css';
import 'antd/dist/antd.css';
import React from 'react';
import Home from './view/home/home.jsx';

export default class App extends React.Component {
  render () {
    return (
      <div className="App">
        <Home></Home>
      </div>
    )
  } 
}
