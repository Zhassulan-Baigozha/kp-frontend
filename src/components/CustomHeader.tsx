import React from 'react';
import { IComboBoxOption } from 'src/interfaces';
import { 
    getPageTitle, 
    ADMINISTRATION, 
    WAREHOUSE_ACTION, 
    DASHBOARD_ACTION, 
    SIGN_IN_ACTION, 
    PROFILE 
} from 'src/layout/pages';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'src/store';
import { primaryColor } from 'src/constants/primaryColor';
import { Header } from 'antd/lib/layout/layout';
import { Menu, Dropdown, Button } from 'antd';
import { FileTextFilled, HomeFilled, UserOutlined } from '@ant-design/icons';
import { GetStatuses, GetWarehouseByStoreId } from 'src/api/CustomAPI';
import ComboBox from './base/ComboBox';
import { setWSList } from 'src/store/wsList/actions';
import { setSelectedWS } from 'src/store/selectedWS/actions';
import { IStatusesTable } from 'src/store/allStatuses/types';
import { setAllStatusesList } from 'src/store/allStatuses/actions';

interface ICustomHeader {
    currentPage: string
    switchPage: (value: string) => void
}

const CustomHeader: React.FC<ICustomHeader> = ({
    currentPage,
    switchPage,
}) => {
    const token = useSelector((state: IRootState) => state.token.data);
    const selectedWarehouse = useSelector((state: IRootState) => state.selectedWS.data);
    const warehouseList = useSelector((state: IRootState) => state.warehouse.data);
    const dispatch = useDispatch();
    const compareNumbers = (a:IStatusesTable, b:IStatusesTable) => {
        if (a.code < b.code ) return -1;
        if (a.code > b.code ) return 1;
        return 0;
    };
    const menu = (
        <Menu>
            <Menu.Item key={'PROFILE'} onClick={()=>{
                switchPage(PROFILE);
            }}>
        Личный кабинет
            </Menu.Item>
            <Menu.Item key={'ADMINISTRATION'} onClick={()=>{
                switchPage(ADMINISTRATION);
            }}>
        Администрирование
            </Menu.Item>
            <Menu.Item key={'SIGN_IN_ACTION'} onClick={()=>{
                localStorage.removeItem('auth_user_token');
                switchPage(SIGN_IN_ACTION);
            }}>
        Выход
            </Menu.Item>
        </Menu>
    );

    const hangleWSSelect = (value: IComboBoxOption | null) => {
        dispatch(setSelectedWS(value));
        if (value?.id) {
            GetWarehouseByStoreId(token.access, value.id.toString()).then((res)=>{
                dispatch(setWSList(res));
            });
        }
    };

    return (
        <Header style={{ 
            backgroundColor: '#fff',
            height: '80px',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            position: 'fixed',
            width: '100%',
            zIndex: 2,
        }}>
            <table style={{height: '100%', width: '100%', padding: '0px 16px', }}>
                <tbody>
                    <tr>
                        <td style={{textAlign: 'left', width: '33%', padding: 0}} onClick={()=>{
                            switchPage(WAREHOUSE_ACTION);
                        }}>
                    logo
                        </td>
                        <td style={{
                            textAlign: 'center',
                            fontFamily: 'Roboto',
                            fontSize: '36px',
                            fontStyle: 'normal',
                            fontWeight: 500,
                            lineHeight: '42px',
                            opacity: 0.5,
                            color: primaryColor,
                            width: '33%',
                        }}>{getPageTitle(currentPage)}</td>
                        <td style={{textAlign: 'right', width: '34%'}}>
                            {SIGN_IN_ACTION !== currentPage && (
                                <div style={{display: '-webkit-inline-box'}}>
                                    <ComboBox 
                                        fullWidth={false}
                                        label={'Выберите Склад'} 
                                        options={warehouseList}
                                        value={selectedWarehouse}
                                        onChange={hangleWSSelect}
                                    />
                                    <Button 
                                        shape="circle" 
                                        icon={<HomeFilled />} 
                                        onClick={()=>{
                                            switchPage(WAREHOUSE_ACTION);
                                        }}
                                        style={{
                                            marginRight: '16px',
                                        }}
                                    />
                                    <Button 
                                        shape="circle" 
                                        icon={<FileTextFilled />}  
                                        onClick={async ()=>{
                                            const GetStatusesResponse = await GetStatuses(token.access);
                                            dispatch(setAllStatusesList(GetStatusesResponse.sort(compareNumbers)));
                                            switchPage(DASHBOARD_ACTION);
                                        }}
                                        style={{
                                            marginRight: '16px',
                                        }}
                                    />
                                    <div style={{
                                        display: 'inline',
                                    }}>
                                        <Dropdown overlay={menu} placement="bottomRight">
                                            <Button 
                                                shape="circle" 
                                                icon={<UserOutlined />}  
                                            />
                                        </Dropdown>
                                    </div>
                                </div>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
        </Header>
    );
};

export default CustomHeader;