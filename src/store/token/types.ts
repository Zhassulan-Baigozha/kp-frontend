export interface IToken {
  access: string;
  refresh: string;
}
export interface ITokenState {
  isFetching: boolean,
  data: IToken,
}
