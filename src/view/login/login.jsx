import React from 'react';
import './login.scss';

export default class NotFound extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            name: 'login'
        }
    }

    render () {
        return (
            <h1>this is {this.state.name} page</h1>
        )
    }
}