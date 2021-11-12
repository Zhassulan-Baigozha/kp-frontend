import React from 'react';
import { GridActionsCellItem, GridRowId } from '@mui/x-data-grid';
import ColumnTypesGrid from '../../constants/ColumnTypesGrid';
import { GridColumns } from '../../constants/MainDataGrid/GridColumns';
import { GridRows } from '../../constants/MainDataGrid/GridRows';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
import { WAREHOUSE_ACTION } from '../../constants/pages';
import BackgroundPaper from '../../layout/BackgroundPaper';
import { AddIco } from '../../assets/svg';

interface IRepairAction {
  switchPage: (value: string) => void
}

const RepairAction: React.FC<IRepairAction> = ({switchPage}) => {
  const [rowsTable1, setRowsTable1] = React.useState(GridRows);
  const [rowsTable2, setRowsTable2] = React.useState([]);

  const replaceToTable2 = React.useCallback(
    (id: GridRowId) => () => {
      setTimeout(() => {
        // const buf = rowsTable1.filter((row) => row.id === id);
        // console.log(rowsTable1, rowsTable2, buf);
        // if (buf.length > 0) {
        //   setRowsTable2(rowsTable2.concat(buf));
        // }
        // setRowsTable1((prevRows) => prevRows.filter((row) => row.id !== id));
      });
    },
    [],
  );
  
  const columns = React.useMemo(
    () => GridColumns.concat([
      {
        field: 'actions',
        type: 'actions',
        width: 80,
        // getActions: (params: any) => [
          // <GridActionsCellItem
          //   icon={<AddIco />}
          //   label="Delete"
          //   onClick={replaceToTable2(params.id)}
          // />,
        // ],
      },
    ]),
    [replaceToTable2],
  );
  return (
    <BackgroundPaper>
      <div style={{
        paddingBottom: '16px',
      }}>
        <Button variant="outlined" style={{marginRight: '16px', border: 'none'}} onClick={()=>{switchPage(WAREHOUSE_ACTION);}}>
          <ArrowBackIcon />
        </Button>
      </div>
      <div style={{ height: 400, width: '100%' }}>
        <ColumnTypesGrid columns={columns} rows={rowsTable1} setRows={()=>{}}/>
      </div>
      <div style={{ height: 400, width: '100%', marginTop: ((rowsTable2.length + 1)*40).toString() + 'px', }}>
        <ColumnTypesGrid columns={columns} rows={rowsTable2} setRows={()=>{}}/>
      </div>
    </BackgroundPaper>
  );
};

export default RepairAction;