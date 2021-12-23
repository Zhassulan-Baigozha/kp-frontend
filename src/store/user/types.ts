export interface IUser {
  email: string,
  name: string,
  office: number,
  position: string,
  roles: string,
  status: boolean,
  surname: string,
  uuid: string,
}
export interface IUserState {
  isFetching: boolean,
  data: IUser,
}