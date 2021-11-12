import React from 'react';
import { IProps } from '../interfaces';
import { useTheme } from '@mui/material/styles';
import { getPageTitle, ADMINISTRATION, WAREHOUSE_ACTION, DASHBOARD_ACTION, SIGN_IN_ACTION, PROFILE } from '../constants/pages';
import { GetUsr } from '../api/CustomAPI';
import { Button, Menu, MenuItem } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import HomeMaxIcon from '@mui/icons-material/HomeMax';

interface ICustomHeader extends IProps {
  currentPage: string
  switchPage: (value: string) => void
  
}
const CustomHeader: React.FC<ICustomHeader> = ({
  currentPage,
  switchPage,
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div style={{
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
                <img src={'http://www.ttservice.kz/images/logo.png'} alt="Logo" height="74px"/>
              </td>
              <td style={{
                textAlign: 'center',
                fontFamily: 'Roboto',
                fontSize: '36px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: '42px',
                opacity: 0.5,
                color: theme.palette.primary.main,
                width: '33%',
              }}>{getPageTitle(currentPage)}</td>
              <td style={{textAlign: 'right', width: '34%'}}>
                <div>
                  <Button
                    id="basic-button"
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={()=>{
                      switchPage(WAREHOUSE_ACTION);
                    }}
                  >
                    <HomeIcon color="primary" className="HomeIcon" />
                  </Button>
                  <Button
                    id="basic-button"
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={()=>{
                      switchPage(DASHBOARD_ACTION);
                    }}
                  >
                    <HomeMaxIcon color="primary" className="SettingsIcon" />
                  </Button>
                  <div style={{
                    display: 'inline',
                  }}>
                    <Button
                      id="basic-button"
                      aria-controls="basic-menu"
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={handleClick}
                    >
                      <PersonIcon 
                        color="primary" 
                        className="PersonIcon"
                      />
                    </Button>
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
                        
                        GetUsr().then((res) => {
                          console.log('GetUsr res   = ', res);
                        }).catch((err) => {
                          console.log('GetUsr error = ', err);
                        });

                        // GetRoles().then((res:IGetRolesItem[]) => {
                        //   console.log(res.map(item => ({
                        //     label: item.display_name,
                        //     id: item.id
                        //   })));
                        // });
                      }}>Личный кабинет</MenuItem>
                      <MenuItem onClick={()=>{
                        handleClose();
                        switchPage(ADMINISTRATION);
                      }}>Администрирование</MenuItem>
                      <MenuItem onClick={()=>{
                        handleClose();
                        switchPage(ADMINISTRATION);
                      }}>Выход</MenuItem>
                    </Menu>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CustomHeader;