import react from 'react';
import { IWheel } from './api/CustomAPIModel';
import { IUser } from './store/user/types';

export interface ITablePagination {
  pageNo: number;
  pageSize: number;
}

export type TKeyValuePair<T> = {
  [key in string]: T;
};
export type TKeyValuePairString = {
  [key in string]: string;
};

export type TNavigationBlock = {
  [key in string]: {
    component: React.ReactNode,
    statusText: string,
    stepText: string,
  };
};

export interface IMocks1 {
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IProps {}

export interface IPages extends IProps {
  switchPage: (value: string) => void
  openCustomDialog: boolean
  setOpenCustomDialog: (value: boolean) => void
}

export interface IComboBoxOption {
  label: string
  id: number
}

export interface ISignUpUser extends IUser{
  password?: string,
  new_password?: string,
  repeat_password?: string,
}

export interface ISignUpRequest {
  email: string,
  name: string,
  office: number | null,
  password: string,
  position: string,
  repeat_password: string,
  roles: string,
  surname: string,
}

export interface IUpdateUserRole {
  role_name: string,
  user_id: string
}

export type WagonExistanceType = 'find' | 'notFind' | null
export type TAlertStatus= 'success' | 'error'

export interface IWSListTable {
  key: number,
  axisNum: string,
  wagonId: number,
  axisType: string,
  manufacturerCode: number,
  createdAt: string,
  description: string,
  wheels: IWheel[] | null,
}