import React from 'react';
import style from './login.module.scss';
// import { Form, Input, Button, Checkbox } from 'antd';

class lisFrom {
    constructor (opt) {
        this.source = opt.source;
    }
}

const test = new Promise(function (resolve, reject) {
    setTimeout(function(){
        resolve('ok'); //代码正常执行！
    }, 2000);
});

export default class NotFound extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            name: 'login',
            form: new lisFrom({source:{name:'第一项'}})
        }
    }

    async componentDidMount () {
        const res = await test;
        if (res && res === 'ok') {
            console.log('执行');
            this.state.form.source.name = '第二项'
        }
    }

    render () {
        return (
            <div className={style.home}>
                <div className={style.box}>
                    <h1>{this.state.form.source.name}</h1>
                </div>
            </div>
        )
    }
}