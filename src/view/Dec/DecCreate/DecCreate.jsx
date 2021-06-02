import React from 'react';
import { Button } from 'antd';
import './DecCreate.scss';
import Matryoshka from '../../../components/matryoshka/matryoshka.jsx';

export default class DecCreate extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            name: 'DecCreate',
            msg: 0
        }
        this.onClick = this.onClick.bind(this);
    }

    onClick () {
        this.setState((pre)=>{
            return {
                msg: pre.msg + 1
            }
        },()=> {
            console.log(this.state.msg);
        });
    }

    render () {
        return (
            <div>
                <h1>this is {this.state.name} page</h1>
                <Button type="primary" onClick={this.onClick}>点击增加</Button>
                <Matryoshka msg={this.state.msg}></Matryoshka>
            </div>
        )
    }
}