export interface IRow {
    [x: string]: string | undefined;

    recordId: number;
    createdAt: string;
    operandOne: string;
    operandTwo: string;
    operator: string;
    result: string;
    cost: string;
    username: string;
    
  }