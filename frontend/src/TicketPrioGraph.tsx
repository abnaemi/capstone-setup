import React from "react";
import { Ticket } from "./model/Ticket";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

type Props = {
    tickets: Ticket[];
};

const COLORS = ['#FF8042', '#FFBB28', '#00C49F'];

const PRIORITY_LABELS: { [key: string]: string } = {
    "High": "High",
    "Medium": "Medium",
    "Low": "Low"
};


const TicketPriorityGraph: React.FC<Props> = ({ tickets }) => {
    const countPriority = (priority: string) => {
        return tickets.filter((ticket) => ticket.prio === priority).length;
    };

    const data = [
        { name: PRIORITY_LABELS["High"], value: countPriority("High") },
        { name: PRIORITY_LABELS["Medium"], value: countPriority("Medium") },
        { name: PRIORITY_LABELS["Low"], value: countPriority("Low") },
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
                {Object.keys(PRIORITY_LABELS).map((key, index) => (
                    <div key={`priority-label-${index}`} style={{ display: "flex", alignItems: "center", marginLeft: 20 }}>
                        <div style={{ width: 20, height: 20, backgroundColor: COLORS[index % COLORS.length], marginRight: 5 }}></div>
                        <span>{PRIORITY_LABELS[key]}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TicketPriorityGraph;
