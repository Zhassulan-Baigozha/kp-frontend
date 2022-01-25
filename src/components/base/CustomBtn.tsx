/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react';
import { Button } from 'antd';
import { primaryColor } from 'src/constants/primaryColor';
import { CheckOutlined } from '@ant-design/icons';

interface ICustomBtn {
  onClick ?: ()=> void;
  children?: React.ReactNode
  disabled?: boolean;
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
            }}
        >
            {children}
        </Button>
    );
};

export const CustomCheckBtn: React.FC<ICustomBtn> = ({
    disabled = false,
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
                height: '30px'
            }}
        >
            <CheckOutlined style={{
                fontSize: '20px',
            }}/>
        </Button>
    );
};