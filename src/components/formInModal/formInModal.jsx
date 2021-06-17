import React from 'react';
import styles from './formInModal.module.scss';
import { Modal } from 'antd';

export default class formInModal extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            name: 'formInModal'
        }
    }

    handleOk () {
        console.log('handleOk');
    }

    handleCancel () {
        console.log('handleCancel');
    }

    render () {
        return (
            <>
                <Modal title="Basic Modal" visible={this.props.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </>
        )
    }
}