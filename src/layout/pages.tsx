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
import CraftingPage from 'src/pages/CraftingPage';

export const DASHBOARD_ACTION = 'Dashboard';
export const WAREHOUSE_ACTION = 'Warehouse';
export const ADD_ACTION = 'Add';
export const REPAIR_ACTION = 'Repair';
export const INSTALL_ACTION = 'Install';
export const RELOCATION_ACTION = 'Administration';
export const ADMINISTRATION = 'CreateUser';
export const SIGN_IN_ACTION = 'SignIn';
export const PROFILE = 'Profile';
export const CRAFTING = 'CraftingPage';

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
    case CRAFTING: return 'Сбор/Разбор КП';
    default: return 'Авторизоваться';
    }
};

interface IPagination {
    currentPage: string
    switchPage: (value: string) => void
}

export const Pagination:React.FC<IPagination> = ({ 
    currentPage, 
    switchPage, 
}) => {
    switch (currentPage) {
    case WAREHOUSE_ACTION: return <WarehousePage switchPage={switchPage} />;
    case DASHBOARD_ACTION: return <DashboardPage />;
    case ADMINISTRATION: return <Administration />;
    case SIGN_IN_ACTION: return <SignInPage switchPage={switchPage}/>;
    case PROFILE: return <ProfilePage />;
    case ADD_ACTION: return <AddAction />;
    case REPAIR_ACTION: return <RepairAction />;
    case INSTALL_ACTION: return <InstallAction />;
    case RELOCATION_ACTION: return <RelocationAction />;
    case CRAFTING: return <CraftingPage />;
    default: return <SignInPage  switchPage={switchPage}/>;
    }
};
