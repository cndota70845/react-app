import React from 'react';
import style from './login.module.scss';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import md5 from 'md5';
import { createHashHistory } from "history";

const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 18,
    },
};

export default class Login extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this.formRef = React.createRef();
        this.form = {
            username: {
                name: 'username',
                rules: [
                    {
                        required: true,
                        message: 'Please input your username!',
                    }
                ]
            },
            password: {
                name: 'password',
                rules: [
                    {
                        required: true,
                        message: 'Please input your password!',
                    }
                ]
            }
        }
    };

    componentDidMount () {
        this.initData();
    }

    shouldComponentUpdate (nextProps,nextState) {
        console.log('shouldComponentUpdate',nextProps,nextState);
        return true;
    }

    componentDidUpdate (prevProps,prevState) {
        console.log('componentDidUpdate',prevProps,prevState);
    }

    componentDidCatch (error, info) {
        console.log('componentDidCatch',error, info);
    }

    componentWillUnmount () {
        console.log('componentWillUnmount');
    }

    async initData () { 
        const response = await new Promise((resolve,reject)=>{
            setTimeout(()=>{
                this.onSetState('username','liuyan');
                this.onSetState('password','123456');
                resolve('ok');
            },2000);
        });
        if (response && response === 'ok') {
            this.formRef.current.setFieldsValue({username:'liuyan'});
            this.formRef.current.setFieldsValue({password:'123456'});
            console.log('异步赋值完成');
        }
    }

    onSetState (key,value) {
        this.setState((state, props)=>{
            const response = {};
            response[key] = value;
            return response;
        },()=> {
            console.log(`重新赋值${key}:${value}`);
        });
    }

    onChange (e) {
        this.onSetState (e.target.id,e.target.value);
    }

    onFinish (values) {
        const md5_password = md5(values.password);
        values.password = md5_password;
        console.log('Success:', values);
        let router = createHashHistory();
        router.push({
            pathname:`/`
        });
    };
    
    onFinishFailed (errorInfo) {
        console.log('Failed:', errorInfo);
    };

    onReset () {
        this.setState((state, props)=>{
            let response = {};
            for (let key in this.state) {
                response[key] = '';
            }
            return response;
        },()=> {
            this.formRef.current.resetFields(Object.keys(this.state));
            console.log('重置',this.formRef.current);
        });
    }

    render () {
        return (
            <div className={style.home}>
                <div className={style.box}>
                    <Form
                        {...layout}
                        className="basic"
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                        ref={this.formRef}
                        initialValues={this.state}
                    >
                        <Form.Item
                            {...this.form.username}
                        >
                            <Input 
                                style={{'width':'260px'}}
                                value={this.state.username} 
                                onChange={this.onChange.bind(this)}
                                allowClear={true}
                                prefix={<UserOutlined className={style.icon}/>} 
                                placeholder="Username"
                            />
                        </Form.Item>
                        <Form.Item
                            {...this.form.password}
                        >
                            <Input.Password 
                                style={{'width':'260px'}}
                                value={this.state.password} 
                                onChange={this.onChange.bind(this)}
                                allowClear={true}
                                prefix={<LockOutlined className={style.icon}/>}
                                placeholder="Password"
                                autoComplete="true"
                            />
                        </Form.Item>
                        <div className={style.BTN}>
                            <Button 
                                type="primary" 
                                onClick={this.onReset.bind(this)}
                                style={{'marginLeft':'10px'}}
                            >
                                重置
                            </Button>
                            <Button 
                                type="primary" 
                                htmlType="submit"
                                style={{'marginLeft':'10px'}}
                            >
                                提交
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}
