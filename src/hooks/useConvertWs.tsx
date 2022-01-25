import { useSelector } from 'react-redux';
import { IRootState } from 'src/store';
import { convertWs } from 'src/utils/convertWs';

const useConvertWs = () => {
  const wsList = useSelector((state: IRootState) => state.wsList.data);
  const convertedWS = convertWs(wsList);

  return { convertedWS };
}
export default useConvertWs;

