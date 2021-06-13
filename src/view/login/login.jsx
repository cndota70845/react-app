import React from 'react';
import style from './login.module.scss';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 18,
    },
};

export default class NotFound extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
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

    async initData () { 
        const response = await new Promise((resolve,reject)=>{
            setTimeout(()=>{
                this.onSetState('username','liuyan');
                this.onSetState('password','123456');
                resolve('ok');
            },2000);
        }).then(()=>{
            this.formRef.current.setFieldsValue({username:'liuyan'});
            this.formRef.current.setFieldsValue({password:'123456'});
        });
        if (response && response === 'ok') {
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
        console.log('Success:', values);
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
                                autoComplete="false"
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