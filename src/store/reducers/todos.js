import * as math from 'mathjs';

const initialState = {
    number: 10
}

const todos = (state = initialState, action) => {
    switch (action.type) {
		case 'ADD':
            return {
                number: math.add(state.number,action.data)
            };
		case 'MINUS':
            return {
                number: math.subtract(state.number,action.data)
            };
        case 'MULTIPLY':
            return {
                number: math.multiply(state.number,action.data)
            };
        case 'DIVIDE':
            return {
                number: math.divide(state.number,action.data)
            };
		default:
		    return state;
	}
}
export default todos;