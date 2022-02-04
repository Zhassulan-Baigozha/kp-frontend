import * as React from 'react';
import { Table } from 'antd';
import { ITransferList } from 'src/interfaces';
import { RowSelectionType } from 'antd/lib/table/interface';

interface ITranferTable {
    transferList: ITransferList[]
    onChange?: (selectedRowKeys: React.Key[], selectedRows: ITransferList[]) => void;
    selectionType?: RowSelectionType
}

const TransferTable: React.FC<ITranferTable> = ({
    onChange,
    selectionType = 'checkbox',
    transferList, 
}) => {
    const columns2 = [
        {
            title: '№ Трансфер',
            dataIndex: 'key',
            key: 'key',
            width: 150,
        },
        {
            title: 'Отправление',
            dataIndex: 'departure',
            key: 'departure',
            width: 150,
        },
        {
            title: 'Прибытие',
            dataIndex: 'destination',
            key: 'destination',
            width: 150,
        },
        {
            title: 'Вид Транспорта',
            dataIndex: 'transportType',
            key: 'transportType',
            width: 150,
        },
        {
            title: 'Номер транспорта',
            dataIndex: 'transport',
            key: 'transport',
            width: 150,
        },
    ];
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: ITransferList[]) => {
            onChange?.(selectedRowKeys, selectedRows);
        },
        getCheckboxProps: (record: ITransferList) => ({
            id: record.key,
        }),
    };
    return (
        <div style={{marginBottom: '16px'}}>
            <Table
                bordered
                columns={columns2}
                dataSource={transferList}
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

export default TransferTable;