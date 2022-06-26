import React from 'react';

interface ICollapseElemLayout {
    children?: React.ReactNode
}

const CollapseElemLayout:React.FC<ICollapseElemLayout> = ({ 
    children
}) => {
    return (
        <div style={{ padding: '8px 16px 0px 16px'}}>
            {children}
        </div>
    );
};
export default CollapseElemLayout;