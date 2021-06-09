import React from 'react';
import './NotFound.scss';

export default class NotFound extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            name: '404'
        }
    }

    render () {
        return (
            <h1>this is {this.state.name} page</h1>
        )
    }
}