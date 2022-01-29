import React from 'react';
import { IRootState } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import BackgroundPaper from 'src/layout/BackgroundPaper';
import { Table } from 'antd';
import { DashboardTableColumns } from 'src/constants/DashboardTableColumns';
import useConvertWs from 'src/hooks/useConvertWs';

const DashboardPage: React.FC = () => {
    const dispatch = useDispatch();
    const statuses = useSelector((state: IRootState) => state.data.allStatuses);
    const { convertedWS } = useConvertWs();

    const dataSource = statuses.map(s => ({
        num: (+s.code) + 1,
        name: s.name, 
        commonState: s.type_status,
        amount: convertedWS.filter(z => z.status === s.code).length
    }));

    return (
        <BackgroundPaper>
            <Table 
                dataSource={dataSource} 
                columns={DashboardTableColumns} 
                bordered
                size="small"
                pagination={{ pageSize: 40, hideOnSinglePage: true }}
            />
        </BackgroundPaper>
    );
};

export default DashboardPage;