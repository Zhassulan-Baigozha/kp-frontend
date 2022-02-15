import { useSelector } from 'react-redux';
import { IRootState } from 'src/store';
import { convertWs } from 'src/utils/convert';

const useConvertWs = () => {
    const wsList = useSelector((state: IRootState) => state.wsList.data);
    const convertedWS = convertWs(wsList);
    const convertedWS2 = convertedWS.map((item) => ({
        editable: false,
        CKK1: item.wheels && item.wheels.length >= 1 ? item.wheels[0].number: '',
        rim1: item.wheels && item.wheels.length >= 1  ? item.wheels[0].rim: 0,
        flange1: item.wheels && item.wheels.length >= 1  ? item.wheels[0].flange: 0,
        CKK2: item.wheels && item.wheels.length === 2  ? item.wheels[1].number: '',
        rim2: item.wheels && item.wheels.length === 2  ? item.wheels[1].rim: 0,
        flange2: item.wheels && item.wheels.length === 2  ? item.wheels[1].flange: 0,
        ...item
    }));

    return { convertedWS, convertedWS2 };
};
export default useConvertWs;

