import React, { useEffect, useState } from 'react';
import { SIGN_IN_ACTION, Pagination } from './pages';
import CustomHeader from 'src/components/CustomHeader';
import { useSelector } from 'react-redux';
import { IRootState } from 'src/store';
import './Main.css';
import { Layout } from 'antd';

const Main: React.FC = () => {
    const token = useSelector((state: IRootState) => state.token.data);
    const [currentPage, switchPage] = useState<string>('');

    useEffect(() => {
        if (currentPage!== SIGN_IN_ACTION && !(token.access.length > 0)) {
            switchPage(SIGN_IN_ACTION);
        }
    },[currentPage, token]);

    return (
        <>
            <Layout>
                <CustomHeader currentPage={currentPage} switchPage={switchPage}/>
            </Layout>
            <Pagination 
                currentPage={currentPage} 
                switchPage={switchPage}
            />
        </>
    );
};

export default Main;
