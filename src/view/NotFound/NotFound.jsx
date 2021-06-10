import React from 'react';
import './NotFound.scss';
import { createHashHistory } from "history";

export default class NotFound extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            name: '404',
            jump: new Promise(function (resolve, reject) {
                setTimeout(function(){
                    resolve('ok'); //代码正常执行！
                }, 2000);
            })
        }
    }

    async componentDidMount () {
        const res = await this.state.jump;
        if (res && res === 'ok') {
            let router = createHashHistory();
            router.push({pathname:'/'});
        }
    }

    render () {
        return (
            <div>
                <h1>this is {this.state.name} page</h1>
                <h1>2s后返回首页</h1>
            </div>
        )
    }
}