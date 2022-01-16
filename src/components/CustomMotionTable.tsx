import { Table } from 'antd';

export const CustomMotionTable: React.FC = () => {
  const dataSource = [
    {
      key: '1',
      num: '1',
      name: 'Mike',
      commonState: '10 Downing Street',
      amount: 32,
    },
    {
      key: '2',
      num: '2',
      name: 'Mike',
      commonState: '10 Downing Street',
      amount: 32,
    },
    {
      key: '3',
      num: '3',
      name: 'Mike',
      commonState: '10 Downing Street',
      amount: 32,
    },
  ];
  
  const columns = [
    {
      title: '№',
      dataIndex: 'num',
      key: 'num',
    },
    {
      title: 'Наименование к\п на складе',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Общий статус',
      dataIndex: 'commonState',
      key: 'commonState',
    },
    {
      title: 'Количество',
      dataIndex: 'amount',
      key: 'amount',
    },
  ];
  return (
    <Table 
      dataSource={dataSource} 
      columns={columns} 
      bordered
      size="middle"
    />
  );
};