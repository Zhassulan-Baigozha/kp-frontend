import React from 'react';

interface IBackgroundPaper {
  children: React.ReactNode
}

const BackgroundPaper: React.FC<IBackgroundPaper> = ({
    children,
}) => {
    return (
        <>
            <div style={{
                width: '1120px',
                margin: '0 auto',
                paddingTop: '32px',
                top: '80px',
                position: 'relative'
            }}>
                <div style={{
                    padding: '32px',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                }}>
                    {children}
                </div>
            </div>
        </>
    );
};

export default BackgroundPaper;
