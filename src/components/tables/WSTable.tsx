import * as React from 'react';
import { Table } from 'antd';
import NestedTable from './NestedTable';
import { IWSListTable } from 'src/interfaces';
import { RowSelectionType } from 'antd/lib/table/interface';

interface IWSTable {
    ws: IWSListTable[]
    onChange?: (selectedRowKeys: React.Key[], selectedRows: IWSListTable[]) => void;
    selectionType?: RowSelectionType
}

const WSTable: React.FC<IWSTable> = ({
    onChange,
    selectionType = 'checkbox',
    ws, 
}) => {
    const columns2 = [
        {
            title: '№ Оси',
            dataIndex: 'axisNum',
            key: 'axisNum',
            width: 150,
        },
        {
            title: 'Тип',
            dataIndex: 'axisType',
            key: 'axisType',
            width: 150,
        },
        {
            title: 'Клеймо произ.',
            dataIndex: 'manufacturerCode',
            key: 'manufacturerCode',
            width: 150,
        },
        {
            title: 'Год изг.',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 150,
        },
        {
            title: 'Вид КП',
            dataIndex: 'WStype',
            key: 'WStype',
            width: 150,
        },
        {
            title: 'Примечание',
            dataIndex: 'note',
            key: 'note',
            width: 150,
        },
    ];
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: IWSListTable[]) => {
            onChange?.(selectedRowKeys, selectedRows);
        },
        getCheckboxProps: (record: IWSListTable) => ({
            // disabled: record.axisNum === 'Disabled User',
            name: record.axisNum,
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
                expandable={{ 
                    rowExpandable: record => !!(record?.wheels && record?.wheels?.length),
                    expandedRowRender: record => <NestedTable wheels={record.wheels}/>, 
                }}
                pagination={{ pageSize: 10, hideOnSinglePage: true }}
            />
        </div>
    );
};

export default WSTable;