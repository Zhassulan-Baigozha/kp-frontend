import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { I_KP_ByTypes } from '../../mocks/KPByTypes';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    padding: '4px',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: '4px',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface IKPByTypesTable {
  M_STORE: I_KP_ByTypes[]
}

const KPByTypesTable: React.FC<IKPByTypesTable> = ({
  M_STORE
}) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">№</StyledTableCell>
            <StyledTableCell align="center">Наименование <br />к\п на складе</StyledTableCell>
            <StyledTableCell align="center">Общий статус</StyledTableCell>
            <StyledTableCell align="center">Количество</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {M_STORE.map((row :I_KP_ByTypes, idx: number) => (
            <StyledTableRow key={idx}>
              <StyledTableCell align="center">{row.id}</StyledTableCell>
              <StyledTableCell align="center">{row.name}</StyledTableCell>
              <StyledTableCell align="center">{row.status}</StyledTableCell>
              <StyledTableCell align="center">{row.amount}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default KPByTypesTable;