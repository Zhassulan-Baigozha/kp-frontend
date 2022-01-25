
import React from 'react';

interface IInnerBlock {
children?: React.ReactNode
}

const InnerBlock:React.FC<IInnerBlock> = ({ 
    children
}) => {
    return (
        <div style={{ 
            border:'1px solid rgb(219, 219, 219)',
            borderRadius: '8px',
            padding: '16px',
        }}>
            {children}
        </div>
    );
};
export default InnerBlock;