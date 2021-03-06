import React, { useState } from 'react';
import { IWSListTableAddPage } from 'src/interfaces';
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
import { convertWs2 } from 'src/utils/convert';
import useConvertWs from 'src/hooks/useConvertWs';
import { Key } from 'antd/lib/table/interface';
import EditableTable from 'src/components/tables/EditableTable';
import { useErrorHandler } from 'src/utils/useErrorHandler';
const { Search } = Input;

const InstallAction: React.FC = () => {
    const { errorHandler } = useErrorHandler();
    const selectedWarehouse = useSelector((state: IRootState) => state.selectedWS.data);
    const token = useSelector((state: IRootState) => state.token.data);
    const dispatch = useDispatch();
    const [wsWagon, setWSWagon] = useState<IWSListTableAddPage[]>([]);
    const { convertedWS2 } = useConvertWs();
    const [wagonNum, setWagonNum] = useState<string>('61891966');
    const [selectedWSinWarehouse, setSelectedWSinWarehouse] = useState<Key[]>([]);

    const onSearch = (value: string) => {
        setWagonNum(value);
        setWSWagon([]);
        if (wagonNum?.length === 8){
            GetWagonById(token.access, value)
                .then((getWagonByIdResponse) => {
                    const buf = convertWs2(getWagonByIdResponse.wheel_sets);
                    setWSWagon(buf);
                })
                .catch(errorHandler);
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
        InstallWSToWagon(token.access, {
            description: '',
            wagon_id: +wagonNum,
            warehouse_id: +selectedWarehouse.id,
            ws_list: selectedWSinWarehouse
        }).then(() => {
            message.success('Установка успешно произведена!');
            GetWagonById(token.access, wagonNum).then((getWagonByIdResponse) => {
                const buf = convertWs2(getWagonByIdResponse.wheel_sets);
                setWSWagon(buf);
            }).catch(errorHandler);
            GetWarehouseByStoreId(token.access, selectedWarehouse.id.toString()).then((res)=>{
                dispatch(setWSList(res));
            });
        }).catch(errorHandler);
    };

    return (
        <BackgroundPaper>
            <div style={{ display: 'flex'}}>
                <Search 
                    placeholder={'Номер вагона'}
                    value={wagonNum}
                    onSearch={onSearch} 
                    style={{ width: 300, marginRight: '16px' }} 
                    onChange={(value)=>{
                        setWagonNum(value.target.value);
                    }}
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
            <EditableTable selectionType={'checkbox'} ws={wsWagon} />
            <div className={'installActionText'}>
                Колесные пары на складе
            </div>
            <EditableTable selectionType={'checkbox'} ws={convertedWS2} onChange={(_a, _b) => {
                if (_a.length > 0) {
                    setSelectedWSinWarehouse(_a);
                }
            }}/>
        </BackgroundPaper>
    );
};

export default InstallAction;