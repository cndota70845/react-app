import './App.css';
import React from 'react';
import routes from './router/router';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

export default class App extends React.Component {
  render () {
    return (
      <div className="App">
        <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
      </div>
    )
  } 
}
