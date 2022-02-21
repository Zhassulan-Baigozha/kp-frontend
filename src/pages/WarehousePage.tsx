import React, { useState } from 'react';
import { ADD_ACTION, INSTALL_ACTION, RELOCATION_ACTION, REPAIR_ACTION } from 'src/layout/pages';
import { Button } from 'antd';
import { ApartmentOutlined, DownloadOutlined, NodeExpandOutlined, PlusSquareOutlined } from '@ant-design/icons';
import useConvertWs from 'src/hooks/useConvertWs';
import BackgroundPaper from 'src/layout/BackgroundPaper';
import { GetStatuses, GetTransportList, GetWSHistory } from 'src/api/CustomAPI';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'src/store';
import { sortStatuses } from 'src/utils/sortStatuses';
import { setAllStatusesList, setTransportList } from 'src/store/data/actions';
import EditableTable from 'src/components/tables/EditableTable';
import { IHistory } from 'src/api/CustomAPIModel';
interface IWarehousePage {
    switchPage: (value: string) => void
}


const WarehousePage: React.FC<IWarehousePage> = ({
    switchPage,
}) => {
    const { convertedWS2 } = useConvertWs();
    const token = useSelector((state: IRootState) => state.token.data);
    const dispatch = useDispatch();
    const [selectedWSHistory, setSelectedWSHistory] = useState<IHistory[]>([]);
    const users = useSelector((state: IRootState) => state.data.allUsers);
    const statuses = useSelector((state: IRootState) => state.data.allStatuses);
    const states = useSelector((state: IRootState) => state.data.allStates);
    console.log('selectedWSHistory', selectedWSHistory);

    return (
        <BackgroundPaper>
            <div style={{marginBottom: '24px', textAlign: 'right'}}>
                <div style={{marginRight: '16px', display: 'inline-block'}}>
                    <Button 
                        className={'OutlinedBtn'} 
                        icon={<PlusSquareOutlined style={{fontSize: '20px', paddingTop: '0px'}}/>} 
                        onClick={()=>{switchPage(ADD_ACTION);}}
                        style={{ height: '40px'}}
                    >
                        <span className={'WarehouseBtnText'}>Добавить</span>
                    </Button>
                </div>

                <div style={{marginRight: '16px', display: 'inline-block'}}>
                    <Button 
                        className={'OutlinedBtn'} 
                        icon={<ApartmentOutlined style={{fontSize: '20px', paddingTop: '0px'}}/>} 
                        onClick={async ()=>{
                            const GetStatusesResponse = await GetStatuses(token.access);
                            dispatch(setAllStatusesList(GetStatusesResponse.sort(sortStatuses)));
                            switchPage(REPAIR_ACTION);
                        }}
                        style={{ height: '40px'}}
                    >
                        <span className={'WarehouseBtnText'}>Ремонт</span>
                    </Button>
                </div>

                <div style={{marginRight: '16px', display: 'inline-block'}}>
                    <Button 
                        className={'OutlinedBtn'} 
                        icon={<DownloadOutlined style={{fontSize: '20px', paddingTop: '0px'}}/>} 
                        onClick={()=>{switchPage(INSTALL_ACTION);}}
                        style={{ height: '40px'}}
                    >
                        <span className={'WarehouseBtnText'}>Установить</span>
                    </Button>
                </div>

                <div style={{display: 'inline-block'}}>
                    <Button 
                        className={'OutlinedBtn'} 
                        icon={<NodeExpandOutlined style={{fontSize: '20px', paddingTop: '0px'}}/>} 
                        style={{ height: '40px'}}
                        onClick={async ()=>{
                            const GetTransportListResponse = await GetTransportList(token.access);
                            dispatch(setTransportList(GetTransportListResponse));
                            switchPage(RELOCATION_ACTION);
                        }}
                    >
                        <span className={'WarehouseBtnText'}>Перемещение</span>
                    </Button>
                </div>

            </div>
            {convertedWS2?.length > 0 && (
                <EditableTable ws={convertedWS2} selectionType={'radio'} onChange={(_a, _b) => {
                    
                    if (_a.length >= 1) {
                        GetWSHistory(token.access, _a[0]).then((res) => {
                            console.log('res', res);
                            if (res?.length >= 1 && res[0].history){
                                setSelectedWSHistory(res[0].history);
                            } else {
                                setSelectedWSHistory([]);
                            }
                        });
                    }
                }}/>
            )}
            {selectedWSHistory.length > 0 && selectedWSHistory.map((res, idx) => (
                <div key={idx} className={'RelocationBtnText'} style={{
                    marginBottom: '16px',
                }}>
                    <div>
                        Примечание: {res.description.length ? res.description: 'Отсутствует'}
                    </div>
                    <div>
                        Склад: {res.warehouse_name.length ? res.warehouse_name: 'Отсутствует'}
                    </div>
                    <div>
                        {`Дата: ${res.date_time.substr(0,10)} Время: ${res.date_time.substr(11,8)}`}
                    </div>
                    {users.filter(user=> user.uuid === res.user_id).map(user => (
                        <div key={user.uuid}>
                            {`Пользователь: ${user.name + ' ' + user.surname} Почта: ${user.email} `}
                        </div>
                    ))}
                    {statuses.filter(status=> status.code === res.status).map(status => (
                        <div key={status.code}>
                            {`Статус: ${status.description}`}
                        </div>
                    ))}
                    {states.filter(status=> status.id === res.state).map(state => (
                        <div key={state.id}>
                            {`Состояние: ${state.label}`}
                        </div>
                    ))}
                </div>
            ))}
        </BackgroundPaper>
    );
};

export default WarehousePage;