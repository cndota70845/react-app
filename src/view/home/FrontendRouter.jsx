import routes from '../../router/router.js';
import { HashRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import React from 'react';
// import NotFound from '@/view/NotFound/NotFound.jsx';
import menu from '@/assets/menu.json';

function float(origin,target) {
    if (origin instanceof Array && origin.length > 0) {
        origin.forEach(item => {
            item.children
                ? float(item.children,target)
                : target.push(item)
        });
    }
}

let menuFloat = [];
float(menu,menuFloat);

export default class FrontendRouter extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            menuFloat: menuFloat
        }
    }

    render(){
        const getConfirmation = (message, callback) => {
            console.log(message);
            callback();
        }

        const cb = () => {
            console.log('回调函数');
        }
        
        return (
            <HashRouter getUserConfirmation={getConfirmation('nihao',cb)}>
                {renderRoutes(routes)}
            </HashRouter>
        )
    }
};
