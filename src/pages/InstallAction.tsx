import React, { useState } from 'react';
import { IWSListTable, WagonExistanceType } from 'src/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'src/store';
import { IGridData } from 'src/api/CustomAPIModel';
import { GetWagonById, GetWarehouseByStoreId } from 'src/api/CustomAPI';
import BackgroundPaper from 'src/layout/BackgroundPaper';
import { primaryColor } from 'src/constants/primaryColor';
import ComboBox from 'src/components/base/ComboBox';
import { CustomCheckBtn } from 'src/components/base/CustomBtn';
import { setSelectedWS } from 'src/store/selectedWS/actions';
import { setWSList } from 'src/store/wsList/actions';
import { Input, message } from 'antd';
import { convertWs } from 'src/utils/convert';
import WSTable from 'src/components/WSTable';
import useConvertWs from 'src/hooks/useConvertWs';
// import CheckIcon from '@mui/icons-material/Check';
// import WSTable from 'src/components/WSTable';
// import CustomizedInputBase from 'src/components/CustomizedInputBase';
const { Search } = Input;

const InstallAction: React.FC = () => {
    const selectedWarehouse = useSelector((state: IRootState) => state.selectedWS.data);
    const token = useSelector((state: IRootState) => state.token.data);
    const dispatch = useDispatch();
    const [wsWagon, setWSWagon] = useState<IWSListTable[]>([]);
    const { convertedWS } = useConvertWs();
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


    const [wagonBtnDisabled, setWagonBtnDisabled] = useState<boolean>(false);
    const warehouseList = useSelector((state: IRootState) => state.data.warehouse);
    const statuses = useSelector((state: IRootState) => state.data.allStatuses);
    const [wsWarehouse, setWSWarehouse] = useState<IGridData[]>([]);
    // const [selectedWarehouse, selectWarehouse] = useState<IComboBoxOption | null>(null);
    const [wagonNum, setWagonNum] = useState<string>('21206958');
    const [wagonExists, setWagonExists] = useState<WagonExistanceType>(null);

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
                <CustomCheckBtn onClick={()=>{
                    console.log('Подтвердить');
                }}/>
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
            <WSTable ws={convertedWS}/>
        </BackgroundPaper>
    );
};

export default InstallAction;