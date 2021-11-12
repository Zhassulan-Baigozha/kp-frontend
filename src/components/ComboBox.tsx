import * as React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export interface IComboBoxOption {
  label: string
  id: number
}
interface IComboBox {
  label?: string
  options: IComboBoxOption[]
  setValue:(value:IComboBoxOption | null)=> void
  value: IComboBoxOption | null
  onChange: (value: IComboBoxOption | null) => void
}

const ComboBox: React.FC<IComboBox> = ({
  label,
  onChange,
  options,
  setValue,
  value,
}) => {
  
  const renderInput = (params: JSX.IntrinsicAttributes & TextFieldProps) => {
    return (
      <TextField 
        id="outlined-basic-1" 
        variant="outlined" 
        style={{
          backgroundColor: '#f0f0f0'
        }}
        label={label}
        {...params}
      />
    );
  };

  return (
    <Autocomplete
      disablePortal
      size="small" 
      id="combo-box-demo"
      options={options}
      value={value}
      onChange={(event: any, newValue: IComboBoxOption | null) => {
        onChange?.(newValue);
        setValue(newValue);
      }}
      sx={{ width: 300 }}
      renderInput={renderInput}
    />
  );
};

export default ComboBox;
