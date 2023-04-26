import {Comment} from "./Comment";

export type Ticket= {

    id: string,
    name: string,
    title: string,
    content: string,
    phone: string,
    email: string,
    customer: string,
    number: string,
    comment: Comment[],
    status: "OPEN" | "IN_PROGRESS" | "DONE"

}

export type NewTicket = {

    name: string,
    title: string,
    content: string,
    phone: string,
    email: string,
    customer: string,
    number: string,
    status: "OPEN" | "IN_PROGRESS" | "DONE"
}