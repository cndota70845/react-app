import React from 'react';
import './Default.scss';

export default class Default extends React.Component {

    render () {
        return (
            <div>
                <h1>this is {this.props.location.pathname.replace('/','')} page</h1>
            </div>
        )
    }
}