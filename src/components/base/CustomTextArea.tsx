import * as React from 'react';
import TextArea, { TextAreaProps } from 'antd/lib/input/TextArea';

interface ICustomTextArea {
  type ?: string
  value ?: string
  placeholder ?: string
  fullWidth ?: boolean
  error ?: boolean
  disabled ?: boolean
}

const CustomTextArea: React.FC<ICustomTextArea & TextAreaProps> = ({
    value,
    onChange,
    placeholder,
    fullWidth = false,
    error = false, 
    disabled = false, 
}) => {
    return (
        <TextArea 
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
    );
};

export default CustomTextArea;