import * as React from 'react';
import { Input, InputProps } from 'antd';

interface ICustomTextField {
    type   ?: string
    value ?: string
    placeholder ?: string
    fullWidth ?: boolean
    error ?: boolean
    disabled ?: boolean
    pr ?: boolean
}

const CustomTextField: React.FC<ICustomTextField & InputProps> = ({
    value,
    onChange,
    placeholder,
    fullWidth = false,
    error = false, 
    disabled = false, 
    pr = false, 
}) => {
    return (
        <div style={{width: '100%', paddingRight: pr ? '16px': undefined}}>
            <div className="CustomTextField">
                {placeholder}
            </div>
            <Input
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                disabled={disabled}
                style={{
                    backgroundColor: '#f0f0f0', 
                    marginBottom: '16px', 
                    marginRight: '16px', 
                    borderRadius: '8px',
                    width: fullWidth ? '100%': '300px',
                }}
            />
        </div>
    );
};

export default CustomTextField;