import { useSelector } from 'react-redux';
import { IRootState } from 'src/store';
import { convertWs, convertWs2 } from 'src/utils/convert';

const useConvertWs = () => {
    const wsList = useSelector((state: IRootState) => state.wsList.data);
    const convertedWS = convertWs(wsList);
    const convertedWS2 = convertWs2(wsList);

    return { convertedWS, convertedWS2 };
};
export default useConvertWs;

