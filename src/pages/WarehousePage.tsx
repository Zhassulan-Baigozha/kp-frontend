import React from 'react';
import { ADD_ACTION, INSTALL_ACTION, RELOCATION_ACTION, REPAIR_ACTION } from 'src/layout/pages';
import { Button } from 'antd';
import { ApartmentOutlined, DownloadOutlined, NodeExpandOutlined, PlusSquareOutlined } from '@ant-design/icons';
import WSTable from 'src/components/tables/WSTable';
import useConvertWs from 'src/hooks/useConvertWs';
import BackgroundPaper from 'src/layout/BackgroundPaper';
import { GetStatuses, GetTransportList } from 'src/api/CustomAPI';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'src/store';
import { sortStatuses } from 'src/utils/sortStatuses';
import { setAllStatusesList, setTransportList } from 'src/store/data/actions';
// import { OutlinedButton } from 'src/components/CustomButtons';
// import { AddIco, InstallIco, RelocationIco, RepairIco } from '../assets/svg';
interface IWarehousePage {
    switchPage: (value: string) => void
}

const WarehousePage: React.FC<IWarehousePage> = ({
    switchPage,
}) => {
    const { convertedWS } = useConvertWs();
    const token = useSelector((state: IRootState) => state.token.data);
    const dispatch = useDispatch();

    return (
        <BackgroundPaper>
            <div style={{marginBottom: '24px', textAlign: 'right'}}>
                <div style={{marginRight: '16px', display: 'inline-block'}}>
                    <Button 
                        className={'OutlinedBtn'} 
                        icon={<PlusSquareOutlined style={{fontSize: '20px', paddingTop: '0px'}}/>} 
                        onClick={()=>{switchPage(ADD_ACTION);}}
                        style={{ height: '40px'}}
                    >
                        <span className={'WarehouseBtnText'}>Добавить</span>
                    </Button>
                </div>

                <div style={{marginRight: '16px', display: 'inline-block'}}>
                    <Button 
                        className={'OutlinedBtn'} 
                        icon={<ApartmentOutlined style={{fontSize: '20px', paddingTop: '0px'}}/>} 
                        onClick={async ()=>{
                            const GetStatusesResponse = await GetStatuses(token.access);
                            dispatch(setAllStatusesList(GetStatusesResponse.sort(sortStatuses)));
                            switchPage(REPAIR_ACTION);
                        }}
                        style={{ height: '40px'}}
                    >
                        <span className={'WarehouseBtnText'}>Ремонт</span>
                    </Button>
                </div>

                <div style={{marginRight: '16px', display: 'inline-block'}}>
                    <Button 
                        className={'OutlinedBtn'} 
                        icon={<DownloadOutlined style={{fontSize: '20px', paddingTop: '0px'}}/>} 
                        onClick={()=>{switchPage(INSTALL_ACTION);}}
                        style={{ height: '40px'}}
                    >
                        <span className={'WarehouseBtnText'}>Установить</span>
                    </Button>
                </div>

                <div style={{marginRight: '16px', display: 'inline-block'}}>
                    <Button 
                        className={'OutlinedBtn'} 
                        icon={<NodeExpandOutlined style={{fontSize: '20px', paddingTop: '0px'}}/>} 
                        style={{ height: '40px'}}
                        onClick={async ()=>{
                            const GetTransportListResponse = await GetTransportList(token.access);
                            dispatch(setTransportList(GetTransportListResponse));
                            switchPage(RELOCATION_ACTION);
                        }}
                    >
                        <span className={'WarehouseBtnText'}>Перемещение</span>
                    </Button>
                </div>

            </div>
            <WSTable ws={convertedWS}/>
        </BackgroundPaper>
    //   <WSTable ws={sortedWS}/>
    );
};

export default WarehousePage;