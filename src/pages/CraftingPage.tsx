import React, { useState } from 'react';
import { IWSListTable } from 'src/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'src/store';
import { GetWagonById, GetWarehouseByStoreId, InstallWSToWagon, ParseWS } from 'src/api/CustomAPI';
import BackgroundPaper from 'src/layout/BackgroundPaper';
import { primaryColor } from 'src/constants/primaryColor';
import ComboBox from 'src/components/base/ComboBox';
import { CustomBtn, CustomCheckBtn } from 'src/components/base/CustomBtn';
import { setSelectedWS } from 'src/store/selectedWS/actions';
import { setWSList } from 'src/store/wsList/actions';
import { Button, Input, message } from 'antd';
import { convertWs } from 'src/utils/convert';
import WSTable from 'src/components/tables/WSTable';
import useConvertWs from 'src/hooks/useConvertWs';
import { Key } from 'antd/lib/table/interface';
import { DownloadOutlined } from '@ant-design/icons';
const { Search } = Input;

const CraftingPage: React.FC = () => {
    const selectedWarehouse = useSelector((state: IRootState) => state.selectedWS.data);
    const token = useSelector((state: IRootState) => state.token.data);
    const dispatch = useDispatch();
    const warehouseList = useSelector((state: IRootState) => state.data.warehouse);
    const { convertedWS } = useConvertWs();

    const [wsWagon, setWSWagon] = useState<IWSListTable[]>([]);
    const [wagonNum, setWagonNum] = useState<string>('61891966');
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

        console.log('onCraft',
            {
                description: 'craft',
                id: selectedWSinWarehouse[0].key,
                state_id: selectedWSinWarehouse[0].state.id,
                status_id: selectedWSinWarehouse[0].status.id,
                wheels: [
                    {
                        date_survey: '',
                        flange: 0,
                        id: 0,
                        rim: 0,
                        state_id: 0,
                        status_id: 0
                    }
                ]
            }
        );
        // InstallWSToWagon(token.access, {
        //     description: '',
        //     wagon_id: +wagonNum,
        //     warehouse_id: +selectedWarehouse.id,
        //     ws_list: selectedWSinWarehouse
        // }).then(() => {
        message.success('Сборка успешно произведена');
        // }).catch((err) => {
        //     console.error('err', err);
        //     message.error(err.response.data.message);
        //     message.error(err.response.data.system_message);
        // });
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
            <WSTable selectionType={'radio'} ws={convertedWS} onChange={(_a, _b) => {
                if (_b.length === 1) {
                    setSelectedWSinWarehouse(_b);
                }
                console.log('WSTable convertedWS _b = ', _b);
            }}/>
        </BackgroundPaper>
    );
};

export default CraftingPage;