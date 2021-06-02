import React from 'react';
import './matryoshka.scss';

export default class matryoshka extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            name: 'matryoshka'
        }
    }

    render () {
        return (
            <h1>this is {this.state.name} page --- {this.props.msg}</h1>
        )
    }
}