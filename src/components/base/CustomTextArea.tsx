import * as React from 'react';
import TextArea, { TextAreaProps } from 'antd/lib/input/TextArea';

interface ICustomTextArea {
    type ?: string
    value ?: string
    placeholder ?: string
    fullWidth?: string | undefined
    error ?: boolean
    disabled ?: boolean
}

const CustomTextArea: React.FC<ICustomTextArea & TextAreaProps> = ({
    value,
    onChange,
    placeholder,
    fullWidth = '',
    error = false, 
    disabled = false,
}) => {
    return (
        <div style={{width: '100%'}}>
            <div className="CustomTextField">
                {placeholder}
            </div>
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
                    width: fullWidth ?? '100%',
                }}
            />
        </div>
    );
};

export default CustomTextArea;