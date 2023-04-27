import {Ticket} from "./model/Ticket";
import "./TicketCard.css"

type Props = {
    ticket: Ticket
}

export default function TicketCard(props: Props) {


    return (

        <div className="TicketCard">

            <p> <b>Title: </b>  {props.ticket.title}
            <b> Customer: </b>  {props.ticket.customer}
            <b> Status: </b>  {props.ticket.status}
            <b> Ticket Prio: </b>  {props.ticket.prio}
            <b> Ticket ID: </b>  {props.ticket.id}</p>


        </div>

    )


}