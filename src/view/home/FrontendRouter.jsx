import routes from '../../router/router.js';
import { HashRouter } from 'react-router-dom';
import React from 'react';
import menu from '@/assets/menu.json';
import { Switch, Route } from 'react-router';
import NotFound from '@/view/NotFound/NotFound.jsx';
import Login from '@/view/login/login.jsx';
import Home from '@/view/home/home.jsx';

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
            menuFloat: menuFloat,
            routes: routes, 
            extraProps: {}, 
            switchProps: {}
        }
    }

    render(){
        const getConfirmation = (message, callback) => {
            callback(message);
        }

        const cb = (message) => {
            console.log(message);
        }

        const homePage = (props,route) => {
            console.log('homePage');
            return <Home {...props} route={route} />
        }
        
        return (
            <HashRouter getUserConfirmation={getConfirmation('初始化',cb)}>
                <Switch>
                    {this.state.routes.map((route, i) => (
                        <Route
                            key={route.key || i}
                            path={route.path}
                            exact={route.exact}
                            render={ props => menuFloat.some(item => item.name === props.location.pathname.replace('/','') || props.location.pathname === '/') 
                                ? homePage(props,route)
                                : props.location.pathname.replace('/','').toLowerCase() === 'login'
                                    ? (<Login {...props} route={route}></Login>)
                                    : (<NotFound {...props} route={route}></NotFound>)
                            }
                        />
                    ))}
                </Switch>
            </HashRouter>
        )
    }
};
