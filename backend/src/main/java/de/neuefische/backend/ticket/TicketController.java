package de.neuefische.backend.ticket;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/tickets")


public class TicketController {


    private final TicketService ticketService;

    @GetMapping
    public List<Ticket> getAllTickets(){
        return ticketService.getAllTickets();
    }

    @PostMapping
    public Ticket createTicket(@RequestBody Ticket ticket){
        return ticketService.createTicket(ticket);
    }

    @PutMapping(path = {"{id}/update", "{id}"})
    Ticket updateTicket(@PathVariable String id, @RequestBody Ticket ticket) {
        if (!ticket.id().equals(id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The id in the url does not match the request body's id");
        }
        return ticketService.updateTicket(ticket);
    }

}
