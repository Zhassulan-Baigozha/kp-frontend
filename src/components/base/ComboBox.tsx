import * as React from 'react';
import { IComboBoxOption } from 'src/interfaces';
import { Select } from 'antd';

const { Option } = Select;
interface IComboBox {
    fullWidth?: boolean
    verticalAlign?: boolean
    label?: string
    options: IComboBoxOption[]
    placeholder ?: string
    value: IComboBoxOption | null
    onChange?: (value: IComboBoxOption | null) => void
}

const ComboBox: React.FC<IComboBox> = ({
    fullWidth = true,
    verticalAlign = false,
    label,
    onChange,
    options,
    placeholder,
    value,
}) => {
    function handleChange(value: any) {
        const selectedOption = options.filter(option => option.id === value);
        if (selectedOption.length === 1) {
            onChange?.(selectedOption[0]);
        }
    }
    return (
        <div style={{width: '100%'}}>
            <div className="CustomTextField">
                {placeholder}
            </div>
            <Select
                style={{ 
                    width: fullWidth ? '100%': '300px',
                    marginBottom: '16px',
                    marginRight: '16px',
                    textAlign: 'left',
                    verticalAlign: verticalAlign ? 'top': undefined,
                }} onChange={handleChange}
                value={value?.label ?? label}
            >
                {options?.length > 0 && options.map(option =>(
                    <Option value={option.id} key={option.id} >
                        {option.label}
                    </Option>
                ))}
            </Select>
        </div>
        
    );
};

export default ComboBox;
