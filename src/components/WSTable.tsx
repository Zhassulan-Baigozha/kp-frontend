import * as React from 'react';
import { Table } from 'antd';
import NestedTable from './NestedTable';
import { IRootState } from 'src/store';
import { useSelector } from 'react-redux';
import ConvertWS from 'src/utils/ConvertWS';

interface IWSTable {}

const WSTable: React.FC<IWSTable> = () => {
  const wsList = useSelector((state: IRootState) => state.wsList.data);
  const convertedWS = ConvertWS(wsList);
  console.log('wsList = ', ConvertWS(wsList));
  const columns2 = [
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

  return (
    <Table
      bordered
      columns={columns2}
      dataSource={convertedWS}
      size="small"
      rowClassName={'rowClassName2'}
      expandable={{ 
        rowExpandable: record => !!(record?.wheels && record?.wheels?.length),
        expandedRowRender: record => <NestedTable wheels={record.wheels}/>, 
      }}
    />
  );
};

export default WSTable;