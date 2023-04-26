import {Ticket} from "./model/Ticket";

type Props = {
    tickets: Ticket[]
}
export default function TicketGallery(props: Props){



    return (
        <div>
            {props.tickets.map((ticket) => <div key={ticket.id}>
                <p> {ticket.id}</p>
                </div>)}

        </div>


    )
}