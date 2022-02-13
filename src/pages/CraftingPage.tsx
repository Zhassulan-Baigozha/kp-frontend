import React, { useState } from 'react';
import { IWheelsListTable, IWSListTable } from 'src/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'src/store';
import { CraftWS, GetWarehouseByStoreId, GetWheels, ParseWS } from 'src/api/CustomAPI';
import BackgroundPaper from 'src/layout/BackgroundPaper';
import ComboBox from 'src/components/base/ComboBox';
import { CustomBtn } from 'src/components/base/CustomBtn';
import { setSelectedWS } from 'src/store/selectedWS/actions';
import { setWSList } from 'src/store/wsList/actions';
import { message } from 'antd';
import WSTable from 'src/components/tables/WSTable';
import useConvertWs from 'src/hooks/useConvertWs';
import WheelsTable from 'src/components/tables/WheelsTable';

const CraftingPage: React.FC = () => {
    const selectedWarehouse = useSelector((state: IRootState) => state.selectedWS.data);
    const token = useSelector((state: IRootState) => state.token.data);
    const dispatch = useDispatch();
    const warehouseList = useSelector((state: IRootState) => state.data.warehouse);
    const { convertedWS } = useConvertWs();
    const [warehouseWheels, setWarehouseWheels] = useState<IWheelsListTable[]>([]);
    const [selectedWheel, setSelectedWheel] = useState<IWheelsListTable[]>([]);
    const [selectedWSinWarehouse, setSelectedWSinWarehouse] = useState<IWSListTable[]>([]);


    const onCraft = () => {
        if (!(selectedWarehouse?.id)) {
            message.error('Вы не выбрали Склад');
            return null;
        }
        if (selectedWSinWarehouse?.length !== 1) {
            message.error('Вы не выбрали КП');
            return null;
        }
        if (selectedWheel?.length !== 1) {
            message.error('Вы не выбрали ЦКК');
            return null;
        }
        const craftData = {
            description: 'craft',
            id: selectedWSinWarehouse[0].key,
            state_id: +selectedWSinWarehouse[0].state.id,
            status_id: +selectedWSinWarehouse[0].status.id,
            wheels: [
                {
                    id: selectedWheel[0].key,
                    flange: selectedWheel[0].flange,
                    rim: selectedWheel[0].rim,
                    date_survey: selectedWheel[0].dateSurvey,
                    state_id: selectedWheel[0].stateId,
                    status_id: selectedWheel[0].statusId,
                }
            ]
        };
        CraftWS(token.access, craftData)
            .then(() => {
                message.success('Сборка успешно произведена');
            }).catch((err) => {
                console.error('err', err);
                message.error(err.response.data.message);
                message.error(err.response.data.system_message);
            });
    };

    const onParse = () => {
        if (!(selectedWarehouse?.id)) {
            message.error('Вы не выбрали Склад');
            return null;
        }
        if (selectedWSinWarehouse?.length !== 1) {
            message.error('Вы не выбрали КП');
            return null;
        }
        if (!(
            selectedWSinWarehouse[0]?.wheels 
            && selectedWSinWarehouse[0]?.wheels?.length > 0
        )) {
            message.error('Вы выбрали КП который не содержит ЦКК');
            return null;
        }

        ParseWS(token.access, 
            {
                description: 'parse',
                id: selectedWSinWarehouse[0].key,
                state_id: +selectedWSinWarehouse[0].state.id,
                status_id: +selectedWSinWarehouse[0].status.id,
                wheels: selectedWSinWarehouse[0].wheels.map((wheel)=>({
                    date_survey: wheel.date_survey,
                    flange: wheel.flange,
                    id: wheel.id ?? 0,
                    rim: wheel.rim,
                    state_id: +selectedWSinWarehouse[0].state.id,
                    status_id: +selectedWSinWarehouse[0].status.id
                }))
            }
        ).then(() => {
            message.success('Разбор КП успешно произведен');
        }).catch((err) => {
            console.error('err', err);
            message.error(err.response.data.message);
            message.error(err.response.data.system_message);
        });
    };


    return (
        <BackgroundPaper>
            <div style={{ display: 'flex'}}>
                <ComboBox 
                    fullWidth={false}
                    label={'Выберите Склад'} 
                    options={warehouseList}
                    value={selectedWarehouse}
                    onChange={(value) => {
                        dispatch(setSelectedWS(value));
                        if (value?.id) {
                            GetWarehouseByStoreId(token.access, value.id.toString()).then((res)=>{
                                dispatch(setWSList(res));
                            });
                            GetWheels(token.access, value.id.toString()).then((res)=>{
                                setWarehouseWheels(res.map((item)=>({
                                    ...item,
                                    key: item.wheel.id,
                                    wheelId: item.wheel.id.toString(),
                                    rim: item.wheel.rim,
                                    flange: item.wheel.flange,
                                    CKKNumber: item.wheel.number,
                                    yearIssue: item.wheel.year_issue, 
                                    manufacturerCode: item.wheel.manufacturer_code,
                                    wheels: item.wheel,
                                    dateSurvey: item.wheel.date_survey,
                                    stateId: item.state.id,
                                    statusId: item.status.code,
                                })));
                            });
                        }
                    }}
                />
                <CustomBtn onClick={onCraft}>
                    Собрать
                </CustomBtn>
                <CustomBtn onClick={onParse}>
                    Разобрать
                </CustomBtn>
            </div>
            <WheelsTable selectionType={'radio'} ws={warehouseWheels} onChange={(_a, _b) => {
                if (_b.length === 1) {
                    setSelectedWheel(_b);
                }
            }}/>
            <WSTable selectionType={'radio'} ws={convertedWS} onChange={(_a, _b) => {
                if (_b.length === 1) {
                    setSelectedWSinWarehouse(_b);
                }
            }}/>
        </BackgroundPaper>
    );
};

export default CraftingPage;