import DataTable , { TableColumn, createTheme } from "react-data-table-component";

type DataRow = {
    
    id: number;
    createdAt: string;
    operandOne: string;
    operandTwo: string;
    operator: string;
    result: string;
    cost: string;
    username: string;

}

export default function Table() {

    createTheme('dark', {
        background: {
          default: 'transparent',
        },
      });

    const columns: TableColumn<DataRow>[] = [
        {
            name: "Id",
            selector: (row) => row.id
        },
        {
            name: "Created at",
            selector: (row) => row.createdAt
        },
        {
            name: "OperandOne",
            selector: (row) => row.operandOne
        },
        {
            name: "OperandTwo",
            selector: (row) => row.operandTwo
        },
        {
            name: "Operator",
            selector: (row) => row.operator
        },
        {
            name: "Result",
            selector: (row) => row.result
        },
        {
            name: "Cost",
            selector: (row) => row.cost
        },
        {
            name: "Username",
            selector: (row) => row.username
        },

    ]

    const rows = [
        {
            id: 1,
            createdAt: "2024-08-30 - 23:32:00",
            operandOne: "77.00",
            operandTwo: "57.00",
            operator: "addition",
            result: "134.00",
            cost: "14.00",
            username: "ricardo@ferreiras.dev.br"

        },
        {
            id: 2,
            createdAt: "2024-08-30 - 23:32:00",
            operandOne: "77.00",
            operandTwo: "57.00",
            operator: "addition",
            result: "134.00",
            cost: "14.00",
            username: "ricardo@ferreiras.dev.br"

        },
        {
            id: 3,
            createdAt: "2024-08-30 - 23:32:00",
            operandOne: "77.00",
            operandTwo: "57.00",
            operator: "addition",
            result: "134.00",
            cost: "14.00",
            username: "ricardo@ferreiras.dev.br"

        },
        {
            id: 4,
            createdAt: "2024-08-30 - 23:32:00",
            operandOne: "77.00",
            operandTwo: "57.00",
            operator: "addition",
            result: "134.00",
            cost: "14.00",
            username: "ricardo@ferreiras.dev.br"

        },
        {
            id: 5,
            createdAt: "2024-08-30 - 23:32:00",
            operandOne: "77.00",
            operandTwo: "57.00",
            operator: "addition",
            result: "134.00",
            cost: "14.00",
            username: "ricardo@ferreiras.dev.br"

        }
    ]

    return (
        <div className="container-my-5">
            <DataTable
                columns={columns}
                data={rows}
                fixedHeader
                pagination
                selectableRows
                theme="solarized"
            />
        </div>
    )
}