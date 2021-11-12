export interface IUser {
  email: string,
  name: string,
  office: 1
  position: string,
  roles: string,
  status: true
  surname: string,
  uuid: string,
}
export interface IUserState {
  isFetching: boolean,
  data: IUser,
}
