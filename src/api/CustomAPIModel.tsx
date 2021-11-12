export interface ISignInResponse { 
  access_token: string,
  refresh: string,
}
export interface ISignInRequest { 
  email: string,
  password: string,
}

export interface IGetRolesItem {
  id: number,
  name: string,
  display_name: string,
  description: string,
}
export interface IGetWSResponse {
  axis: {
    created_at: string,
    date_survey: string,
    id: number,
    manufacturer_code: number,
    number: string,
    status: number,
    year_issue: number,
  },
  created_at: string,
  id: number,
  status: number,
  updated_at: string,
  user_id: string,
  wagon: number,
  warehouse_id: number,
  wheel_left: {
    created_at: string,
    date_survey: string,
    flange: number,
    id: number,
    manufacturer_code: number,
    number: string,
    rim: number,
    status: number,
    year_issue: number,
  },
  wheel_right: {
    created_at: string,
    date_survey: string,
    flange: number,
    id: number,
    manufacturer_code: number,
    number: string,
    rim: number,
    status: number,
    year_issue: number,
  }
}

export interface IGridData {
  id: string,
  wagon: string,
  rimLeft: string,
  rimRight: string,
  flangeLeft: string,
  flangeRight: string,
  created_at: string,
  updated_at: string,
  manufacturer_code: string,
  wheelPairNum: string,
}
