export const addTodo = data => {
  return {
    type: 'ADD',
    data
  }
}

export const minusTodo = data => {
  return {
    type: 'MINUS',
    data
  }
}

export const multiplyTodo = data => {
  return {
    type: 'MULTIPLY',
    data
  }
}

export const divideTodo = data => {
  return {
    type: 'DIVIDE',
    data
  }
}

export const addAsyncTodo = data => {
  return dispatch => {
    setTimeout(() => {
      dispatch(addTodo(data))        //一秒以后调用同步的add  action函数
    }, 1000)
  }
}