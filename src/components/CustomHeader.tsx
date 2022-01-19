import React from 'react';
import { IComboBoxOption, IProps } from 'src/interfaces';
// import { useTheme } from '@mui/material/styles';
import { 
  getPageTitle, 
  ADMINISTRATION, 
  WAREHOUSE_ACTION, 
  DASHBOARD_ACTION, 
  SIGN_IN_ACTION, 
  PROFILE 
} from 'src/layout/pages';
// import PersonIcon from '@mui/icons-material/Person';
// import { GetUsr } from 'src/api/CustomAPI';
// import HomeIcon from '@mui/icons-material/Home';
// import HomeMaxIcon from '@mui/icons-material/HomeMax';
// import { Button, Menu, MenuItem } from '@mui/material';
import { useSelector } from 'react-redux';
import { IRootState } from 'src/store';
import { primaryColor } from 'src/constants/primaryColor';
import { Header } from 'antd/lib/layout/layout';
import { Menu, Dropdown, Button, Space } from 'antd';
import { FileTextFilled, HomeFilled, UserOutlined } from '@ant-design/icons';
import { GetUsr } from 'src/api/CustomAPI';
import ComboBox from './base/ComboBox';

interface ICustomHeader extends IProps {
  currentPage: string
  switchPage: (value: string) => void
  
}
const CustomHeader: React.FC<ICustomHeader> = ({
  currentPage,
  switchPage,
}) => {
  const token = useSelector((state: IRootState) => state.token.data);
  const warehouse = useSelector((state: IRootState) => state.warehouse.data);
  const warehouseList = warehouse.map((item) =>({id: item.id, label: item.name}));
  const [selectedWarehouse, selectWarehouse] = React.useState<IComboBoxOption | null>(null);
  const handleClose = () => {};
  const menu = (
    <Menu>
      <Menu.Item key={'PROFILE'} onClick={()=>{
        handleClose();
        switchPage(PROFILE);
        GetUsr(token.access).then((res) => {
          console.log('GetUsr res   = ', res);
        }).catch((err) => {
          console.error('GetUsr error = ', err);
        });
      }}>
        Личный кабинет
      </Menu.Item>
      <Menu.Item key={'ADMINISTRATION'} onClick={()=>{
        handleClose();
        switchPage(ADMINISTRATION);
      }}>
        Администрирование
      </Menu.Item>
      <Menu.Item key={'SIGN_IN_ACTION'} onClick={()=>{
        handleClose();
        localStorage.removeItem('auth_user_token');
        switchPage(SIGN_IN_ACTION);
      }}>
        Выход
      </Menu.Item>
    </Menu>
  );
  
  return (
    <Header style={{ 
      backgroundColor: '#fff',
      height: '80px',
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      position: 'fixed',
      width: '100%',
      zIndex: 2,
    }}>
        <table style={{height: '100%', width: '100%', padding: '0px 16px', }}>
          <tbody>
            <tr>
              <td style={{textAlign: 'left', width: '33%', padding: 0}} onClick={()=>{
                switchPage(WAREHOUSE_ACTION);
              }}>
                logo
              </td>
              <td style={{
                textAlign: 'center',
                fontFamily: 'Roboto',
                fontSize: '36px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: '42px',
                opacity: 0.5,
                color: primaryColor,
                width: '33%',
              }}>{getPageTitle(currentPage)}</td>
              <td style={{textAlign: 'right', width: '34%'}}>
                <div style={{display: '-webkit-inline-box'}}>
                  <div style={{marginRight: '16px'}}>
                    <ComboBox 
                      label={'Выберите Склад'} 
                      options={warehouseList}
                      value={selectedWarehouse}
                      onChange={(value) => {
                        selectWarehouse(value);
                      }}
                    />
                  </div>
                  <Button 
                    shape="circle" 
                    icon={<HomeFilled />} 
                    onClick={()=>{
                      switchPage(WAREHOUSE_ACTION);
                    }}
                    style={{
                      marginRight: '16px',
                    }}
                  />
                  <Button 
                    shape="circle" 
                    icon={<FileTextFilled />}  
                    onClick={()=>{
                      switchPage(DASHBOARD_ACTION);
                    }}
                    style={{
                      marginRight: '16px',
                    }}
                  />
                  <div style={{
                    display: 'inline',
                  }}>
                    <Dropdown overlay={menu} placement="bottomRight">
                      <Button 
                        shape="circle" 
                        icon={<UserOutlined />}  
                      />
                    </Dropdown>
                    {/* 
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <MenuItem onClick={()=>{
                        handleClose();
                        switchPage(PROFILE);

                        GetUsr(token.access).then((res) => {
                          console.log('GetUsr res   = ', res);
                        }).catch((err) => {
                          console.error('GetUsr error = ', err);
                        });

                      }}>Личный кабинет</MenuItem>

                      <MenuItem onClick={()=>{
                        handleClose();
                        switchPage(ADMINISTRATION);
                      }}>Администрирование</MenuItem>
                      <MenuItem onClick={()=>{
                        handleClose();
                        localStorage.removeItem('auth_user_token');
                        switchPage(SIGN_IN_ACTION);
                      }}>Выход</MenuItem>
                    </Menu> */}
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
    </Header>
  );
};

export default CustomHeader;