import { useSelector } from 'react-redux';
import { IRootState } from 'src/store';

const useWarehouseList = () => {
    const warehouse = useSelector((state: IRootState) => state.warehouse.data);
    const warehouseList = warehouse.map((item) =>({id: item.id, label: item.name}));

    return { warehouseList };
};
export default useWarehouseList;

