import React from 'react';
import WarehousePage from '../pages/WarehousePage';
import SignInPage from '../pages/SignInPage';
import AddAction from '../pages/AddAction';
import RepairAction from '../pages/RepairAction';
import RelocationAction from '../pages/RelocationAction';
import InstallAction from '../pages/InstallAction';
import DashboardPage from '../pages/DashboardPage';
import ProfilePage from '../pages/ProfilePage';
import Administration from '../pages/Administration';
import { IPages } from 'src/interfaces';

export const DASHBOARD_ACTION = 'Dashboard';
export const WAREHOUSE_ACTION = 'Warehouse';
export const ADD_ACTION = 'Add';
export const REPAIR_ACTION = 'Repair';
export const INSTALL_ACTION = 'Install';
export const RELOCATION_ACTION = 'Administration';
export const ADMINISTRATION = 'CreateUser';
export const SIGN_IN_ACTION = 'SignIn';
export const PROFILE = 'Profile';

export const getPageTitle = (value: string):string => {
  switch (value) {
  case DASHBOARD_ACTION: return 'Дашборд';
  case WAREHOUSE_ACTION: return 'Склад КП';
  case ADD_ACTION: return 'Добавить КП';
  case REPAIR_ACTION: return 'Ремонт КП';
  case INSTALL_ACTION: return 'Установка КП';
  case RELOCATION_ACTION: return 'Перемещение КП';
  case ADMINISTRATION: return 'Администрирование';
  case SIGN_IN_ACTION: return 'Авторизоваться';
  case PROFILE: return 'Личный кабинет';
  default: return 'Авторизоваться';
  }
};

interface IPagination extends IPages {
  currentPage: string
}

export const Pagination:React.FC<IPagination> = ({ 
  currentPage, 
  switchPage, 
  openCustomDialog,
  setOpenCustomDialog,
}) => {
  switch (currentPage) {
  case WAREHOUSE_ACTION: return <WarehousePage 
    switchPage={switchPage} 
    openCustomDialog={openCustomDialog}
    setOpenCustomDialog={setOpenCustomDialog}
  />;
  case DASHBOARD_ACTION: return <DashboardPage 
    switchPage={switchPage} 
    openCustomDialog={openCustomDialog}
    setOpenCustomDialog={setOpenCustomDialog}
  />;
  case ADMINISTRATION: return <Administration 
    switchPage={switchPage} 
    openCustomDialog={openCustomDialog}
    setOpenCustomDialog={setOpenCustomDialog}
  />;
  case SIGN_IN_ACTION: return <SignInPage />;
  case PROFILE: return <ProfilePage />;
  case ADD_ACTION: return <AddAction />;
  case REPAIR_ACTION: return <RepairAction />;
  case INSTALL_ACTION: return <InstallAction 
    switchPage={switchPage} 
    openCustomDialog={openCustomDialog}
    setOpenCustomDialog={setOpenCustomDialog}
  />;
  case RELOCATION_ACTION: return <RelocationAction />;
  default: return <SignInPage />;
  }
};
