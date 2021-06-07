import React from 'react';
import './DecList.sass';

export default class DecList extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            name: 'DecList'
        };
        this.myRef = React.createRef();
    }

    componentDidMount () {
        // this.canvasMove();
    }

    canvasMove () {
        const canvas = this.myRef.current;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'purple';
        const step = 1;
        let xPosition = 0;
        let yPosition = 0;
        move();
        function move() {
            ctx.clearRect(0, 0, 600, 600);
            ctx.fillRect(xPosition, yPosition, 150, 100 );
            if (xPosition < 450 && yPosition === 0) {
                xPosition += step;
                requestAnimationFrame(() => {
                    move();
                });
            }
            if (xPosition === 450 && yPosition < 500) {
                yPosition += step;
                requestAnimationFrame(() => {
                    move();
                });
            }
            if (yPosition === 500 && xPosition > 0) {
                xPosition -= step;
                requestAnimationFrame(() => {
                    move();
                });
            }
            if (xPosition === 0 && yPosition > 0) {
                yPosition -= step;
                requestAnimationFrame(() => {
                    move();
                });
            }
        }
    }

    render () {
        return (
            <div>
                <h1>this is {this.state.name} page</h1>
                <canvas width="600" height="600" ref={this.myRef}></canvas>
            </div>
        )
    }
}