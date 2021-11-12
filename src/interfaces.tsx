import react from 'react';

export interface IFetchDataState<T> {
  data: T;
  loading: boolean;
}

export interface ITablePagination {
  pageNo: number;
  pageSize: number;
}

export interface ISelectOption {
  value: any,
  label: string;
}

export interface IApartmentBlock {
  address: string,
  blockId: string,
  blockName: string,
  deadline: string,
  fgjs: number,
  groupTypeId: number,
  hasBooklet: boolean,
  maxTotalPrice: number,
  minTotalPrice: number,
  photoURL200: string,
  photoURL400: string,
  photoURL1600: string,
  placementCount: number,
  propertyClassName: string,
  realEstateId: string,
  webSite: string,
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

export interface IButtonProps {
  onCLick: () => void,
  text: string,
  width: string,
  disabled?: boolean,
  startIcon?: react.ReactNode,
  fullWidth?: boolean,
}

export interface ISelectedAdresses {
  region?: string, 
  state?: string
  street?: string
  houseNum?: string
  apartmentNum?: string
}

export type TSelectedAdressesKeys = 'region' | 'state' | 'street' | 'apartmentNum' | 'houseNum'

export interface IMocks1 {
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
}
//**************************************************************** */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IProps {}

export interface IPages extends IProps {
  switchPage: (value: string) => void
}