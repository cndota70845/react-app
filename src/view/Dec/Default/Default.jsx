import React from 'react';
import './Default.scss';

export default class Default extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            name: 'Default'
        }
    }

    render () {
        return (
            <h1>this is {this.state.name} page</h1>
        )
    }
}