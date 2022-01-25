import React, { useEffect, useState } from 'react';
import { 
    SIGN_IN_ACTION,
    WAREHOUSE_ACTION,
    Pagination,
} from './pages';
import CustomHeader from 'src/components/CustomHeader';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'src/store';
import { AuthReNew, 
    GetAllUsr, 
    GetOffices, 
    GetRoles, 
    GetStatuses, 
    GetTransportList, 
    GetUsr, 
    GetWarehouse, 
    GetWS 
} from 'src/api/CustomAPI';

import { setUserData } from 'src/store/user/actions';
import { setAllStatusesList } from 'src/store/allStatuses/actions';
import { setOfficesList } from 'src/store/offices/actions';
import { setWarehouseList } from 'src/store/warehouse/actions';
import { setRolesList } from 'src/store/roles/actions';
import { setAllUsersList } from 'src/store/allUsers/actions';
import { setTokenData } from 'src/store/token/actions';
import { setWSList } from 'src/store/wsList/actions';

import './Main.css';
import { setSortedWSList } from 'src/store/sortedWS/actions';
import { IStatusesTable } from 'src/store/allStatuses/types';
// import CustomDialog from 'src/components/CustomDialog';
import { setTransportList } from 'src/store/transportList/actions';
import { Layout, Button } from 'antd';
import { primaryColor } from 'src/constants/primaryColor';

const Main: React.FC = () => {
    const token = useSelector((state: IRootState) => state.token.data);
    const [currentPage, setCurrentPage] = useState<string>('');
    const [openCustomDialog, setOpenCustomDialog] = useState<boolean>(false);
    const dispatch = useDispatch();
    const compareNumbers = (a:IStatusesTable, b:IStatusesTable) => {
        if (a.code < b.code ) return -1;
        if (a.code > b.code ) return 1;
        return 0;
    };

    useEffect(() => {
        if (token.access.length > 0 && token.refresh.length > 0 ) {
            GetUsr(token.access)
                .then(async (GetUsrResponse) => {
                    if (currentPage === SIGN_IN_ACTION) {
                        setCurrentPage(WAREHOUSE_ACTION);
                        const GetRolesResponse = await GetRoles(token.access);
                        const GetAllUsrResponse = await GetAllUsr(token.access);
                        const GetOfficesResponse = await GetOffices(token.access);
                        const GetStatusesResponse = await GetStatuses(token.access);
                        const GetTransportListResponse = await GetTransportList(token.access);
                        const GetWarehouseResponse = await GetWarehouse(token.access);
                        dispatch(setWarehouseList(GetWarehouseResponse));
                        console.log('GetRolesResponse', GetRolesResponse);
                        console.log('GetAllUsrResponse', GetAllUsrResponse);
                        console.log('GetOfficesResponse', GetOfficesResponse);
                        console.log('GetStatusesResponse', GetStatusesResponse);
                        console.log('GetTransportListResponse', GetTransportListResponse);
                        dispatch(setTransportList(GetTransportListResponse));
                        // dispatch(setUserData(GetUsrResponse));
                        dispatch(setAllStatusesList(GetStatusesResponse.sort(compareNumbers)));
                        // dispatch(setOfficesList(GetOfficesResponse));
                        // dispatch(setRolesList(GetRolesResponse.map((item) => ({ ...item, label: item.name }))));
                        // dispatch(setAllUsersList(GetAllUsrResponse));
                    }
                })
                .catch((error) => {
                    console.log('error', error);
                    if (error?.response?.status === 401 && error?.response?.status === 400) {
                        AuthReNew(token.access,{ refresh_token: token.refresh })
                            .then(res => {
                                dispatch(setTokenData({
                                    access: res.access_token,
                                    refresh: res.refresh,
                                }));
                            });
                    } else {
                        setCurrentPage(SIGN_IN_ACTION);
                        console.error(error);
                    }
                });
        } else if (currentPage!== SIGN_IN_ACTION) {
            setCurrentPage(SIGN_IN_ACTION);
        }
    },[currentPage, dispatch, token]);

    return (
        <>
            <Layout>
                <CustomHeader currentPage={currentPage} switchPage={setCurrentPage}/>
                {/* <Content className="site-layout" style={{ 
          padding: '0 50px', 
          marginTop: '100px',
          
        }}>
          <div className="site-layout-background" style={{ padding: '24px', borderRadius: '16px',}}>
            asd
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}></Footer> */}
            </Layout>
            {/* <CustomDialog 
        openCustomDialog={openCustomDialog} 
        setOpenCustomDialog={setOpenCustomDialog}
        switchPage={setCurrentPage}
      />
      <CustomHeader currentPage={currentPage} switchPage={setCurrentPage}/> */}
            <Pagination 
                currentPage={currentPage} 
                switchPage={setCurrentPage}
                openCustomDialog={openCustomDialog} 
                setOpenCustomDialog={setOpenCustomDialog}
            />
      
        </>
    );
};

export default Main;
