import routes from '../../router/router.js';
import { HashRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import React from 'react';

export default class FrontendRouter extends React.Component{

    render(){
        return <HashRouter>{renderRoutes(routes)}</HashRouter>
    }
  
};
