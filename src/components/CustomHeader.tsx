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
import { 
    GetAllUsr, 
    GetOffices, 
    GetRoles, 
    GetStatuses, 
    GetUsr, 
    GetWarehouseByStoreId 
} from 'src/api/CustomAPI';
import ComboBox from './base/ComboBox';
import { setWSList } from 'src/store/wsList/actions';
import { setSelectedWS } from 'src/store/selectedWS/actions';
import { 
    setUserData, 
    setOfficesList, 
    setAllUsersList, 
    setAllStatusesList, 
    setRolesList 
} from 'src/store/data/actions';
import { sortStatuses } from 'src/utils/sortStatuses';

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
    const warehouseList = useSelector((state: IRootState) => state.data.warehouse);
    const dispatch = useDispatch();

    const menu = (
        <Menu>
            <Menu.Item key={'PROFILE'} onClick={()=>{
                GetUsr(token.access).then((GetUsrResponse )=>{
                    dispatch(setUserData(GetUsrResponse));
                });
                switchPage(PROFILE);
            }}>
                Личный кабинет
            </Menu.Item>
            <Menu.Item key={'ADMINISTRATION'} onClick={()=>{
                GetRoles(token.access).then((GetRolesResponse)=>{
                    dispatch(setRolesList(GetRolesResponse.map((item) => ({ ...item, label: item.name }))));
                });
                GetOffices(token.access).then((GetOfficesResponse )=>{
                    dispatch(setOfficesList(GetOfficesResponse));
                });
                GetAllUsr(token.access).then((GetAllUsrResponse )=>{
                    dispatch(setAllUsersList(GetAllUsrResponse));
                });
                switchPage(ADMINISTRATION);
            }}>
                Администрирование
            </Menu.Item>
            <Menu.Item key={'SIGN_IN_ACTION'} onClick={()=>{
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
                        <td className={'HeaderText'} style={{ opacity: 0.5}}>
                            {getPageTitle(currentPage)}
                        </td>
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
                                        style={{ marginRight: '16px' }}
                                        onClick={()=>{
                                            switchPage(WAREHOUSE_ACTION);
                                        }}
                                    />
                                    <Button 
                                        shape="circle" 
                                        icon={<FileTextFilled />}  
                                        style={{ marginRight: '16px' }}
                                        onClick={async ()=>{
                                            const GetStatusesResponse = await GetStatuses(token.access);
                                            dispatch(setAllStatusesList(GetStatusesResponse.sort(sortStatuses)));
                                            switchPage(DASHBOARD_ACTION);
                                        }}
                                    />
                                    <div style={{ display: 'inline' }}>
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