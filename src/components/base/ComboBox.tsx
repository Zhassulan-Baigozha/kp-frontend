import * as React from 'react';
import { IComboBoxOption } from 'src/interfaces';
import { Button, Dropdown, Menu } from 'antd';


interface IComboBox {
  label?: string
  options: IComboBoxOption[]
  value: IComboBoxOption | null
  onChange?: (value: IComboBoxOption | null) => void
}

const ComboBox: React.FC<IComboBox> = ({
  label,
  onChange,
  options,
  value,
}) => {
  const menu = (
    <Menu>
      {options?.length > 0 && options.map(option =>(
        <Menu.Item key={option.id} onClick={() =>{onChange?.(option);}}>
          {option.label}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="bottomCenter">
      <Button style={{
        backgroundColor: '#f0f0f0', 
        marginBottom: '16px', 
        marginRight: '16px',
        borderRadius: '8px',
        width: '100%',
        textAlign: 'left',
      }}>
        {value?.label ?? label}
      </Button>
    </Dropdown>
  );
};

export default ComboBox;
