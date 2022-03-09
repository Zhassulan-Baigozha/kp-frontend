import { message } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { AuthReNew } from 'src/api/CustomAPI';
import { IRootState } from 'src/store';

export const useErrorHandler = () => {
    const token = useSelector((state: IRootState) => state.token.data);
    const errorHandler = (err: unknown)=>{
        if (axios.isAxiosError(err))  {
            if (err?.response?.status === 401){
                message.error('Переавторизуйтесь');
                AuthReNew(token.access, {
                    refresh_token: token.refresh
                });
            } else if (err?.response?.status === 500 && err?.response?.data.code === 'TTS-004'){
                message.error('По данному складу нет трансферов');
            } else {
                message.error(err?.response?.data.message);
                message.error(err?.response?.data.system_message);
            }
        } else {
            console.error('err', err);
        }
    };
    return { errorHandler };
};