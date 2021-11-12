import React, { useEffect, useState } from 'react';
import { 
  WAREHOUSE_ACTION,
  ADD_ACTION, 
  REPAIR_ACTION, 
  INSTALL_ACTION,
  RELOCATION_ACTION,
  ADMINISTRATION,
  SIGN_IN_ACTION,
  DASHBOARD_ACTION,
  FORGOT_PASSWORD,
  PROFILE,
} from '../constants/pages';
import { setUserData } from '../store/user/actions';
import WarehousePage from '../pages/Warehouse/WarehousePage';
import SignInPage from '../pages/SignInPage';
import AddAction from '../pages/Warehouse/AddAction';
import RepairAction from '../pages/Warehouse/RepairAction';
import RelocationAction from '../pages/Warehouse/RelocationAction';
import InstallAction from '../pages/Warehouse/InstallAction';
import DashboardPage from '../pages/DashboardPage';
import ForgotPassword from '../pages/ForgotPassword';
import ProfilePage from '../pages/ProfilePage';
import Administration from '../pages/Administration';
import { useDispatch } from 'react-redux';
import { GetUsr } from '../api/CustomAPI';
import CustomHeader from '../components/CustomHeader';

const Main: React.FC = () => {
  const [currentPage, switchPage] = useState<string>(WAREHOUSE_ACTION);
  const dispatch = useDispatch();
  const pagination = () => {
    switch (currentPage) {
    case WAREHOUSE_ACTION: return <WarehousePage switchPage={switchPage}/>;
    case DASHBOARD_ACTION: return <DashboardPage switchPage={switchPage}/>;
    case ADMINISTRATION: return <Administration switchPage={switchPage}/>;
    case FORGOT_PASSWORD: return <ForgotPassword switchPage={switchPage}/>;
    case SIGN_IN_ACTION: return <SignInPage switchPage={switchPage}/>;
    case PROFILE: return <ProfilePage switchPage={switchPage}/>;
    case ADD_ACTION: return <AddAction switchPage={switchPage}/>;
    case REPAIR_ACTION: return <RepairAction switchPage={switchPage}/>;
    case INSTALL_ACTION: return <InstallAction switchPage={switchPage}/>;
    case RELOCATION_ACTION: return <RelocationAction switchPage={switchPage}/>;

    default: return <div />;
    }
  };
  useEffect(() => {
    GetUsr().then((res) => {
      console.log('GetUsr res   = ', res);
      dispatch(setUserData(res));
    }).catch((err) => {
      console.log('GetUsr error = ', err);
    });
  });

  // GetRoles().then((res:IGetRolesItem[]) => {
  //   console.log(res.map(item => ({
  //     label: item.display_name,
  //     id: item.id
  //   })));
  // });

  return (
    <>
      <CustomHeader currentPage={currentPage} switchPage={switchPage}/> {/* currentPage !== SIGN_IN_ACTION && */}
      {pagination()}
    </>
  );
};

export default Main;
