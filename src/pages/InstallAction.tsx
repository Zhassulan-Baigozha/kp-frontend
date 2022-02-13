import React, { useState } from 'react';
import { IWSListTable } from 'src/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'src/store';
import { GetWagonById, GetWarehouseByStoreId, InstallWSToWagon } from 'src/api/CustomAPI';
import BackgroundPaper from 'src/layout/BackgroundPaper';
import { primaryColor } from 'src/constants/primaryColor';
import ComboBox from 'src/components/base/ComboBox';
import { CustomCheckBtn } from 'src/components/base/CustomBtn';
import { setSelectedWS } from 'src/store/selectedWS/actions';
import { setWSList } from 'src/store/wsList/actions';
import { Input, message } from 'antd';
import { convertWs } from 'src/utils/convert';
import WSTable from 'src/components/tables/WSTable';
import useConvertWs from 'src/hooks/useConvertWs';
import { Key } from 'antd/lib/table/interface';
const { Search } = Input;

const InstallAction: React.FC = () => {
    const selectedWarehouse = useSelector((state: IRootState) => state.selectedWS.data);
    const token = useSelector((state: IRootState) => state.token.data);
    const dispatch = useDispatch();
    const [wsWagon, setWSWagon] = useState<IWSListTable[]>([]);
    const { convertedWS } = useConvertWs();
    const warehouseList = useSelector((state: IRootState) => state.data.warehouse);
    const [wagonNum, setWagonNum] = useState<string>('61891966');
    const [selectedWSinWarehouse, setSelectedWSinWarehouse] = useState<Key[]>([]);
    const onSearch = (value: string) => {
        setWagonNum(value);
        setWSWagon([]);
        if (wagonNum?.length === 8){
            GetWagonById(token.access, value)
                .then((getWagonByIdResponse) => {
                    const buf = convertWs([
                        getWagonByIdResponse.wheel_set_first,
                        getWagonByIdResponse.wheel_set_second,
                        getWagonByIdResponse.wheel_set_third,
                        getWagonByIdResponse.wheel_set_fourth
                    ]);
                    setWSWagon(buf);
                })
                .catch((err)=>{
                    console.error(err);
                    message.error(err.response.message);
                    message.error(err.response.system_message);
                });
        }
    };
    const onSubmit = () => {
        if (!(+wagonNum)) {
            message.error('Вы не выбрали Вагон');
            return null;
        }
        if (!(selectedWarehouse?.id)) {
            message.error('Вы не выбрали Склад');
            return null;
        }
        if (!(selectedWSinWarehouse.length > 0)) {
            message.error('Вы не выбрали КП');
            return null;
        }
        
        console.log('Подтвердить',
            {
                description: '',
                wagon_id: +wagonNum,
                warehouse_id: +selectedWarehouse.id,
                ws_list: selectedWSinWarehouse
            }
        );
        InstallWSToWagon(token.access, {
            description: '',
            wagon_id: +wagonNum,
            warehouse_id: +selectedWarehouse.id,
            ws_list: selectedWSinWarehouse
        }).then(() => {
            message.success('Установка успешно произведена!');
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
                <Search 
                    placeholder={'Номер вагона'}
                    value={wagonNum}
                    onSearch={onSearch} 
                    style={{ width: 300, marginRight: '16px' }} 
                    onChange={(value)=>{
                        setWagonNum(value.target.value);
                    }}
                    // validate={wagonExists}
                />
                <CustomCheckBtn onClick={onSubmit}/>
            </div>
            <div style={{
                fontFamily: 'Roboto',
                fontSize: '24px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: '42px',
                color: primaryColor,
            }}>
                Колесные пары на вагоне
            </div>
            <WSTable ws={wsWagon} onChange={(_a, _b) => {
                console.log('_a = ', _a);
                console.log('_b = ', _b);
            }}/>
            <div style={{
                paddingTop: '16px',
                fontFamily: 'Roboto',
                fontSize: '24px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: '42px',
                color: primaryColor,
            }}>
                Колесные пары на складе
            </div>
            <WSTable ws={convertedWS} onChange={(_a, _b) => {
                if (_a.length > 0) {
                    setSelectedWSinWarehouse(_a);
                }
                console.log('WSTable convertedWS _a = ', _a);
                console.log('WSTable convertedWS _b = ', _b);
            }}/>
        </BackgroundPaper>
    );
};

export default InstallAction;