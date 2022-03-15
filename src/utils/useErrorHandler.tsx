import { message, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { AuthReNew } from 'src/api/CustomAPI';
import { IRootState } from 'src/store';
import { setTokenData } from 'src/store/token/actions';

const { confirm } = Modal;

export const useErrorHandler = () => {
    const dispatch = useDispatch();
    const token = useSelector((state: IRootState) => state.token.data);
    const errorHandler = (err: unknown)=>{
        if (axios.isAxiosError(err))  {
            if (err?.response?.status === 401){
                confirm({
                    title: 'Ваша сессия истекла. Обновить сессию?',
                    icon: <ExclamationCircleOutlined />,
                    onOk() {
                        AuthReNew(token.access, {
                            refresh_token: token.refresh
                        }).then(res => {
                            dispatch(setTokenData({
                                access: 'Bearer ' + res.access_token,
                                refresh: res.refresh,
                            }));
                        });
                    },
                    onCancel() {
                        dispatch(setTokenData({
                            access: '',
                            refresh: '',
                        }));
                    },
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