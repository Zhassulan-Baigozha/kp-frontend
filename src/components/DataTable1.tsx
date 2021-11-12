import * as React from 'react';
import { DataGrid, GridOverlay } from '@mui/x-data-grid';
import { LinearProgress } from '@mui/material';
import { useState } from 'react';
import { IGridData } from '../api/CustomAPIModel';
import { GridColumns } from '../constants/MainDataGrid/GridColumns';

interface IDataTable1 {
  ws: IGridData[]
}

const DataTable1: React.FC<IDataTable1> = ({
  ws,
}) => {
  const CustomLoadingOverlay = ()=> (
    <GridOverlay>
      <div style={{ position: 'absolute', top: 0, width: '100%' }}>
        <LinearProgress />
      </div>
    </GridOverlay>
  );
  const [currentPage, setCurrentPage] = useState<number>(0);

  return (
    <>
      <div style={{ height: 400, width: '100%'}}>
        <DataGrid
          editMode="row"
          rowHeight={25} 
          rows={ws}
          columns={GridColumns}
          onPageChange={setCurrentPage}
          checkboxSelection
          page={currentPage}
          pageSize={10}
          components={{
            LoadingOverlay: CustomLoadingOverlay,
          }}
          disableSelectionOnClick
          loading={false}
          localeText={{
            checkboxSelectionHeaderName: 'Выбор флажка',
            columnMenuShowColumns: 'Показать колонны',
            columnMenuFilter: 'Фильтр',
            columnMenuHideColumn: 'Скрыть',
            columnMenuUnsort: 'Отменить сортировку',
            columnMenuSortAsc: 'Сортировка по возрастанию',
            columnMenuSortDesc: 'Сортировка по убыванию',
            filterPanelOperators: 'Оператор',
            filterPanelColumns: 'Колонна',
            filterPanelInputLabel: 'Значение',
            filterOperatorContains: 'содержит',
            filterOperatorEquals: 'равно',
            filterOperatorStartsWith: 'начинается с',
            filterOperatorEndsWith: 'заканчивается на',
            filterOperatorIsEmpty: 'пустой',
            filterOperatorIsNotEmpty: 'не пустой',
            filterPanelInputPlaceholder:  'значение',
            columnsPanelTextFieldLabel: 'Найти колонну',
            columnsPanelTextFieldPlaceholder: 'Введите поле',
            columnsPanelShowAllButton: 'Показать все',
            columnsPanelHideAllButton: 'Скрыть все',
            footerRowSelected: (count) =>
              count === 1
                ? `${count.toLocaleString()} строки выбраны`
                : (count > 1 && count < 5) ? `${count.toLocaleString()} строка выбрана`
                  : `${count.toLocaleString()} строк выбраны`,
          }}
        />
      </div>
    </>
  );
};

export default DataTable1;