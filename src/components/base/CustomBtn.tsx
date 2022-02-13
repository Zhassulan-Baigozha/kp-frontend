import * as React from 'react';
import { Button } from 'antd';
import { primaryColor } from 'src/constants/primaryColor';
import { CheckOutlined, PlusOutlined } from '@ant-design/icons';

interface ICustomBtn {
    onClick ?: ()=> void;
    children?: React.ReactNode
    disabled?: boolean;
    PlusOutlinedIcon?: boolean;
    mr?: boolean;
}

export const CustomBlockBtn: React.FC<ICustomBtn> = ({
    children = '',
    disabled = false,
    onClick,
}) => {
    return (
        <Button 
            onClick={onClick} 
            block 
            disabled={disabled}
            style={{ 
                backgroundColor: primaryColor, 
                color: '#fff',
                borderRadius: '8px',
                height: '40px',
                fontWeight: '500',
                marginRight: '16px',
            }}
        >
            {children}
        </Button>
    );
};

export const CustomCheckBtn: React.FC<ICustomBtn> = ({
    disabled = false,
    mr = true,
    PlusOutlinedIcon = false,
    onClick,
}) => {
    return (
        <Button 
            onClick={onClick} 
            block 
            disabled={disabled}
            style={{ 
                color: '#fff',
                borderRadius: '8px',
                fontWeight: '500',
                width: '60px',
                height: '30px',
                marginRight: mr ? '16px': undefined,
            }}
        >
            {PlusOutlinedIcon ? (
                <PlusOutlined style={{
                    fontSize: '20px',
                }}/>
            ): (
                <CheckOutlined style={{
                    fontSize: '20px',
                }}/>
            )}
        </Button>
    );
};
export const CustomBtn: React.FC<ICustomBtn> = ({
    children = '',
    disabled = false,
    mr = true,
    onClick,
}) => {
    return (
        <Button 
            onClick={onClick} 
            block 
            disabled={disabled}
            style={{ 
                color: '#000',
                borderRadius: '8px',
                fontWeight: 400,
                width: 'auto',
                height: '30px',
                marginRight: mr ? '16px': undefined,
            }}
        >
            {children}
        </Button>
    );
};