import {Comment} from "./Comment";

export type Ticket= {

    id: string,
    name: string,
    title: string,
    content: string,
    phone: string,
    email: string,
    customer: string,
    prio: string,
    comment: Comment[],
    status: "OPEN" | "IN_PROGRESS" | "DONE" | "ARCHIVED"

}

export type NewTicket = {

    name: string,
    title: string,
    content: string,
    phone: string,
    email: string,
    customer: string,
    prio: string,
    status: "OPEN" | "IN_PROGRESS" | "DONE" | "ARCHIVED"
}