package de.neuefische.backend.ticket;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TicketService {


   private final TicketRepository ticketRepository;
    public List<Ticket> getAllTickets(){
        return ticketRepository.findAll();
    }

    public Ticket createTicket (Ticket ticket){
        return ticketRepository.save(ticket);
    }

    public Ticket updateTicket (Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    public void  deleteTicket  (String id) {
        ticketRepository.deleteById(id);
    }


    public Optional<Ticket> findById(String id) {
        return ticketRepository.findById(id);
    }

}
