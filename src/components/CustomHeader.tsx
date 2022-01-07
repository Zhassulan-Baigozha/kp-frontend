import React from 'react';
import { IProps } from 'src/interfaces';
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
import { primaryColor } from 'src/constants';
import { Header } from 'antd/lib/layout/layout';
import { Menu, Dropdown, Button, Space } from 'antd';
import { FileTextFilled, HomeFilled, UserOutlined } from '@ant-design/icons';
import { GetUsr } from 'src/api/CustomAPI';

interface ICustomHeader extends IProps {
  currentPage: string
  switchPage: (value: string) => void
  
}
const CustomHeader: React.FC<ICustomHeader> = ({
  currentPage,
  switchPage,
}) => {
  // const theme = useTheme();
  const token = useSelector((state: IRootState) => state.token.data);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const menu = (
    <Menu>
      <Menu.Item onClick={()=>{
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
      <Menu.Item onClick={()=>{
        handleClose();
        switchPage(ADMINISTRATION);
      }}>
        Администрирование
      </Menu.Item>
      <Menu.Item onClick={()=>{
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
                {/* <img src={'http://www.ttservice.kz/images/logo.png'} alt="Logo" height="74px"/> */}
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
                <div>
                  <Button 
                    shape="circle" 
                    icon={<HomeFilled />} 
                    onClick={()=>{
                      switchPage(WAREHOUSE_ACTION);
                      console.log('WAREHOUSE_ACTION', WAREHOUSE_ACTION);
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
                        onClick={handleClick}
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