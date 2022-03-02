import { message } from 'antd';
import axios, { AxiosError } from 'axios';
import { useSelector } from 'react-redux';
import { AuthReNew } from 'src/api/CustomAPI';
import { IRootState } from 'src/store';

interface IError extends AxiosError, Error {}

export const useErrorHandler = () => {
    const token = useSelector((state: IRootState) => state.token.data);
    const errorHandler = (err: IError)=>{
        if (axios.isAxiosError(err))  {
            if (err?.response?.status === 401){
                message.error('Переавторизуйтесь');
                AuthReNew(token.access, {
                    refresh_token: token.refresh
                });
            }
            message.error(err?.response?.data.message);
            message.error(err?.response?.data.system_message);
        } else {
            console.error('err', err);
        }
    };
    return { errorHandler };
};