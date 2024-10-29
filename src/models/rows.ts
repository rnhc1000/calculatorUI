export interface IRow {
    [x: string]: string;
    recordId: string;
    createdAt: string;
    operandOne: string;
    operandTwo: string;
    operator: string;
    result: string;
    cost: string;
    username: string;
  }