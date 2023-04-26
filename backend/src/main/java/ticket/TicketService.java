package ticket;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@RequiredArgsConstructor
@Service


public class TicketService {


   private final TicketRepository ticketRepository;
    public List<Ticket> getAllTickets(){
        return ticketRepository.findAll();
    }

    public Ticket createTicket (Ticket ticket){
        return ticketRepository.save(ticket);
    }

}
