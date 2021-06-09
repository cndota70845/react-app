import routes from '../../router/router.js';
import { HashRouter } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import React from 'react';
import menu from '@/assets/menu.json';
import { Switch, Route } from 'react-router';
import NotFound from '@/view/NotFound/NotFound.jsx';

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
            console.log(message);
            callback();
        }

        const cb = () => {
            console.log('回调函数');
        }
        
        return (
            // <HashRouter getUserConfirmation={getConfirmation('nihao',cb)}>
            //     <Switch>
            //         {renderRoutes(routes)}
            //     </Switch>
            // </HashRouter>
            <HashRouter getUserConfirmation={getConfirmation('初始化',cb)}>
                <Switch>
                    {this.state.routes.map((route, i) => (
                        <Route
                            key={route.key || i}
                            path={route.path}
                            exact={route.exact}
                            render={ props => menuFloat.some(item => item.name === props.location.pathname.replace('/','')) 
                                ? (<route.component {...props} route={route} />)
                                : window.Cookies.get('token')
                                    ? (<NotFound></NotFound>)
                                    : window.alert('没有token')

                            }
                        />
                    ))}
                </Switch>
            </HashRouter>
        )
    }
};
