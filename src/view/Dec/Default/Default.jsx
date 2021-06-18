import React from 'react';
import style from './Default.module.scss';
import { Table, Button, Space, Popconfirm } from 'antd';
import FormInModal from '@/components/formInModal/formInModal.jsx';
import jsExportExcel from '@/utils/downloadExcel/jsExportExcel.js';
import moment from 'moment';

function chooseKey (arr) {
    let res = Math.min(...arr);
    if (res > 1) {
        return 1;
    }
    else {
        while (arr.includes(res)) {
            res++;
        }
        return res;
    }
}

export default class Default extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            loading: false,
            data:[],
            isModalVisible: false,
            editKey:-1
        };
        this.columns = [
            {
                title: 'Key',
                dataIndex: 'key',
            },
            {
                title: '姓名',
                dataIndex: 'name',
            },
            {
                title: '年龄',
                dataIndex: 'age',
            },
            {
                title: '地址',
                dataIndex: 'address',
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
                        <Button
                            onClick={this.onModalChange.bind(this,{modal:1,key:record.key})}
                        >编辑</Button>
                        <Popconfirm 
                            placement="topLeft" 
                            title="是否删除此条信息" 
                            onConfirm={this.onRemove.bind(this,'single',record.key)} 
                            okText="确认" 
                            cancelText="取消"
                        >
                            <Button>Delete</Button>
                        </Popconfirm>
                    </Space>
                ),
            }
        ];
    }

    onModalChange (opt) {
        const editKey = opt.key?opt.key:-1;
        this.setState({ 
            isModalVisible:Boolean(opt.modal),
            editKey:editKey
        });
    }

    onSelectChange (selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }

    onAdd (data) {
        const keyList = this.state.data.map(item => {
            return parseInt(item.key);
        });
        const newKey = chooseKey(keyList);
        const newItem = Object.assign({key: String(newKey)}, data);
        const newData = [].concat(this.state.data,newItem).sort(function(prv, cur){return  prv.key - cur.key});
        this.setState({ 
            data: newData,
            isModalVisible: false,
            editKey:-1
        });
    }

    onEdit (opt) {
        if (opt.key >= 0) {
            const newData = this.state.data.map(item => {
                return item.key === opt.key
                    ? Object.assign({key: String(opt.key)}, opt.data)
                    : item;
            });
            this.setState({ 
                data: newData,
                isModalVisible: false,
                editKey:-1
            });
        }
        else {
            this.onAdd(opt.data);
        }
        
    }

    onDownLoad () {
        jsExportExcel({
            data: this.state.data,
            columns: this.columns,
            fileName: `测试导出excel${moment().subtract(10, 'days').calendar()}`,
            columnsWidth: [5,5,5,10]
        });
    }

    onRemove (type,key) {
        console.log(key);
        if (type) {
            switch (type) {
                case 'multiple':
                    this.setState({ 
                        data:this.state.data.filter(item=>!this.state.selectedRowKeys.includes(item.key)),
                        selectedRowKeys: [],
                        loading: false,
                    });
                    break;
                case 'single':
                    this.setState({ 
                        data:this.state.data.filter(item=>item.key !== key)
                    });
                    break;
                default:
                    break;
            }
        }
    }

    componentDidMount () {
        this.setState({
            loading: true
        });
        this.onInit();
    }

    async onInit() {
        const res = await new Promise(function (resolve,reject) {
            setTimeout(()=>{
                resolve({
                    code:1,
                    data: [
                            {
                                key: '1',
                                name: 'John Brown',
                                age: 32,
                                address: 'New York No. 1 Lake Park',
                                tags: ['nice', 'developer']
                            },
                            {
                                key: '2',
                                name: 'Jim Green',
                                age: 42,
                                address: 'London No. 1 Lake Park',
                                tags: ['loser']
                            },
                            {
                                key: '3',
                                name: 'Joe Black',
                                age: 32,
                                address: 'Sidney No. 1 Lake Park',
                                tags: ['cool', 'teacher']
                            }
                        ]
                });
            },2000)
        });
        if (res) {
            this.setState({
                data:res.data,
                loading: false
            });
        }
    }

    render () {
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange.bind(this)
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div>
                <div className={style.BTN}>
                    <Button type="primary" className={style.func} onClick={this.onModalChange.bind(this,{modal:1})} disabled={loading}>添加</Button>
                    <Button type="primary" className={style.func} onClick={this.onDownLoad.bind(this)} disabled={loading}>导出</Button>
                    <Button type="danger" className={style.func} disabled={!hasSelected || loading} onClick={this.onRemove.bind(this,'multiple')}>删除</Button>
                </div>
                <Table 
                    rowSelection={rowSelection} 
                    columns={this.columns} 
                    dataSource={this.state.data}
                    bordered
                    loading={this.state.loading}
                />
                {this.state.isModalVisible
                    ?<FormInModal 
                        isModalVisible={this.state.isModalVisible} 
                        close={this.onModalChange.bind(this,{modal:0})}
                        editKey={this.state.editKey}
                        submit={this.onEdit.bind(this)}
                    ></FormInModal>
                    :<></>
                }
            </div>
        )
    }
}