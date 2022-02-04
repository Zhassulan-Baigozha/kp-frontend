import * as React from 'react';
import { Input, InputProps } from 'antd';

interface ICustomPasswordField {
    type   ?: string
    value ?: string
    placeholder ?: string
}

const CustomPasswordField: React.FC<ICustomPasswordField & InputProps> = ({
    value,
    onChange,
    placeholder,
}) => {
    return (
        <Input.Password placeholder={placeholder} onChange={onChange} value={value} style={{
            backgroundColor: '#f0f0f0', 
            width: '300px',
            marginBottom: '16px', 
            marginRight: '16px',
            borderRadius: '8px',
        }} />
    );
};

export default CustomPasswordField;