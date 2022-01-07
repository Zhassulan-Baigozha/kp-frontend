import * as React from 'react';
import { Input, InputProps } from 'antd';

interface ICustomTextField {
  type   ?: string
  value ?: string
  placeholder ?: string
}

const CustomTextField: React.FC<ICustomTextField & InputProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <Input placeholder={placeholder} onChange={onChange} value={value} style={{
      backgroundColor: '#f0f0f0', 
      width: '300px',
      marginBottom: '16px', 
      marginRight: '16px',
      borderRadius: '8px',
    }} />
    // <TextField 
    //   error={params.error}
    //   id="outlined-basic-1" 
    //   variant="outlined" 
    //   size="small" 
    //   
    //   value={value}
    //   onChange={(value:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    //     onTextChange?.(value.target.value);
    //   }}
    //   
    // />
  );
};

export default CustomTextField;