export interface IRoles {
  id: number,
  label: string,
}

export interface IRolesState {
  isFetching: boolean,
  data: IRoles[],
}
