import React from 'react';
import styles from './matryoshka.module.scss';
import { Button } from 'antd';

export default class matryoshka extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            name: 'matryoshka'
        }
    }

    async componentDidMount(){
        const res = window.API.listGet();
        if (res) {
            console.log(res);
        }
        console.log('=====this.props',this.props);
    }

    render () {
        return (
            <div>
                <h1>this is {this.state.name} page --- {this.props.msg}</h1>
                <div className={styles.BTN}>
                    <Button type="primary" onClick={this.props.addTodo.bind(this,10)}>ADD 10</Button>
                    <Button type="primary" onClick={this.props.minusTodo.bind(this,10)}>MINUS 10</Button>
                    <Button type="primary" onClick={this.props.multiplyTodo.bind(this,10)}>MULTIPLY 10</Button>
                    <Button type="primary" onClick={this.props.divideTodo.bind(this,10)}>DIVIDE 10</Button>
                    <Button type="primary" onClick={this.props.addAsyncTodo.bind(this,10)}>ADDAsync 10</Button>
                </div>
                <h2>this is globle verticle --- {this.props.count.todos.number}</h2>
            </div>
        )
    }
}
