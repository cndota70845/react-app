import { connect } from 'react-redux';
 
// 引入action函数
import { addTodo, minusTodo, multiplyTodo, divideTodo, addAsyncTodo } from '../store/actions/index';
import Matryoshka from '../components/matryoshka/matryoshka.jsx'      //引入原本的App  UI组件
 
// 向外暴露连接App组件的包装组件
export default connect(         //参数最终都将被映射成为原App组件的props，并返回一个新的组件
    //即mapStateToprops方法，是一个函数，返回的是一个对象，count是保存在store中的state的key，在UI组件中就通过这个key来访问
    state => ({count: state}),
 
    //即mapDispatchToProps方法，这样 this.props.store.dispatch(action)的操作将有 react-redux代为执行，我们直接使用this.props.action即可
    {addTodo, minusTodo, multiplyTodo, divideTodo, addAsyncTodo}
)(Matryoshka)