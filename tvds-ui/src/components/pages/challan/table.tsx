import React, {useState} from "react"
import Table, {Columns, TableBar} from "../../table"

interface Detail {
    key: React.Key;
    id: number;
    vehicle: string;
    violation: string;
    amount: number;
    createdAt: string;
  }

export default function ChallanList(){

    const columns: Columns<Detail> = React.useMemo(
        () => [
          {
            title: "ID",
            field: "id",
            width: 50,
          },
          {
            title: 'Vehicle',
            field: 'vehicle',
            width: 150,
          },
          {
            title: 'Violation',
            field: 'violation',
            width: 150,
          },
          {
            title: 'Fine amount',
            field: 'amount',
            width: 150,
          },
          {
            title: 'Created At',
            field: 'createdAt',
            width: 150,
          },
        ],
        [],
      );

      const [tableData, ]=useState<Detail[]>([])
        for (let i = 0; i < 100; i++) {
            tableData.push({
            key: i,
            id: i+1,
            vehicle: `TN02BT7246`,
            violation: `- `,
            amount: 100,
            createdAt: `05-04-2021 15:12:25`
            });
        }
    return(
            <div className="col-span-2">
                <div className="grid grid-cols-1">
                <TableBar name="" >
                    <Table
                        height="calc(100vh - 9.1rem)"
                        columns={columns}
                        value={tableData}
                    />
                </TableBar>
                </div>
            </div>
    )
}
