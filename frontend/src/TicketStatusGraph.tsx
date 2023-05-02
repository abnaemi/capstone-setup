import React from "react";
import { Ticket } from "./model/Ticket";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

type Props = {
    tickets: Ticket[];
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const STATUS_LABELS: { [key: string]: string } = {
    "OPEN": "Open",
    "IN_PROGRESS": "In Progress",
    "DONE": "Done",
    "ARCHIVED": "Archived"
};


const TicketStatusGraph: React.FC<Props> = ({ tickets }) => {
    const countStatus = (status: string) => {
        return tickets.filter((ticket) => ticket.status === status).length;
    };

    const data = [
        { name: STATUS_LABELS["OPEN"], value: countStatus("OPEN") },
        { name: STATUS_LABELS["IN_PROGRESS"], value: countStatus("IN_PROGRESS") },
        { name: STATUS_LABELS["DONE"], value: countStatus("DONE") },
        { name: STATUS_LABELS["ARCHIVED"], value: countStatus("ARCHIVED") },
    ];

    // @ts-ignore
    return (
        <div>
            <PieChart width={400} height={400}>
                <Pie
                    dataKey="value"
                    startAngle={360}
                    endAngle={0}
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
            <div style={{ display: "flex", justifyContent: "center" }}>
                {Object.keys(STATUS_LABELS).map((key, index) => (
                    <div key={`status-label-${index}`} style={{ display: "flex", alignItems: "center", marginLeft: 20 }}>
                        <div style={{ width: 20, height: 20, backgroundColor: COLORS[index % COLORS.length], marginRight: 5 }}></div>
                        <span>{STATUS_LABELS[key]}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TicketStatusGraph;
