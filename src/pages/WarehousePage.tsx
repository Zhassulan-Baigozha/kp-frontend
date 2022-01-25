import React from 'react';
import { ADD_ACTION, INSTALL_ACTION, RELOCATION_ACTION, REPAIR_ACTION } from 'src/layout/pages';
import { IPages } from 'src/interfaces';
import { Button } from 'antd';
import { ApartmentOutlined, DownloadOutlined, NodeExpandOutlined, PlusSquareOutlined } from '@ant-design/icons';
import WSTable from 'src/components/WSTable';
import useConvertWs from 'src/hooks/useConvertWs';
import BackgroundPaper from 'src/layout/BackgroundPaper';
// import { OutlinedButton } from 'src/components/CustomButtons';
// import { AddIco, InstallIco, RelocationIco, RepairIco } from '../assets/svg';

const WarehousePage: React.FC<IPages> = ({
    switchPage,
}) => {
    const { convertedWS } = useConvertWs();

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
                        onClick={()=>{switchPage(REPAIR_ACTION);}}
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
                        onClick={()=>{switchPage(RELOCATION_ACTION);}}
                        style={{ height: '40px'}}
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