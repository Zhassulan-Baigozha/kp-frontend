import { Button } from '@mui/material';
import React from 'react';

interface IButton {
  onClick?: () => void;
  children?: React.ReactNode;
  text?: string;
}

export const OutlinedButton:React.FC<IButton> = ({ onClick, children, text }) => (
  <Button variant="outlined" onClick={onClick} style={{height: '40px'}}>
    {text}
    {children}
  </Button>
);

export const ContainedButton:React.FC<IButton> = ({ onClick, children, text }) => (
  <Button variant="contained" onClick={onClick} style={{height: '40px'}}>
    {text}
    {children}
  </Button>
);

export const TextButton:React.FC<IButton> = ({ onClick, children, text }) => (
  <Button variant="text" onClick={onClick} style={{height: '40px'}}>
    {text}
    {children}
  </Button>
);
