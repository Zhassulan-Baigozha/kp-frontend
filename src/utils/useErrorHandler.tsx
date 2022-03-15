import { message } from 'antd';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { AuthReNew } from 'src/api/CustomAPI';
import { IRootState } from 'src/store';
import { setTokenData } from 'src/store/token/actions';

export const useErrorHandler = () => {
    const dispatch = useDispatch();
    const token = useSelector((state: IRootState) => state.token.data);
    const errorHandler = (err: unknown)=>{
        if (axios.isAxiosError(err))  {
            if (err?.response?.status === 401){
                AuthReNew(token.access, {
                    refresh_token: token.refresh
                }).then(res => {
                    dispatch(setTokenData({
                        access: 'Bearer ' + res.access_token,
                        refresh: res.refresh,
                    }));
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