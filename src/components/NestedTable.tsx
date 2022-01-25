import * as React from 'react';
import { Table } from 'antd';
import { IWSListTable } from 'src/interfaces';
import { IWheel } from 'src/api/CustomAPIModel';

interface INestedTable {
  wheels: IWheel[] | null
}

const NestedTable: React.FC<INestedTable> = ({wheels}) => {
    const columns2 = [  
        {
            title: 'CKK',
            dataIndex: 'CKK',
            key: 'CKK',
            width: 150,
        },
        {
            title: 'TO',
            dataIndex: 'rim',
            key: 'rim',
            width: 150,
        },
        {
            title: 'ТГ',
            dataIndex: 'flange',
            key: 'flange',
            width: 150,
        },
    ];
    const data = wheels?.length ? wheels.map((item) => ({
        ...item,
        key: item.id,
        CKK: item.number
    })) : [];
    console.log('wheels', data);
    return (
        <Table
            bordered
            columns={columns2}
            dataSource={data}
            size="small"
            pagination={{ hideOnSinglePage: true }}
        />
    );
};

export default NestedTable;