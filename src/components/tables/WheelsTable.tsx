import * as React from 'react';
import { Table } from 'antd';
import NestedTable from './NestedTable';
import { IWheelsListTable } from 'src/interfaces';
import { RowSelectionType } from 'antd/lib/table/interface';

interface IWheelsTable {
    ws: IWheelsListTable[]
    onChange?: (selectedRowKeys: React.Key[], selectedRows: IWheelsListTable[]) => void;
    selectionType?: RowSelectionType
}

const WheelsTable: React.FC<IWheelsTable> = ({
    onChange,
    selectionType = 'checkbox',
    ws, 
}) => {
    const columns2 = [
        {
            title: '№',
            dataIndex: 'wheelId',
            key: 'wheelId',
            width: 100,
        },
        {
            title: 'Клеймо произ.',
            dataIndex: 'manufacturerCode',
            key: 'manufacturerCode',
            width: 100,
        },
        {
            title: 'Год изг.',
            dataIndex: 'yearIssue',
            key: 'yearIssue',
            width: 100,
        },
        {
            title: 'номер CKK',
            dataIndex: 'CKKNumber',
            key: 'CKKNumber',
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
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: IWheelsListTable[]) => {
            onChange?.(selectedRowKeys, selectedRows);
        },
        getCheckboxProps: (record: IWheelsListTable) => ({
            // disabled: record.axisNum === 'Disabled User',
            name: record.wheelId,
        }),
    };
    return (
        <div style={{marginBottom: '16px'}}>
            <Table
                bordered
                columns={columns2}
                dataSource={ws}
                size="small"
                rowClassName={'rowClassName2'}
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                pagination={{ pageSize: 10, hideOnSinglePage: true }}
            />
        </div>
    );
};

export default WheelsTable;