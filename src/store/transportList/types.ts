export interface ITransport {  
  is_empty: boolean,
  number: string,
  transport_type: string
}

export interface ITransportListState {
  isFetching: boolean,
  data: ITransport[],
}