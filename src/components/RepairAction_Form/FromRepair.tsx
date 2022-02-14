import React from 'react';
import { IWSListTable } from 'src/interfaces';
import CustomTextArea from '../base/CustomTextArea';
import CustomTextField from '../base/CustomTextField';

interface IFromRepair {
    selectedWheelset: IWSListTable
    selectWheelset: (value: IWSListTable)=> void
}

const FromRepair: React.FC<IFromRepair> = ({
    selectedWheelset,
    selectWheelset,
}) => {
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
                <CustomTextField 
                    fullWidth={true}
                    pr={true}
                    placeholder={'Номер оси'}
                    onChange={(value) => {
                        selectWheelset({...selectedWheelset, axisNum: value.target.value});
                    }}
                    value={selectedWheelset.axisNum}
                />
                <CustomTextArea 
                    fullWidth={true}
                    placeholder={'Примечание'}
                    onChange={(value)=>{
                        selectWheelset({...selectedWheelset, description: value.target.value});
                    }}
                    value={selectedWheelset.description}
                />
            </div>
            {/* <div style={{display: 'block'}}>
                    <CustomTextField 
                        placeholder={'Дата Ремонта'}
                        onChange={(value) => {
                            // 1992-12-25
                            selectWheelset({...selectedWheelset, date_survey: value.target.value});
                        }}
                        value={selectedWheelset.date_survey}
                    />
                </div> 
            */}
        </>
    );
};

export default FromRepair;