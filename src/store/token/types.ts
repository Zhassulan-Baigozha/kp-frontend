export interface IToken {
    access: string;
    refresh: string;
}
export interface ITokenState {
    data: IToken,
}
