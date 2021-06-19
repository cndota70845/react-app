import React from 'react';
import styles from './formInModal.module.scss';
import { Modal, Form , Input, InputNumber, Button, message } from 'antd';

function mesh(target,rource) {
    const keyList = Object.keys(rource);
    let response = {};
    for (let key in target) {
        if (keyList.includes(key)) {
            response[key] = rource[key];
        }
    }
    return response;
}

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
        this.init();
    }

    init () {
        if (this.props.defaultData instanceof Array && this.props.defaultData.length === 1) {
            const obj = mesh(this.state,this.props.defaultData[0]);
            console.log(obj);
            this.setState({...obj});
            this.formRef.current.setFieldsValue({...obj});
        }
    }

    componentDidUpdate (prevProps,prevState) {
        console.log('componentDidUpdate',prevProps,prevState);
    }

    async handleOk () {
        try {
            const values = await this.formRef.current.validateFields();
            console.log('Success:', values);
            message.success('提交校验成功');
            this.props.submit({
                key: this.props.editKey,
                data: values
            });
        } 
        catch (errorInfo) {
            console.log('Failed:', errorInfo);
            message.warn('提交校验失败')
        }
            
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
                <Modal 
                    title={this.props.editKey < 0?`新增`:`编辑`} 
                    visible={this.props.isModalVisible} 
                    closable={false}
                    footer={[
                        <Button 
                            key="back" 
                            onClick={this.handleCancel.bind(this)}
                        >取消</Button>,
                        <Button 
                            key="submit" 
                            type="primary" 
                            onClick={this.handleOk.bind(this)}
                        >提交</Button>
                    ]}
                >
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
                </Modal>
            </>
        )
    }
}