import {Ticket} from "./model/Ticket";
import TicketCard from "./TicketCard";

type Props = {
    tickets: Ticket[]
}
export default function TicketGallery(props: Props){



    return (
        <div>
            {props.tickets.map((ticket) => <TicketCard key={ticket.id} ticket={ticket}/>)
            }
        </div>

    )
}