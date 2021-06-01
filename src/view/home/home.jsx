import './home.scss';
import menu from '../../assets/menu.json';
import React from 'react';
import logo from './logo.svg';
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
        console.log(arguments);
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
                    <img src={logo} className="home-logo" alt="logo" />
                </header>
            </div>
        )
    }
}
