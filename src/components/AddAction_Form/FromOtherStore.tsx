import React from 'react';
import { useSelector } from 'react-redux';
import { IWSListTableAddPage } from 'src/interfaces';
import { IRootState } from 'src/store';
import ComboBox from '../base/ComboBox';
import CustomTextArea from '../base/CustomTextArea';
import CustomTextField from '../base/CustomTextField';

interface IFromOtherStore {
    selectedWheelset: IWSListTableAddPage
    selectWheelset: (value: IWSListTableAddPage)=> void
}

const FromOtherStore: React.FC<IFromOtherStore> = ({
    selectedWheelset,
    selectWheelset,
}) => {
    const statuses = useSelector((state: IRootState) => state.data.allStatuses);
    const statusesList = statuses.map((item) =>({id: item.code, label: item.name}));
    return (
        <>
            {selectedWheelset?.wheels && selectedWheelset.wheels?.length > 1 && (
                <div style={{display: 'flex'}}>
                    <CustomTextField 
                        fullWidth={true}
                        pr={true}
                        placeholder={'Толщина гребня №1 ЦКК'}
                        onChange={(value) => {
                            if (
                                parseFloat(value.target.value) 
                                && parseFloat(value.target.value) < 100
                                && !isNaN(+value.target.value)
                                && selectedWheelset?.wheels
                                && selectedWheelset.wheels?.length > 1
                            ) {
                                selectWheelset({
                                    ...selectedWheelset,
                                    wheels: [{
                                        ...selectedWheelset.wheels[0],
                                        flange: +value.target.value,
                                    }, selectedWheelset.wheels[1]]
                                });
                            }
                        }}
                        value={
                            selectedWheelset?.wheels && selectedWheelset.wheels?.length > 1
                                ? selectedWheelset.wheels[0].flange.toString()
                                : ''
                        }
                    />
                    <CustomTextField 
                        fullWidth={true}
                        placeholder={'Толщина обода №1 ЦКК'}
                        onChange={(value) => {
                            if (
                                parseFloat(value.target.value) 
                                && parseFloat(value.target.value) < 100
                                && !isNaN(+value.target.value)
                                && selectedWheelset?.wheels
                                && selectedWheelset.wheels?.length > 1
                            ) {
                                selectWheelset({
                                    ...selectedWheelset,
                                    wheels: [{
                                        ...selectedWheelset.wheels[0],
                                        rim: +value.target.value,
                                    }, selectedWheelset.wheels[1]]
                                });
                            }
                        }}
                        value={
                            selectedWheelset?.wheels && selectedWheelset.wheels?.length > 1
                                ? selectedWheelset.wheels[0].rim.toString()
                                : ''
                        }
                    />
                </div>
            )}
            {selectedWheelset?.wheels && selectedWheelset.wheels?.length ===2 && (
                <div style={{display: 'flex'}}>
                    <CustomTextField 
                        fullWidth={true}
                        pr={true}
                        placeholder={'Толщина гребня №2 ЦКК'}
                        onChange={(value) => {
                            if (
                                parseFloat(value.target.value) 
                                && parseFloat(value.target.value) < 100
                                && !isNaN(+value.target.value)
                                && selectedWheelset?.wheels
                                && selectedWheelset.wheels?.length === 2
                            ) {
                                selectWheelset({
                                    ...selectedWheelset,
                                    wheels: [selectedWheelset.wheels[0], {
                                        ...selectedWheelset.wheels[1],
                                        flange: +value.target.value,
                                    }]
                                });
                            }
                        }}
                        value={
                            selectedWheelset?.wheels && selectedWheelset.wheels?.length === 2
                                ? selectedWheelset.wheels[1].flange.toString()
                                : ''
                        }
                    />
                    <CustomTextField 
                        fullWidth={true}
                        placeholder={'Толщина обода №2 ЦКК'}
                        onChange={(value) => {
                            if (
                                parseFloat(value.target.value) 
                                && parseFloat(value.target.value) < 100
                                && !isNaN(+value.target.value)
                                && selectedWheelset?.wheels
                                && selectedWheelset.wheels?.length === 2
                            ) {
                                selectWheelset({
                                    ...selectedWheelset,
                                    wheels: [selectedWheelset.wheels[0], {
                                        ...selectedWheelset.wheels[1],
                                        rim: +value.target.value,
                                    }, ]
                                });
                            }
                        }}
                        value={
                            selectedWheelset?.wheels && selectedWheelset.wheels?.length === 2
                                ? selectedWheelset.wheels[1].rim.toString()
                                : ''
                        }
                    />
                </div>
            )}
            <div style={{ display: 'flex' }}>
                <ComboBox 
                    label={'Выберите статус'}
                    blockFullWidth={true}
                    fullWidth={'100%'}
                    pr={'16px'}
                    placeholder={'Cтатус'}
                    options={statusesList}
                    value={selectedWheelset.status}
                    onChange={(value) => {
                        if (value?.id && (statusesList.filter(item => item.id === value.id).length === 1)){
                            selectWheelset({...selectedWheelset, status: statusesList.filter(item => item.id === value.id)[0]});
                        }
                    }}
                />
                <CustomTextArea 
                    placeholder={'Примечание'}
                    onChange={(value)=>{
                        selectWheelset({...selectedWheelset, description: value.target.value});
                    }}
                    value={selectedWheelset.description}
                />
            </div>
        </>
    );
};

export default FromOtherStore;