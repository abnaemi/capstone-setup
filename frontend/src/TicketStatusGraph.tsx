import React from "react";
import { Ticket } from "./model/Ticket";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

type Props = {
    tickets: Ticket[];
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const TicketStatusGraph: React.FC<Props> = ({ tickets }) => {
    const countStatus = (status: string) => {
        return tickets.filter((ticket) => ticket.status === status).length;
    };

    const data = [
        { name: "Open", value: countStatus("OPEN") },
        { name: "In Progress", value: countStatus("IN_PROGRESS") },
        { name: "Done", value: countStatus("DONE") },
        { name: "Archived", value: countStatus("ARCHIVED") },
    ];

    return (
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
    );
};

export default TicketStatusGraph;
