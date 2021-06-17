import React from 'react';
import style from './Default.module.scss';
import { Table, Button, Space , Popconfirm } from 'antd';
import ExportJsonExcel from 'js-export-excel';
import FormInModal from '@/components/formInModal/formInModal.jsx';

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
            isModalVisible: false
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
                        <Button>编辑</Button>
                        <Popconfirm placement="topLeft" title="是否删除此条信息" onConfirm={this.onRemove.bind(this,'single',record.key)} okText="确认" cancelText="取消">
                            <Button>Delete</Button>
                        </Popconfirm>
                    </Space>
                ),
            }
        ];
    }

    onModalChange (val) {
        this.setState({ isModalVisible:val });
    }

    onSelectChange (selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }

    downloadExcel () {
        console.log('导出表格');
        var option={};
        if (this.state.data && this.state.data instanceof Array && this.state.data.length > 0) {
            const data = this.state.data;
            const columns = this.columns.map(item => {
                return item.title;
            });
            const dataTable = data.map(item => {
                let obj = {};
                for (let key in item) {
                    let key_str = this.columns.filter(item => item.key === key || item.dataIndex === key);
                    if (key_str.length === 1 && key_str[0].title) {
                        obj[key_str[0].title] = item[key];
                    }
                }
                return obj;
            });
            option.fileName = '测试导出excel';
            option.datas=[
                {
                    sheetData:dataTable,
                    sheetName:'sheet',
                    sheetFilter:columns,
                    sheetHeader:columns,
                }
            ];
            var toExcel = new ExportJsonExcel(option); 
            toExcel.saveExcel(); 
        }
    }

    onAdd () {
        const keyList = this.state.data.map(item => {
            return parseInt(item.key);
        });
        const newKey = chooseKey(keyList);
        const newData = [].concat(this.state.data,{
            key: String(newKey),
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer']
        }).sort(function(prv, cur){return  prv.key - cur.key});
        this.setState({ 
            data: newData
        });
    }

    onRemove (type,key) {
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
                    <Button type="primary" className={style.func} onClick={this.onModalChange.bind(this,true)} disabled={loading}>遮蔽层</Button>
                    <Button type="primary" className={style.func} onClick={this.onAdd.bind(this)} disabled={loading}>添加</Button>
                    <Button type="primary" className={style.func} onClick={this.downloadExcel.bind(this)} disabled={loading}>导出</Button>
                    <Button type="danger" className={style.func} disabled={!hasSelected || loading} onClick={this.onRemove.bind(this,'multiple')}>删除</Button>
                </div>
                <Table 
                    rowSelection={rowSelection} 
                    columns={this.columns} 
                    dataSource={this.state.data}
                    bordered
                    loading={this.state.loading}
                />
                <FormInModal isModalVisible={this.state.isModalVisible}></FormInModal>
            </div>
        )
    }
}