import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetUsr } from '../api/CustomAPI';
import CustomHeader from '../components/CustomHeader';
import { 
  ADD_ACTION, 
  REPAIR_ACTION, 
  INSTALL_ACTION,
  RELOCATION_ACTION,
  ADMINISTRATION,
  SIGN_IN_ACTION,
  WAREHOUSE_ACTION,
  DASHBOARD_ACTION,
  FORGOT_PASSWORD,
  PROFILE,
} from '../constants/pages';
import { setUserData } from '../store/user/actions';
import WarehousePage from '../pages/WarehousePage';
import SignInPage from '../pages/SignInPage';
import { IRootState } from '../store';
// import AddAction from 'src/pages/Warehouse/AddAction';
// import RepairAction from 'src/pages/Warehouse/RepairAction';
// import RelocationAction from 'src/pages/Warehouse/RelocationAction';
// import InstallAction from 'src/pages/Warehouse/InstallAction';
// import DashboardPage from 'src/pages/DashboardPage';
// import ForgotPassword from 'src/pages/ForgotPassword';
// import ProfilePage from 'src/pages/ProfilePage';
// import Administration from 'src/pages/Administration';

const Main: React.FC = () => {
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [currentPage, switchPage] = useState<string>(authorized? WAREHOUSE_ACTION: SIGN_IN_ACTION);

  const userData = useSelector((state: IRootState) => state.user.data);
  console.log('userData = ', userData);
  const dispatch = useDispatch();

  const pagination = () => {
    switch (currentPage) {
    case WAREHOUSE_ACTION: return <WarehousePage switchPage={switchPage}/>;
    // case DASHBOARD_ACTION: return <DashboardPage switchPage={switchPage}/>;
    // case ADMINISTRATION: return <Administration switchPage={switchPage}/>;
    // case FORGOT_PASSWORD: return <ForgotPassword switchPage={switchPage}/>;
    case SIGN_IN_ACTION: return <SignInPage switchPage={switchPage} setAuthorized={setAuthorized}/>;
    // case PROFILE: return <ProfilePage switchPage={switchPage}/>;
    // case ADD_ACTION: return <AddAction switchPage={switchPage}/>;
    // case REPAIR_ACTION: return <RepairAction switchPage={switchPage}/>;
    // case INSTALL_ACTION: return <InstallAction switchPage={switchPage}/>;
    // case RELOCATION_ACTION: return <RelocationAction switchPage={switchPage}/>;
    default: return <div />;
    }
  };
  useEffect(() => {
    if (authorized) {
      GetUsr().then((res) => {
        console.log('GetUsr res   = ', res);
        dispatch(setUserData(res));
        switchPage(WAREHOUSE_ACTION);
      }).catch((err) => {
        console.log('GetUsr error = ', err);
      });
    }
  }, [authorized]);

  // GetRoles().then((res:IGetRolesItem[]) => {
  //   console.log(res.map(item => ({
  //     label: item.display_name,
  //     id: item.id
  //   })));
  // });

  return (
    <>
      <CustomHeader currentPage={currentPage} switchPage={switchPage}/> 
      {pagination()}
    </>
  );
};

export default Main;
