import React from 'react';
import styles from './formInModal.module.scss';
import { Modal, Form , Input, InputNumber } from 'antd';

export default class formInModal extends React.Component {

    constructor (props) {
        super(props);
        this.state={
            name: '',
            age: '',
            address: ''
        };
        this.formRef = React.createRef();
    }

    componentDidMount () {
        console.log('componentDidMount');
    }

    componentDidUpdate (prevProps,prevState) {
        console.log('componentDidUpdate',prevProps,prevState);
    }

    handleOk () {
        console.log('handleOk');
        this.formRef.validateFields().then(value=>{
            console.log(value);
            this.props.close();
        })
    }

    handleCancel () {
        console.log('handleCancel');
        this.props.close();
    }

    onFinish (values) {
        console.log('Success:', values);
    };
    
    onFinishFailed (errorInfo) {
        console.log('Failed:', errorInfo);
    };

    onChange (e) {
        e instanceof Object
            ? this.onSetState (e.target.id,e.target.value)
            : this.onSetState ('age',e);
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

    render () {
        const layout = {
            labelCol: {
              span: 6,
            },
            wrapperCol: {
              span: 18,
            },
        };
        const formSource =  [
            {
                formItem: {
                    name: 'name',
                    label: '姓名',
                    rules: [
                        {
                            required: true,
                            message: 'Please input your name!',
                        }
                    ]
                },
                component: (<Input 
                    style={{'width':'250px'}}
                    allowClear={true}
                    onChange={this.onChange.bind(this)}
                    value={this.state.name}
                ></Input>)
            },
            {
                formItem: {
                    name: 'age',
                    label: '年龄',
                    rules: [
                        {
                            required: true,
                            message: 'Please input your age!',
                        }
                    ]
                },
                component: (<InputNumber 
                    min={1}
                    onChange={this.onChange.bind(this)}
                    value={this.state.age}
                ></InputNumber>)
            },
            {
                formItem: {
                    name: 'address',
                    label: '地址',
                    rules: [
                        {
                            required: true,
                            message: 'Please input your address!',
                        }
                    ]
                },
                component: (<Input 
                    style={{'width':'250px'}}
                    allowClear={true}
                    onChange={this.onChange.bind(this)}
                    value={this.state.address}
                ></Input>)
            }
        ];
        return (
            <>
                <Modal title={this.props.editKey < 0?`新增`:`编辑`} visible={this.props.isModalVisible} onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}>
                    <div>
                        <Form
                            {...layout}
                            className={styles.Form}
                            onFinish={this.onFinish}
                            onFinishFailed={this.onFinishFailed}
                            ref={this.formRef}
                            initialValues={this.state}
                        >
                            {formSource.map((item,idx) => (
                                <Form.Item
                                    {...item.formItem}
                                    key={idx}
                                >
                                    {item.component}
                                </Form.Item>
                            ))}
                        </Form>
                    </div>
                </Modal>
            </>
        )
    }
}