import * as React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { useState } from 'react';

interface ICustomTextField {
  type   ?: string
  validationFn  ?: (value: string)=> boolean
  value ?: string
}

const CustomTextField: React.FC<ICustomTextField & JSX.IntrinsicAttributes & TextFieldProps> = ({
  validationFn, 
  value,
  ...params
}) => {
  const [errorField, setError] = useState(false);
  return (
    <TextField 
      error={errorField}
      id="outlined-basic-1" 
      variant="outlined" 
      size="small" 
      style={{
        backgroundColor: '#f0f0f0', 
        width: '300px',
      }}
      value={value}
      onChange={(email:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        console.log(email);
        if (validationFn){
          const validateResult = validationFn?.(email.target.value);
          console.log(validateResult);
          setError(!validateResult);
        }
      }}
      {...params}
    />
  );
};

export default CustomTextField;