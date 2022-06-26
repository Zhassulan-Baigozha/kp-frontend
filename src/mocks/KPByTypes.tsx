export interface I_KP_ByTypes {
  id: number,
  name: string,
  status: string,
  amount?: number,
}

export const M_STORE_1: I_KP_ByTypes[] = [
    {id: 1, name: 'СОНК', status: 'Исправная', amount: 14},
    {id: 2, name: 'НОНК', status: 'Исправная', amount: 17},
    {id: 3, name: 'СОСК', status: 'Исправная', amount: 15},
    {id: 4, name: 'НОСК', status: 'Исправная', amount: 15},
    {id: 5, name: 'Готовые к\\п ТОР', status: 'Исправная', amount: 51},
    {id: 6, name: 'Готовые к\\п ПВР', status: 'Исправная', amount: 51},
    {id: 7, name: 'Текущий ремонт ПВР', status: 'Требующий ремонта', amount: 41},
    {id: 8, name: 'Средний ремонт ПВР', status: 'Требующий ремонта', amount: 61},
    {id: 9, name: 'Переформирование ПВР', status: 'Требующий ремонта', amount: 71},
    {id: 10, name: 'Текущий ремонт ТОР', status: 'Требующий ремонта', amount: 81},
    {id: 11, name: 'Средний ремонт ТОР', status: 'Требующий ремонта', amount: 51},
    {id: 12, name: 'Переформирование ТОР', status: 'Требующий ремонта', amount: 41},
    {id: 13, name: 'Брак РУ-1Ш', status: 'Зап.часть', amount: 51},
    {id: 14, name: 'ЦКК', status: 'Зап.часть', amount: 94},
    {id: 15, name: 'ЦКК б/у', status: 'Зап.часть', amount: 95},
    {id: 16, name: 'Чистовая ось РУ-1Ш', status: 'Зап.часть', amount: 96},
    {id: 17, name: 'Брак ось', status: 'Неисправная, лом', amount: 97},
    {id: 18, name: 'Брак РУ-1', status: 'Неисправная, лом', amount: 98},
];

type I_KP_Store = {
  [key in string]: I_KP_ByTypes[];
};

