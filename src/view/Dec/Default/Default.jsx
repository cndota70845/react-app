import React from 'react';
import style from './Default.module.scss';
import { Table, Button, Space } from 'antd';

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
            data:[]
        };
    }

    onSelectChange (selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
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
        const columns = [
            {
                title: 'Key',
                dataIndex: 'key',
            },
            {
                title: 'Name',
                dataIndex: 'name',
            },
            {
                title: 'Age',
                dataIndex: 'age',
            },
            {
                title: 'Address',
                dataIndex: 'address',
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
                        <Button>Invite {record.name}</Button>
                        <Button onClick={this.onRemove.bind(this,'single',record.key)}>Delete</Button>
                    </Space>
                ),
            }
        ];
        
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange.bind(this)
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div>
                <div className={style.BTN}>
                    <Button type="primary" className={style.func} onClick={this.onAdd.bind(this)} disabled={loading}>添加一条数据</Button>
                    <Button type="danger" className={style.func} disabled={!hasSelected || loading} onClick={this.onRemove.bind(this,'multiple')}>批量删除数据</Button>
                </div>
                <Table 
                    rowSelection={rowSelection} 
                    columns={columns} 
                    dataSource={this.state.data}
                    bordered
                    loading={this.state.loading}
                />
            </div>
        )
    }
}