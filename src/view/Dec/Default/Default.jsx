import React from 'react';
import './Default.scss';

export default class Default extends React.Component {
    constructor (props) {
        super(props);
        console.log(this.props);
    }

    render () {
        return (
            <h1>this is {this.props.location.pathname.replace('/','')} page</h1>
        )
    }
}