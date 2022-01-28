import { Col, Row } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import { IAppendPurchasedForm } from 'src/api/CustomAPIModel';
import InnerBlock from 'src/layout/InnerBlock';
import CustomTextArea from '../base/CustomTextArea';
import CustomTextField from '../base/CustomTextField';

interface IPurchased {
    purchasedWSData: IAppendPurchasedForm
    setPurchasedWSData: (value: IAppendPurchasedForm)=> void
}

const Purchased: React.FC<IPurchased> = ({
    purchasedWSData,
    setPurchasedWSData,
}) => {
    const wheelPair1Fields = () => {
        return (
            <>
                <div style={{display: 'block', paddingBottom: '16px'}}>
                    <CustomTextField 
                        placeholder={'Номер'}
                        onChange={(value) => {
                            setPurchasedWSData({...purchasedWSData, wheel_left_number: value.target.value});
                        }}
                        value={purchasedWSData.wheel_left_number}
                    />
                </div>
                <div style={{display: 'block', paddingBottom: '16px'}}>
                    <CustomTextField 
                        placeholder={'Год изготовления'}
                        onChange={(value) => {
                            if (
                                typeof (+value.target.value) === 'number' 
                && !isNaN(+value.target.value) 
                && value.target.value.length <= 4
                && (+value.target.value) <= 3000
                            ){
                                setPurchasedWSData({...purchasedWSData, wheel_left_year_issue: +value.target.value});
                            }
                        }}
                        value={
                            purchasedWSData.wheel_left_year_issue
                                ? purchasedWSData.wheel_left_year_issue.toString()
                                : ''
                        }
                    />
                </div>
                <div style={{display: 'block', paddingBottom: '16px'}}>
                    <CustomTextField 
                        placeholder={'Дата Ремонта'}
                        onChange={(value) => {
                            // 1992-12-25
                            setPurchasedWSData({...purchasedWSData, wheel_left_date_survey: value.target.value});
                        }}
                        value={purchasedWSData.wheel_left_date_survey}
                    />
                </div>

                <div style={{display: 'block', paddingBottom: '16px'}}>
                    <CustomTextField 
                        placeholder={'Клеймо производителя'}
                        onChange={(value) => {
                            if (typeof (+value.target.value) === 'number' && !isNaN(+value.target.value)){
                                setPurchasedWSData({...purchasedWSData, wheel_left_manufacturer_code: +value.target.value});
                            }
                        }}
                        value={
                            purchasedWSData?.wheel_left_manufacturer_code !== undefined
              && purchasedWSData?.wheel_left_manufacturer_code !== null
              && typeof (+purchasedWSData.wheel_left_manufacturer_code) === 'number' 
              && !isNaN(+purchasedWSData?.wheel_left_manufacturer_code)
                                ? purchasedWSData.wheel_left_manufacturer_code.toString()
                                : '0'
                        }
                    />
                </div>
                <div style={{display: 'block', paddingBottom: '16px'}}>
                    <CustomTextField 
                        placeholder={'Толщина обода'}
                        onChange={(value) => {
                            if (typeof (+value.target.value) === 'number' && !isNaN(+value.target.value)){
                                setPurchasedWSData({...purchasedWSData, wheel_left_rim: +value.target.value});
                            }
                        }}
                        value={
                            purchasedWSData.wheel_left_rim
                                ? purchasedWSData.wheel_left_rim.toString()
                                : ''
              
                        }
                    />
                </div>
                <div style={{display: 'block', paddingBottom: '16px'}}>
                    <CustomTextField 
                        placeholder={'Толщина гребня'}
                        onChange={(value) => {
                            if (typeof (+value.target.value) === 'number' && !isNaN(+value.target.value)){
                                setPurchasedWSData({...purchasedWSData, wheel_left_flange: +value.target.value});
                            }
                        }}
                        value={
                            purchasedWSData.wheel_left_flange
                                ? purchasedWSData.wheel_left_flange.toString()
                                : ''
                        }
                    />
                </div>
            </>
        );
    };

    const wheelPair2Fields = () => {
        return (
            <>
                <div style={{display: 'block', paddingBottom: '16px'}}>
                    <CustomTextField 
                        placeholder={'Номер'}
                        onChange={(value) => {
                            setPurchasedWSData({...purchasedWSData, wheel_right_number: value.target.value});
                        }}
                        value={purchasedWSData.wheel_right_number}
                    />
                </div>
                <div style={{display: 'block', paddingBottom: '16px'}}>
                    <CustomTextField 
                        placeholder={'Год изготовления'}
                        onChange={(value) => {
                            if (
                                typeof (+value.target.value) === 'number' 
                && !isNaN(+value.target.value) 
                && value.target.value.length <= 4
                && (+value.target.value) <= 3000
                            ){
                                setPurchasedWSData({...purchasedWSData, wheel_right_year_issue: +value.target.value});
                            }
                        }}
                        value={
                            purchasedWSData.wheel_right_year_issue
                                ? purchasedWSData.wheel_right_year_issue.toString()
                                : ''
                        }
                    />
                </div>
                <div style={{display: 'block', paddingBottom: '16px'}}>
                    <CustomTextField 
                        placeholder={'Дата Ремонта'}
                        onChange={(value) => {
                            // 1992-12-25
                            setPurchasedWSData({...purchasedWSData, wheel_right_date_survey: value.target.value});
                        }}
                        value={purchasedWSData.wheel_right_date_survey}
                    />
                </div>
                <div style={{display: 'block', paddingBottom: '16px'}}>
                    <CustomTextField 
                        placeholder={'Клеймо производителя'}
                        onChange={(value) => {
                            if (typeof (+value) === 'number' && !isNaN(+value.target.value)){
                                setPurchasedWSData({...purchasedWSData, wheel_right_manufacturer_code: +value.target.value});
                            }
                        }}
                        value={
                            purchasedWSData?.wheel_right_manufacturer_code !== undefined
              && purchasedWSData?.wheel_right_manufacturer_code !== null
              && typeof (+purchasedWSData.wheel_right_manufacturer_code) === 'number' 
              && !isNaN(+purchasedWSData?.wheel_right_manufacturer_code)
                                ? purchasedWSData.wheel_right_manufacturer_code.toString()
                                : '0'
                        }
                    />
                </div>
                <div style={{display: 'block', paddingBottom: '16px'}}>
                    <CustomTextField 
                        placeholder={'Толщина обода'}
                        onChange={(value) => {
                            if (typeof (+value.target.value) === 'number' && !isNaN(+value.target.value)){
                                setPurchasedWSData({...purchasedWSData, wheel_right_rim: +value.target.value});
                            }
                        }}
                        value={
                            purchasedWSData.wheel_right_rim
                                ? purchasedWSData.wheel_right_rim.toString()
                                : ''
                        }
                    />
                </div>
                <div style={{display: 'block', paddingBottom: '16px'}}>
                    <CustomTextField 
                        placeholder={'Толщина гребня'}
                        onChange={(value) => {
                            if (typeof (+value.target.value) === 'number' && !isNaN(+value.target.value)){
                                setPurchasedWSData({...purchasedWSData, wheel_right_flange: +value.target.value});
                            }
                        }}
                        value={
                            purchasedWSData.wheel_right_flange
                                ? purchasedWSData.wheel_right_flange.toString()
                                : ''
                        }
                    />
                </div>
            </>
        );
    };

    return (
        <Row gutter={16}>
            <Col span={8} className="gutter-row">
                <InnerBlock>
                    <Title level={5} style={{ paddingBottom: '16px' }}>
                        Данные левого колеса
                    </Title>
                    {wheelPair1Fields()}
                </InnerBlock>
            </Col>
            <Col span={8} className="gutter-row">
                <InnerBlock>
                    <Title level={5} style={{ paddingBottom: '16px' }}>
                        Данные правого колеса
                    </Title>
                    {wheelPair2Fields()}
                </InnerBlock>
            </Col>
            <Col span={8} className="gutter-row">
                <InnerBlock>
                    <Title level={5}  style={{ paddingBottom: '16px' }}>
                        Данные оси
                    </Title>
                    <div style={{display: 'block', paddingBottom: '16px'}}>
                        <CustomTextField 
                            placeholder={'Номер'}
                            onChange={(value) => {
                                setPurchasedWSData({...purchasedWSData, number: value.target.value});
                            }}
                            value={purchasedWSData.number}
                        />
                    </div>
                    <div style={{display: 'block', paddingBottom: '16px'}}>
                        <CustomTextField 
                            placeholder={'Год изготовления'}
                            onChange={(value) => {
                                if (
                                    typeof (+value.target.value) === 'number' 
                                    && !isNaN(+value.target.value)
                                    && value.target.value.length <= 4
                                    && (+value.target.value) <= 3000
                                ){
                                    setPurchasedWSData({...purchasedWSData, year_issue: +value.target.value});
                                }
                            }}
                            value={purchasedWSData.year_issue.toString()}
                        />
                    </div>
                    <div style={{display: 'block', paddingBottom: '16px'}}>
                        <CustomTextField 
                            placeholder={'Дата Ремонта'}
                            onChange={(value) => {
                                // 1992-12-25
                                setPurchasedWSData({...purchasedWSData, date_survey: value.target.value});
                            }}
                            value={purchasedWSData.date_survey}
                        />
                    </div>
                    <div style={{display: 'block', paddingBottom: '16px'}}>
                        <CustomTextField 
                            placeholder={'Клеймо производителя'}
                            onChange={(value) => {
                                if (typeof (+value.target.value) === 'number' && !isNaN(+value.target.value)){
                                    setPurchasedWSData({...purchasedWSData, manufacturer_code: +value.target.value});
                                }
                            }}
                            value={purchasedWSData.manufacturer_code.toString()}
                        />
                    </div>
                    <div style={{display: 'block', paddingBottom: '16px'}}>
                        <CustomTextArea 
                            placeholder={'Примечание'}
                            onChange={(value)=>{
                                setPurchasedWSData({...purchasedWSData, description: value.target.value});
                            }}
                            value={purchasedWSData.description}
                        />
                    </div>
                </InnerBlock>
            </Col>
        </Row>
    );
};

export default Purchased;