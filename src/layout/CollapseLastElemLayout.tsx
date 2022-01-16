import React from 'react';

interface ICollapseLastElemLayout {
  children?: React.ReactNode
}

const CollapseLastElemLayout:React.FC<ICollapseLastElemLayout> = ({ 
  children
}) => {
  return (
    <div style={{ padding: '8px 16px 8px 16px'}}>
      {children}
    </div>
  )
};
export default CollapseLastElemLayout;