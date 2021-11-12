import KPByTypesTable from '../components/KPByTypesTable/KPByTypesTable';
import ComboBox, { IComboBoxOption } from '../components/ComboBox';
import React, { useState } from 'react';
import { WarehouseList } from '../constants/WarehouseList';
import { IPages } from '../interfaces';
import BackgroundPaper from '../layout/BackgroundPaper';
import { M_STORE } from '../mocks/KPByTypes';

const DashboardPage: React.FC<IPages> = () => {
  const [typeOfAdding, setToggleTypeOfAdding] = useState<IComboBoxOption | null>(WarehouseList[0]);
  const [selectedKey, selectKey] = useState<string>('I_KP_Store_1');

  const handleChange = (value: IComboBoxOption | null) => {
    if (value?.id){
      selectKey('I_KP_Store_' + value?.id.toString());
    } else {
      selectKey('');
    }
  };

  return (
    <BackgroundPaper>
      <div style={{ marginBottom: '16px' }}>
        <ComboBox 
          label={'Выберите Склад'} 
          options={WarehouseList}
          value={typeOfAdding}
          onChange={handleChange}
          setValue={setToggleTypeOfAdding}
        />
      </div>
      {typeOfAdding?.id ? (
        <KPByTypesTable M_STORE={M_STORE[typeOfAdding?.id-1][selectedKey]}/>
      ):null}
    </BackgroundPaper>
  );
};

export default DashboardPage;