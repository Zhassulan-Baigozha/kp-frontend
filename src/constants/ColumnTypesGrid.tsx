import * as React from 'react';
import { useState } from 'react';
import { DataGrid, GridEditRowsModel, GridOverlay } from '@mui/x-data-grid';

import { LinearProgress } from '@mui/material';

interface ICustomTable {
  columns: any
  rows: any
  setRows:(value: any) => void
}

const ColumnTypesGrid: React.FC<ICustomTable> = ({
  columns = [],
  rows = [],
  setRows,
}) => {

  const CustomLoadingOverlay = ()=> (
    <GridOverlay>
      <div style={{ position: 'absolute', top: 0, width: '100%' }}>
        <LinearProgress />
      </div>
    </GridOverlay>
  );
  const [currentPage, setCurrentPage] = useState<number>(0);
  const flattenObf  = (obj: any) => {
    const key = Object.keys(obj).length ? Object.keys(obj)[0] : null;
    const value = key ? obj[key] : null;
    return [key, value];
  };

  const handleEditRowsModelChange = React.useCallback((model: GridEditRowsModel) => {
    const [modelKey, modelValue] = flattenObf(model);
    const [fieldName, fieldValue] = modelKey ? flattenObf(modelValue): [null, null];
    if (modelKey && fieldName) {
      setRows(rows.map((row: any) =>{
        if (row?.id === +modelKey && fieldName in row && 'value' in fieldValue){
          row[fieldName] = fieldValue.value;
        }
        return row;
      }));
      
    }
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid 
        columns={columns} 
        rows={rows} 
        // editMode="row"
        rowHeight={25} 
        onEditRowsModelChange={handleEditRowsModelChange}
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
  );
};
export default ColumnTypesGrid;