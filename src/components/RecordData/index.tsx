import './styles.css';
import { ColDef, ValueFormatterParams } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useMemo, useState } from "react";
import { IRow } from '../../models/rows';
import * as recordsService from '../../services/records-services';

export function RecordData() {
    const [rowData, setRowData] = useState<IRow[]>([]);
    const [OK, setOK] = useState(true);
    
    const dateFormatter = (params: ValueFormatterParams): string => {
        return new Date(params.value).toLocaleDateString("en-us", {

            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",

        });
    };

    const [colDefs] = useState<ColDef[]>([
        {
            field: "recordId",
            width: 120,
            filter: true,
            checkboxSelection: true,
        },
        {
            field: "createdAt",
            valueFormatter: dateFormatter,
            width: 200,
        },
        {
            field: "operandOne",
            width: 150,
        },
        { field: "operandTwo" },
        {
            field: "operator",
            width: 150,
        },
        {
            field: "result",
            valueFormatter: (params: ValueFormatterParams) => {
                return params.value.toLocaleString();
            },
            width: 150,
        },
        {
            field: "cost",
            valueFormatter: (params: ValueFormatterParams) => {
                return "$" + params.value.toLocaleString();
            },
            width: 150,
        },
        {
            field: "username",
            width: 250,
        },

    ]);

  
    if (OK) {

        recordsService.findRecords(0, 1000, 0, 1000)

            .then(response => {

                setRowData(response.data.records);
                setOK(false);

            })

            .catch(() => {

            })
            
    }

    const defaultColDef = useMemo<ColDef>(() => {
        return {
            filter: true,
            editable: true,
        };
    }, []);

    return (
        <div className="container-grid">
            <div
                className={
                    "ag-theme-quartz-dark"
                }
                style={{ width: "100%", height: "77vh" }}
            >
  
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    defaultColDef={defaultColDef}
                    pagination={true}
                    onCellValueChanged={(event) =>
                        console.log(`New Cell Value: ${event.value}`)
                    }
                />
        
            </div>
        </div>
    );
};