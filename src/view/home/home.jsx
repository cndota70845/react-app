import styles from './home.module.scss';
import menu from '@/assets/menu.json';
import React from 'react';
import { createHashHistory } from "history";
import { Menu } from 'antd';
import { HashRouter } from 'react-router-dom';
import { Route } from 'react-router';

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
        var data = {id:3,name:'sam',age:36};
        function createSearch (val) {
            let str = '';
            for (let key in val) {
                str = `${str}?${key}=${val[key]}`;
            }
            return str;
        }
        let path = this.props.location.pathname.replace('/','');
        let router = createHashHistory();
        if (path !== arguments[0].key) {
            router.push({
                pathname:`/${arguments[0].key}`,
                search: createSearch(data)
            });
        }
    }

    render () {
        return (
            <div className={styles.home}>
                <menu className={styles.menu}>
                    <Menu 
                        onClick={this.handleClick.bind(this)} 
                        selectedKeys={[this.state.current]} 
                        theme={this.state.theme}
                        mode={this.state.mode}
                        className={styles.flex}
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
                <header className={styles.homeHeader}>
                    <HashRouter>
                        <Route path={this.props.route.path} component={this.props.route.component}></Route>
                    </HashRouter>
                </header>
            </div>
        )
    }
}
