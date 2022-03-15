import * as React from 'react';
import { IComboBoxOption } from 'src/interfaces';
import { Select } from 'antd';

const { Option } = Select;
interface IComboBox {
    blockFullWidth?: boolean
    fullWidth?: string | undefined
    verticalAlign?: boolean
    label?: string
    options: IComboBoxOption[]
    placeholder ?: string
    value: IComboBoxOption | null
    onChange?: (value: IComboBoxOption | null) => void
    pr?: string | undefined
}

const ComboBox: React.FC<IComboBox> = ({
    blockFullWidth = false,
    fullWidth = '',
    verticalAlign = false,
    label,
    onChange,
    options,
    placeholder,
    value,
    pr = undefined,
}) => {
    function handleChange(value: any) {
        const selectedOption = options.filter(option => option.id === value);
        if (selectedOption.length === 1) {
            onChange?.(selectedOption[0]);
        }
    }
    return (
        <div style={{
            width: blockFullWidth? '100%': undefined,
            paddingRight: pr ? pr : undefined,
        }}>
            <div className="CustomTextField">
                {placeholder}
            </div>
            <Select
                style={{ 
                    width: fullWidth ?? '100%',
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
