import './home.scss';
import menu from '../../assets/menu.json';
import React from 'react';
import routes from '../../router/router.js';
import { HashRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { createHashHistory } from "history";
import { Menu } from 'antd';
const { SubMenu } = Menu;

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'mail',
            theme: 'dark',
            mode: 'horizontal',
            menu: menu
        };
    }

    handleClick () {
        let router = createHashHistory();
        console.log(arguments[0].key);
        router.push(`/${arguments[0].key}`);
    }

    render () {
        return (
            <div className="home">
                <menu className="menu">
                    <Menu 
                        onClick={this.handleClick} 
                        selectedKeys={[this.state.current]} 
                        theme={this.state.theme}
                        mode={this.state.mode}
                        className="flex"
                    >
                        {this.state.menu.map((comment) => (
                            comment.children
                            ? <SubMenu key={comment.name} title={comment.content}>
                                {comment.children.map((element) => (
                                    <Menu.Item key={element.name}>{element.content}</Menu.Item>
                                ))}
                            </SubMenu>
                            : <Menu.Item key={comment.name}>{comment.content}</Menu.Item>
                        ))} 
                    </Menu>
                </menu>
                <header className="home-header">
                    <HashRouter>{renderRoutes(routes)}</HashRouter>
                </header>
            </div>
        )
    }
}
