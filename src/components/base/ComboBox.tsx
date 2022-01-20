import * as React from 'react';
import { IComboBoxOption } from 'src/interfaces';
import { Select } from 'antd';

const { Option } = Select;
interface IComboBox {
  fullWidth?: boolean
  label?: string
  options: IComboBoxOption[]
  value: IComboBoxOption | null
  onChange?: (value: IComboBoxOption | null) => void
}

const ComboBox: React.FC<IComboBox> = ({
  fullWidth = true,
  label,
  onChange,
  options,
  value,
}) => {
  function handleChange(value: any) {
    const selectedOption = options.filter(option => option.id === value);
    if (selectedOption.length === 1) {
      onChange?.(selectedOption[0]);
    }
  }
  return (
    <Select
      style={{ 
        width: fullWidth ? '100%': '300px',
        marginBottom: '16px',
        marginRight: '16px',
        textAlign: 'left',
      }} onChange={handleChange}
      value={value?.label ?? label}
    >
      {options?.length > 0 && options.map(option =>(
        <Option value={option.id} key={option.id} >
          {option.label}
        </Option>
      ))}
    </Select>
  );
};

export default ComboBox;
