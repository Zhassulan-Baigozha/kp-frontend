import { GridColDef } from '@mui/x-data-grid';
import { dateAtCell } from './dateAtCell';
import { renderCellExpand } from './GridCellExpend';
import { wagonCell } from './wagonCell';

export const GridColumns:GridColDef[] = [
  { 
    field: 'id', 
    headerName: '№', 
    width: 90, 
    description: 'Номер поля в таблице', 
    editable: false, 
    renderCell: renderCellExpand,
  }, 
  { 
    field: 'updated_at', 
    headerName: 'Дата поступления', 
    width: 200, 
    description: 'Дата поступления', 
    editable: true, 
    renderCell: dateAtCell,
    type: 'date',
  }, 
  { 
    field: 'wagon', 
    headerName: '№ вагона', 
    width: 140, 
    description: 'Номер вагона, из под которого выкачена КП', 
    editable: true, 
    renderCell: wagonCell,
  }, 
  { 
    field: 'type', headerName: 'Тип', width: 110,description: 'Номер поля', editable: true, renderCell: renderCellExpand,
  }, 
  { 
    field: 'wheelPairNum', 
    headerName: '№ КП', 
    width: 120,
    description: 'Номер Колесной пары', 
    editable: true, 
    renderCell: renderCellExpand,
  }, 
  { 
    field: 'manufacturer_code', 
    headerName: 'Клеймо произ.', 
    width: 180,
    description: 'Клеймо завода-изготовителя', 
    editable: true, 
    renderCell: renderCellExpand,
  }, 
  { 
    field: 'created_at', 
    headerName: 'Год изг.', 
    width: 160, 
    description: 'Год изготовления', 
    editable: true, 
    renderCell: dateAtCell,
    type: 'date',
  }, 
  { 
    field: 'CKKLeft', 
    headerName: 'ЦКК лев.', 
    width: 140, 
    description: 'ЦКК левая', 
    editable: true, 
    renderCell: renderCellExpand,
    type: 'string',
  }, 
  { 
    field: 'CKKRight', 
    headerName: 'ЦКК прав.', 
    width: 150, description: 
    'ЦКК правая', 
    editable: true, 
    renderCell: renderCellExpand,
    type: 'string',
  }, 
  { 
    field: 'rimLeft', 
    headerName: 'ТО лев.', 
    width: 130, 
    description: 'Толщина обода левая', 
    editable: true, 
    renderCell: renderCellExpand,
    type: 'string',
  }, 
  { 
    field: 'rimRight', 
    headerName: 'ТО прав.', 
    width: 140, 
    description: 'Толщина обода правая', 
    editable: true, 
    renderCell: renderCellExpand,
    type: 'string',
  }, 
  { 
    field: 'flangeLeft', 
    headerName: 'ТГ лев.', 
    width: 130, 
    description: 
    'Толщина гребня левая', 
    editable: true, 
    renderCell: renderCellExpand,
    type: 'string',
  }, 
  { 
    field: 'flangeRight', 
    headerName: 'ТГ прав.', 
    width: 140, 
    description: 'Толщина гребня правая', 
    editable: true, 
    renderCell: renderCellExpand,
    type: 'string',
  }, 
  { 
    field: 'wheelPairType', 
    headerName: 'Вид КП', 
    width: 130, 
    description: 'Вид колесной пары', 
    editable: true, 
    renderCell: renderCellExpand,
    type: 'singleSelect',
    valueOptions: ['1 вид', '2 вид', '3 вид'],
  },
  { 
    field: 'note', 
    headerName: 'Примечание', 
    width: 200, 
    description: 'Примечание', 
    sortable: false, 
    editable: true, 
    renderCell: renderCellExpand,
  },
  // {
  //   field: 'actions',
  //   type: 'actions',
  //   width: 80,
  //   getActions: (params: { id: GridRowId; }) => (
  //     <GridActionsCellItem
  //       icon={<DeleteIcon />}
  //       label="Delete"
  //       onClick={deleteUser(params.id)}
  //     />,
  //   ),
  // },
];
