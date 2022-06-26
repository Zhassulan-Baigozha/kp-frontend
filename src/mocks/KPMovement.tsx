export interface I_KP_movement {
  num: number,
  incomeDate: string,
  numCarriage: string,
  carbs: string,
  protein: string,
  selected?: boolean,
}

const createKP_movement_table = (
    num: number,
    incomeDate: string,
    numCarriage: string,
    carbs: string,
    protein: string,
    selected?: boolean,
): I_KP_movement =>  ({ num, incomeDate, numCarriage, carbs, protein, selected });

export const M_KP_movement_table:I_KP_movement[] = [
    createKP_movement_table(1, '23:59 01.01.2021', '64533218', 'РУ-1Ш', '211152', false),
    createKP_movement_table(2, '23:59 01.01.2021', '64533218', 'РУ-1Ш', '211152', false),
    createKP_movement_table(3, '23:59 01.01.2021', '64533218', 'РУ-1Ш', '211152', false),
    createKP_movement_table(4, '23:59 01.01.2021', '64533218', 'РУ-1Ш', '211152', false),
    createKP_movement_table(5, '23:59 01.01.2021', '64533218', 'РУ-1Ш', '211152', false),
];

