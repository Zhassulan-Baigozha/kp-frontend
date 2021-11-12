export const DASHBOARD_ACTION = 'Dashboard';
export const WAREHOUSE_ACTION = 'Warehouse';
export const ADD_ACTION = 'Add';
export const REPAIR_ACTION = 'Repair';
export const INSTALL_ACTION = 'Install';
export const RELOCATION_ACTION = 'Administration';
export const ADMINISTRATION = 'CreateUser';
export const SIGN_IN_ACTION = 'SignIn';
export const PROFILE = 'Profile';
export const FORGOT_PASSWORD = 'ForgotPassword';

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
  case FORGOT_PASSWORD: return 'Забыли пароль';
  default: return 'Передвижения КП';
  }
};
