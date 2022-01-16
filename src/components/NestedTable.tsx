import * as React from 'react';
import { Table } from 'antd';

interface INestedTable {

}

const NestedTable: React.FC<INestedTable> = () => {
  const columns2 = [  
    {
      title: '№',
      dataIndex: 'axisId',
      key: 'axisId',
      width: 150,
    },
    {
      title: '№ Оси',
      dataIndex: 'axisNum',
      key: 'axisNum',
      width: 150,
    },
    {
      title: '№ Вагона',
      dataIndex: 'wagonId',
      key: 'wagonId',
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
      dataIndex: 'WPtype',
      key: 'WPtype',
      width: 150,
    },
    {
      title: 'Примечание',
      dataIndex: 'note',
      key: 'note',
      width: 150,
    },
  ]

  return (
    <Table
      bordered
      columns={columns2}
      dataSource={[]}
      size="small"
    />
  );
};

export default NestedTable;