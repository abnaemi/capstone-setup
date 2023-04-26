import {Ticket} from "./model/Ticket";
import "./TicketCard.css"

type Props = {
    ticket: Ticket
}

export default function TicketCard(props: Props) {


    return (

        <div className="TicketCard">

            <p> Title: {props.ticket.title} |
          Customer:  {props.ticket.customer} |
           Status: {props.ticket.status} |
           Ticket Number: {props.ticket.number} |
           Ticket ID: {props.ticket.id}</p>


        </div>

    )


}