export const M_STORE: I_KP_Store[] = [
    {
        I_KP_Store_1: [
            {id: 1, name: 'СОНК', status: 'Исправная', amount: Math.floor(Math.random() * 100)},
            {id: 2, name: 'НОНК', status: 'Исправная', amount: Math.floor(Math.random() * 100)},
            {id: 3, name: 'СОСК', status: 'Исправная', amount: Math.floor(Math.random() * 100)},
            {id: 4, name: 'НОСК', status: 'Исправная', amount: Math.floor(Math.random() * 100)},
            {id: 5, name: 'Готовые к\\п ТОР', status: 'Исправная', amount: Math.floor(Math.random() * 100)},
            {id: 6, name: 'Готовые к\\п ПВР', status: 'Исправная', amount: Math.floor(Math.random() * 100)},
            {id: 7, name: 'Текущий ремонт ПВР', status: 'Требующий ремонта', amount: Math.floor(Math.random() * 100)},
            {id: 8, name: 'Средний ремонт ПВР', status: 'Требующий ремонта', amount: Math.floor(Math.random() * 100)},
            {id: 9, name: 'Переформирование ПВР', status: 'Требующий ремонта', amount: Math.floor(Math.random() * 100)},
            {id: 10, name: 'Текущий ремонт ТОР', status: 'Требующий ремонта', amount: Math.floor(Math.random() * 100)},
            {id: 11, name: 'Средний ремонт ТОР', status: 'Требующий ремонта', amount: Math.floor(Math.random() * 100)},
            {id: 12, name: 'Переформирование ТОР', status: 'Требующий ремонта', amount: Math.floor(Math.random() * 100)},
            {id: 13, name: 'Брак РУ-1Ш', status: 'Зап.часть', amount: Math.floor(Math.random() * 100)},
            {id: 14, name: 'ЦКК', status: 'Зап.часть', amount: Math.floor(Math.random() * 100)},
            {id: 15, name: 'ЦКК б/у', status: 'Зап.часть', amount: Math.floor(Math.random() * 100)},
            {id: 16, name: 'Чистовая ось РУ-1Ш', status: 'Зап.часть', amount: Math.floor(Math.random() * 100)},
            {id: 17, name: 'Брак ось', status: 'Неисправная, лом', amount: Math.floor(Math.random() * 100)},
            {id: 18, name: 'Брак РУ-1', status: 'Неисправная, лом', amount: Math.floor(Math.random() * 100)},
        ]
    },
    {
        I_KP_Store_2: [
            {id: 1, name: 'СОНК', status: 'Исправная', amount: Math.floor(Math.random() * 100)},
            {id: 2, name: 'НОНК', status: 'Исправная', amount: Math.floor(Math.random() * 100)},
            {id: 3, name: 'СОСК', status: 'Исправная', amount: Math.floor(Math.random() * 100)},
            {id: 4, name: 'НОСК', status: 'Исправная', amount: Math.floor(Math.random() * 100)},
            {id: 5, name: 'Готовые к\\п ТОР', status: 'Исправная', amount: Math.floor(Math.random() * 100)},
            {id: 6, name: 'Готовые к\\п ПВР', status: 'Исправная', amount: Math.floor(Math.random() * 100)},
            {id: 7, name: 'Текущий ремонт ПВР', status: 'Требующий ремонта', amount: Math.floor(Math.random() * 100)},
            {id: 8, name: 'Средний ремонт ПВР', status: 'Требующий ремонта', amount: Math.floor(Math.random() * 100)},
            {id: 9, name: 'Переформирование ПВР', status: 'Требующий ремонта', amount: Math.floor(Math.random() * 100)},
            {id: 10, name: 'Текущий ремонт ТОР', status: 'Требующий ремонта', amount: Math.floor(Math.random() * 100)},
            {id: 11, name: 'Средний ремонт ТОР', status: 'Требующий ремонта', amount: Math.floor(Math.random() * 100)},
            {id: 12, name: 'Переформирование ТОР', status: 'Требующий ремонта', amount: Math.floor(Math.random() * 100)},
            {id: 13, name: 'Брак РУ-1Ш', status: 'Зап.часть', amount: Math.floor(Math.random() * 100)},
            {id: 14, name: 'ЦКК', status: 'Зап.часть', amount: Math.floor(Math.random() * 100)},
            {id: 15, name: 'ЦКК б/у', status: 'Зап.часть', amount: Math.floor(Math.random() * 100)},
            {id: 16, name: 'Чистовая ось РУ-1Ш', status: 'Зап.часть', amount: Math.floor(Math.random() * 100)},
            {id: 17, name: 'Брак ось', status: 'Неисправная, лом', amount: Math.floor(Math.random() * 100)},
            {id: 18, name: 'Брак РУ-1', status: 'Неисправная, лом', amount: Math.floor(Math.random() * 100)},
        ]
    },
    {
        I_KP_Store_3: [
            {id: 1, name: 'СОНК', status: 'Исправная', amount: Math.floor(Math.random() * 100)},
            {id: 2, name: 'НОНК', status: 'Исправная', amount: Math.floor(Math.random() * 100)},
            {id: 3, name: 'СОСК', status: 'Исправная', amount: Math.floor(Math.random() * 100)},
            {id: 4, name: 'НОСК', status: 'Исправная', amount: Math.floor(Math.random() * 100)},
            {id: 5, name: 'Готовые к\\п ТОР', status: 'Исправная', amount: Math.floor(Math.random() * 100)},
            {id: 6, name: 'Готовые к\\п ПВР', status: 'Исправная', amount: Math.floor(Math.random() * 100)},
            {id: 7, name: 'Текущий ремонт ПВР', status: 'Требующий ремонта', amount: Math.floor(Math.random() * 100)},
            {id: 8, name: 'Средний ремонт ПВР', status: 'Требующий ремонта', amount: Math.floor(Math.random() * 100)},
            {id: 9, name: 'Переформирование ПВР', status: 'Требующий ремонта', amount: Math.floor(Math.random() * 100)},
            {id: 10, name: 'Текущий ремонт ТОР', status: 'Требующий ремонта', amount: Math.floor(Math.random() * 100)},
            {id: 11, name: 'Средний ремонт ТОР', status: 'Требующий ремонта', amount: Math.floor(Math.random() * 100)},
            {id: 12, name: 'Переформирование ТОР', status: 'Требующий ремонта', amount: Math.floor(Math.random() * 100)},
            {id: 13, name: 'Брак РУ-1Ш', status: 'Зап.часть', amount: Math.floor(Math.random() * 100)},
            {id: 14, name: 'ЦКК', status: 'Зап.часть', amount: Math.floor(Math.random() * 100)},
            {id: 15, name: 'ЦКК б/у', status: 'Зап.часть', amount: Math.floor(Math.random() * 100)},
            {id: 16, name: 'Чистовая ось РУ-1Ш', status: 'Зап.часть', amount: Math.floor(Math.random() * 100)},
            {id: 17, name: 'Брак ось', status: 'Неисправная, лом', amount: Math.floor(Math.random() * 100)},
            {id: 18, name: 'Брак РУ-1', status: 'Неисправная, лом', amount: Math.floor(Math.random() * 100)},
        ]
    },
    {
        I_KP_Store_4: [
            {id: 1, name: 'СОНК', status: 'Исправная', amount: Math.floor(Math.random() * 100)},
            {id: 2, name: 'НОНК', status: 'Исправная', amount: Math.floor(Math.random() * 100)},
            {id: 3, name: 'СОСК', status: 'Исправная', amount: Math.floor(Math.random() * 100)},
            {id: 4, name: 'НОСК', status: 'Исправная', amount: Math.floor(Math.random() * 100)},
            {id: 5, name: 'Готовые к\\п ТОР', status: 'Исправная', amount: Math.floor(Math.random() * 100)},
            {id: 6, name: 'Готовые к\\п ПВР', status: 'Исправная', amount: Math.floor(Math.random() * 100)},
            {id: 7, name: 'Текущий ремонт ПВР', status: 'Требующий ремонта', amount: Math.floor(Math.random() * 100)},
            {id: 8, name: 'Средний ремонт ПВР', status: 'Требующий ремонта', amount: Math.floor(Math.random() * 100)},
            {id: 9, name: 'Переформирование ПВР', status: 'Требующий ремонта', amount: Math.floor(Math.random() * 100)},
            {id: 10, name: 'Текущий ремонт ТОР', status: 'Требующий ремонта', amount: Math.floor(Math.random() * 100)},
            {id: 11, name: 'Средний ремонт ТОР', status: 'Требующий ремонта', amount: Math.floor(Math.random() * 100)},
            {id: 12, name: 'Переформирование ТОР', status: 'Требующий ремонта', amount: Math.floor(Math.random() * 100)},
            {id: 13, name: 'Брак РУ-1Ш', status: 'Зап.часть', amount: Math.floor(Math.random() * 100)},
            {id: 14, name: 'ЦКК', status: 'Зап.часть', amount: Math.floor(Math.random() * 100)},
            {id: 15, name: 'ЦКК б/у', status: 'Зап.часть', amount: Math.floor(Math.random() * 100)},
            {id: 16, name: 'Чистовая ось РУ-1Ш', status: 'Зап.часть', amount: Math.floor(Math.random() * 100)},
            {id: 17, name: 'Брак ось', status: 'Неисправная, лом', amount: Math.floor(Math.random() * 100)},
            {id: 18, name: 'Брак РУ-1', status: 'Неисправная, лом', amount: Math.floor(Math.random() * 100)},
        ]
    },
    {
        I_KP_Store_5: [
            {id: 1, name: 'СОНК', status: 'Исправная', amount: Math.floor(Math.random() * 100)},
            {id: 2, name: 'НОНК', status: 'Исправная', amount: Math.floor(Math.random() * 100)},
            {id: 3, name: 'СОСК', status: 'Исправная', amount: Math.floor(Math.random() * 100)},
            {id: 4, name: 'НОСК', status: 'Исправная', amount: Math.floor(Math.random() * 100)},
            {id: 5, name: 'Готовые к\\п ТОР', status: 'Исправная', amount: Math.floor(Math.random() * 100)},
            {id: 6, name: 'Готовые к\\п ПВР', status: 'Исправная', amount: Math.floor(Math.random() * 100)},
            {id: 7, name: 'Текущий ремонт ПВР', status: 'Требующий ремонта', amount: Math.floor(Math.random() * 100)},
            {id: 8, name: 'Средний ремонт ПВР', status: 'Требующий ремонта', amount: Math.floor(Math.random() * 100)},
            {id: 9, name: 'Переформирование ПВР', status: 'Требующий ремонта', amount: Math.floor(Math.random() * 100)},
            {id: 10, name: 'Текущий ремонт ТОР', status: 'Требующий ремонта', amount: Math.floor(Math.random() * 100)},
            {id: 11, name: 'Средний ремонт ТОР', status: 'Требующий ремонта', amount: Math.floor(Math.random() * 100)},
            {id: 12, name: 'Переформирование ТОР', status: 'Требующий ремонта', amount: Math.floor(Math.random() * 100)},
            {id: 13, name: 'Брак РУ-1Ш', status: 'Зап.часть', amount: Math.floor(Math.random() * 100)},
            {id: 14, name: 'ЦКК', status: 'Зап.часть', amount: Math.floor(Math.random() * 100)},
            {id: 15, name: 'ЦКК б/у', status: 'Зап.часть', amount: Math.floor(Math.random() * 100)},
            {id: 16, name: 'Чистовая ось РУ-1Ш', status: 'Зап.часть', amount: Math.floor(Math.random() * 100)},
            {id: 17, name: 'Брак ось', status: 'Неисправная, лом', amount: Math.floor(Math.random() * 100)},
            {id: 18, name: 'Брак РУ-1', status: 'Неисправная, лом', amount: Math.floor(Math.random() * 100)},
        ]
    },
];

