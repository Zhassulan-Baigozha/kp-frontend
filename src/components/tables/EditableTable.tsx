import React, { useState } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography, Select } from 'antd';
import { IWSListTableAddPage } from 'src/interfaces';
import { RowSelectionType } from 'antd/lib/table/interface';
import TextArea from 'antd/lib/input/TextArea';
import { useSelector } from 'react-redux';
import { IRootState } from 'src/store';
import ComboBox from '../base/ComboBox';
const { Option } = Select;
const EditableTableColums = [
    {
        title: '№ Оси',
        dataIndex: 'axisNum',
        key: 'axisNum',
        width: 100,
    },
    {
        title: 'Состояние',
        dataIndex: 'stateName',
        key: 'stateName',
        width: 150,
    },
    {
        title: 'Клеймо произ.',
        dataIndex: 'manufacturerCode',
        key: 'manufacturerCode',
        width: 100,
    },
    {
        title: 'Год изг.',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: 200,
    },
    {
        title: 'Вид КП',
        dataIndex: 'statusName',
        key: 'statusName',
        width: 150,
    },
    {
        title: '№1 ЦКК',
        dataIndex: 'CKK1',
        key: 'CKK1',
        width: 150,
    },
    {
        title: '№1 TO',
        dataIndex: 'rim1',
        key: 'rim1',
        width: 150,
    },
    {
        title: '№1 ТГ',
        dataIndex: 'flange1',
        key: 'flange1',
        width: 150,
    },
    {
        title: '№2 ЦКК',
        dataIndex: 'CKK2',
        key: 'CKK2',
        width: 150,
    },
    {
        title: '№2 TO',
        dataIndex: 'rim2',
        key: 'rim2',
        width: 150,
    },
    {
        title: '№2 ТГ',
        dataIndex: 'flange2',
        key: 'flange2',
        width: 150,
    },
    {
        title: 'Примечание',
        dataIndex: 'description',
        key: 'description',
        width: 150,
    }
];

type TTypeInput = 'number' | 'textArea' | 'string' | 'IComboBoxOption'
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: TTypeInput;
    record: IWSListTableAddPage;
    index: number;
    children: React.ReactNode;
}
const MapIWSListTableAddPage = new Map();

MapIWSListTableAddPage.set('axisNum', 'string');
MapIWSListTableAddPage.set('stateName', 'string');
MapIWSListTableAddPage.set('state', 'IComboBoxOption');
MapIWSListTableAddPage.set('createdAt', 'string');
MapIWSListTableAddPage.set('description', 'textArea');
MapIWSListTableAddPage.set('key', 'number');
MapIWSListTableAddPage.set('manufacturerCode', 'number');
MapIWSListTableAddPage.set('statusName', 'string');
MapIWSListTableAddPage.set('status', 'IComboBoxOption');
MapIWSListTableAddPage.set('CKK1', 'string');
MapIWSListTableAddPage.set('rim1', 'number');
MapIWSListTableAddPage.set('flange1', 'number');
MapIWSListTableAddPage.set('CKK2', 'string');
MapIWSListTableAddPage.set('rim2', 'number');
MapIWSListTableAddPage.set('flange2', 'number');

const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const statuses = useSelector((state: IRootState) => state.data.allStatuses);
    const statusesList = statuses.map((item) =>({id: item.code, label: item.name}));
    
    const selectByInputType = (inputTypeProp: TTypeInput, dataIndexProp: string) => {
        if (dataIndex === 'statusName'){
            return (
                <Select>
                    {statusesList?.length > 0 && statusesList.map(status => (
                        <Option value={status.id} key={status.id} >
                            {status.label}
                        </Option>
                    ))}
                </Select>
            );
        } else {
            switch (inputTypeProp) {
            case 'number': return <InputNumber /> ;
            case 'textArea': return <TextArea rows={1} />;
            default: return <Input style={{width: 100}} onChange={()=>{
                console.log('dataIndex', dataIndex);
                console.log('title', title);
                console.log('index', index);
                console.log('children', children);
                console.log('inputType', inputType);
            }}/>;
            }
        }
    };
    const inputNode = selectByInputType(inputType, dataIndex);

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Введите ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};
interface IWSTableAdd {
    ws: IWSListTableAddPage[],
    setWS?: (value: IWSListTableAddPage[]) => void,
    onChange?: (selectedRowKeys: React.Key[], selectedRows: IWSListTableAddPage[]) => void,
    selectionType?: RowSelectionType,
    editable ?: boolean,
}

const EditableTable: React.FC<IWSTableAdd> = ({
    editable,
    onChange,
    selectionType,
    ws, 
    setWS,
}) => {
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');

    const isEditing = (record: IWSListTableAddPage) => record.key.toString() === editingKey;

    const edit = (record: Partial<IWSListTableAddPage> & { key: React.Key }) => {
        console.log('record', record);
        form.setFieldsValue({
            // axisNum: string,
            // stateName: string,
            // state: IComboBoxOption,
            // createdAt: string,
            description: '',
            editable: record.editable,
            // key: number,
            // manufacturerCode: number,
            // statusName: string,
            status: record.status,
            statusName: record.statusName,
            // wheels: IWheel[] | null,
            ...record
        });
        setEditingKey(record.key.toString());
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as IWSListTableAddPage;

            const newData = [...ws];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setWS?.(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setWS?.(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns2: { 
        title: string;
        dataIndex: string;
        editable?: boolean;
        render?: (_: any, record: IWSListTableAddPage) => React.ReactNode;
    }[] = editable ? [...EditableTableColums.map(item =>({
        ...item,
        editable: item.key !== 'stateName' && item.key !== 'state' && item.key !== 'statusName' && item.key !== 'status'
    })), {
        title: 'Действие',
        dataIndex: 'operation',
        render: (_: any, record: IWSListTableAddPage) => {
            const editable = isEditing(record);
            return editable ? (
                <span>
                    <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
                        Сохранить
                    </Typography.Link>
                    <Popconfirm title="Вы уверены что хотите отменить?" onConfirm={cancel} okText="Да" cancelText="Нет">
                        <a>Отмена</a>
                    </Popconfirm>
                </span>
            ) : record.editable ? (
                <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                    Изменить
                </Typography.Link>
            ): (
                <div />
            );
        },
    }]: EditableTableColums;

    const mergedColumns = columns2.map(col => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: IWSListTableAddPage) => ({
                record,
                inputType: MapIWSListTableAddPage.get(col.dataIndex),
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: IWSListTableAddPage[]) => {
            onChange?.(selectedRowKeys, selectedRows);
        },
        getCheckboxProps: (record: IWSListTableAddPage) => ({
            // disabled: record.axisNum === 'Disabled User',
            name: record.axisNum,
        }),
    };

    return (
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                scroll={{ x: true }}
                bordered
                dataSource={ws}
                columns={mergedColumns}
                rowClassName="editable-row"
                rowSelection={selectionType ? {
                    type: selectionType,
                    ...rowSelection,
                }: undefined}
                pagination={{
                    onChange: cancel,
                }}
            />
        </Form>
    );
};

export default EditableTable;
