import React from "react";
import { Ticket } from "./model/Ticket";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

type Props = {
    tickets: Ticket[];
};

const COLORS = ['#0088FE', '#FFBB28'];

const CUSTOMER_TYPE_LABELS: { [key: string]: string } = {
    "Premium": "Premium",
    "Standard": "Standard",
};

const TicketCustomerGraph: React.FC<Props> = ({ tickets }) => {
    const countCustomerType = (customerType: string) => {
        return tickets.filter((ticket) => ticket.customer === customerType).length;
    };

    const data = [
        { name: CUSTOMER_TYPE_LABELS["Premium"], value: countCustomerType("Premium") },
        { name: CUSTOMER_TYPE_LABELS["Standard"], value: countCustomerType("Standard") },
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
    {Object.keys(CUSTOMER_TYPE_LABELS).map((key, index) => (
        <div key={`customer-type-label-${index}`} style={{ display: "flex", alignItems: "center", marginLeft: 20 }}>
        <div style={{ width: 20, height: 20, backgroundColor: COLORS[index % COLORS.length], marginRight: 5 }}></div>
    <span>{CUSTOMER_TYPE_LABELS[key]}</span>
    </div>
    ))}
    </div>
    </div>
);
};

export default TicketCustomerGraph;
