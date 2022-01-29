import React from 'react';
// import { Grid } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import CustomTextField from 'src/components/CustomTextField';
// import Paper from '@mui/material/Paper';
// import { Typography } from '@mui/material';
import { IRepairWSUpdateRequest } from 'src/api/CustomAPIModel';



interface IFromRepair {
    wheelSetData: IRepairWSUpdateRequest
    setWheelSetData: (value: IRepairWSUpdateRequest) => void
}

const FromRepair: React.FC<IFromRepair> = ({
    wheelSetData,
    setWheelSetData
}) => {
    // const wheelPair1Fields = () => {
    //     if (wheelSetData.wheels.length >= 1 ){
    //         return (
    //             <>
    //                 <div style={{display: 'block', paddingTop: '16px'}}>
    //                     <CustomTextField 
    //                         label={'Толщина обода'}
    //                         onTextChange={(value: string) => {
    //                             if (typeof (+value) === 'number' && !isNaN(+value)){
    //                                 const tempWheels = wheelSetData.wheels;
    //                                 tempWheels[0].rim = (+value);
    //                                 setWheelSetData({
    //                                     ...wheelSetData, 
    //                                     wheels:tempWheels
    //                                 });
    //                             }
    //                         }}
    //                         value={wheelSetData.wheels[0].rim.toString()}
    //                     />
    //                 </div>
    //                 <div style={{display: 'block', paddingTop: '16px'}}>
    //                     <CustomTextField 
    //                         label={'Толщина гребня'}
    //                         onTextChange={(value: string) => {
    //                             if (typeof (+value) === 'number' && !isNaN(+value)){
    //                                 const tempWheels = wheelSetData.wheels;
    //                                 tempWheels[0].flange = (+value);
    //                                 setWheelSetData({
    //                                     ...wheelSetData, 
    //                                     wheels:tempWheels
    //                                 });
    //                             }
    //                         }}
    //                         value={wheelSetData.wheels[0].flange.toString()}
    //                     />
    //                 </div>
    //             </>
    //         );
    //     } else {
    //         return null;
    //     }
    // };
    // const wheelPair2Fields = () => {
    //     if (wheelSetData.wheels.length === 2 ){
    //         return (
    //             <>
    //                 <div style={{display: 'block', paddingTop: '16px'}}>
    //                     <CustomTextField 
    //                         label={'Толщина обода'}
    //                         onTextChange={(value: string) => {
    //                             if (typeof (+value) === 'number' && !isNaN(+value)){
    //                                 const tempWheels = wheelSetData.wheels;
    //                                 tempWheels[1].rim = (+value);
    //                                 setWheelSetData({
    //                                     ...wheelSetData, 
    //                                     wheels:tempWheels
    //                                 });
    //                             }
    //                         }}
    //                         value={wheelSetData.wheels[1].rim.toString()}
    //                     />
    //                 </div>
    //                 <div style={{display: 'block', paddingTop: '16px'}}>
    //                     <CustomTextField 
    //                         label={'Толщина гребня'}
    //                         onTextChange={(value: string) => {
    //                             if (typeof (+value) === 'number' && !isNaN(+value)){
    //                                 const tempWheels = wheelSetData.wheels;
    //                                 tempWheels[1].flange = (+value);
    //                                 setWheelSetData({
    //                                     ...wheelSetData, 
    //                                     wheels:tempWheels
    //                                 });
    //                             }
    //                         }}
    //                         value={wheelSetData.wheels[1].flange.toString()}
    //                     />
    //                 </div>
    //             </>
    //         );
    //     } else {
    //         return null;
    //     }
    // };

    return (
        <>
            FromRepair
        </>
        // <Grid container spacing={2} style={{marginBottom: '16px'}}>
        //     <Grid item xs={4}>
        //         <Item>
        //             <Typography sx={{ flexShrink: 0}}>
        //     Данные левого колеса
        //             </Typography>
        //             {wheelPair1Fields()}
        //         </Item>
        //     </Grid>
        //     <Grid item xs={4}>
        //         <Item>
        //             <Typography sx={{ flexShrink: 0}}>
        //     Данные правого колеса
        //             </Typography>
        //             {wheelPair2Fields()}
        //         </Item>
        //     </Grid>
        //     <Grid item xs={4}>
        //         <Item>
        //             <Typography sx={{ flexShrink: 0}}>
        //     Данные оси
        //             </Typography>
        //             <div style={{display: 'block', paddingTop: '16px'}}>
        //                 <CustomTextField 
        //                     label={'Примечание'}
        //                     onTextChange={(value: string) => {
        //                         setWheelSetData({
        //                             ...wheelSetData,
        //                             description: value
        //                         });
        //                     }}
        //                     value={wheelSetData.description}
        //                 />
        //             </div>
        //             {/* <div style={{display: 'block', paddingBottom: '16px'}}>
        //     <CustomTextField 
        //       label={'Дата Ремонта'}
        //       onTextChange={(value: string) => {
        //         // 1992-12-25
        //         setPurchasedWSData({...purchasedWSData, date_survey: value});
        //       }}
        //       value={purchasedWSData.date_survey}
        //     />
        //   </div> */}
        //             {/* <div style={{display: 'block', paddingBottom: '16px'}}>
        //     <CustomTextField 
        //       label={'Клеймо производителя'}
        //       onTextChange={(value: string) => {
        //         if (typeof (+value) === 'number' && !isNaN(+value)){
        //           setPurchasedWSData({...purchasedWSData, manufacturer_code: +value});
        //         }
        //       }}
        //       value={purchasedWSData.manufacturer_code.toString()}
        //     />
        //   </div> */}
        //             {/* <div style={{display: 'block', paddingBottom: '16px'}}>
        //     <CustomTextField 
        //       label={'Год изготовления'}
        //       onTextChange={(value: string) => {
        //         if (
        //           typeof (+value) === 'number' 
        //           && !isNaN(+value)
        //           && value.length <= 4
        //           && (+value) <= 3000
        //         ){
        //           setWheelSetData({
        //             ...wheelSetData, 
        //             wheelset: {
        //               ...wheelSetData.wheelset,
        //               number: value
        //             }
        //           });
        //           setPurchasedWSData({...purchasedWSData, year_issue: +value});
        //         }
        //       }}
        //       value={wheelSetData.wheelset.year_issue.toString()}
        //     />
        //   </div> */}
        //         </Item>
        //     </Grid>
        // </Grid>
    );
};

export default FromRepair;