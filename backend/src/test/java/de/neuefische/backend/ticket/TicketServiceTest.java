package de.neuefische.backend.ticket;
import de.neuefische.backend.comment.Comment;

import org.junit.jupiter.api.Test;
import org.springframework.test.annotation.DirtiesContext;
import java.util.ArrayList;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TicketServiceTest {

    private final TicketRepository ticketRepository  = mock(TicketRepository.class);
    private final TicketService ticketService = new TicketService(ticketRepository);



    @Test
    void getAllTickets() {

        Comment comment = new Comment("1", "comment");
        Comment comment2 = new Comment("1", "comment");
        Comment comment3 = new Comment("1", "comment");
        List <Comment> commentList = new ArrayList<>();
        commentList.add(comment);
        commentList.add(comment2);
        commentList.add(comment3);


        Ticket expected = new Ticket("1","Tom","Title","content","123","email","customer","999",commentList, TicketStatus.OPEN);

       when(ticketRepository.findAll()).thenReturn(List.of(expected));

       List<Ticket> actual = ticketService.getAllTickets();

       verify (ticketRepository).findAll();
       assertEquals(List.of(expected), actual);


    }
    @DirtiesContext
    @Test
    void createTicket() {
        Comment comment = new Comment("1", "comment");
        List <Comment> commentList = new ArrayList<>();
        commentList.add(comment);
        Ticket expected = new Ticket("1","Tom","Title","content","123","email","customer","999",commentList,TicketStatus.OPEN);

        when(ticketRepository.save(expected)).thenReturn(expected);

        Ticket actual = ticketService.createTicket(expected);

        verify(ticketRepository).save(expected);
        assertEquals(actual,expected);



    }
    @DirtiesContext
    @Test
    void updateTicket_updatesExistingTicket() {
        Ticket originalTicket = new Ticket("1","Tom","Title","content","123","email","customer","999",new ArrayList<>(), TicketStatus.OPEN);
        ticketService.createTicket(originalTicket);

        Ticket updateTicket = new Ticket("2","Max","NoTitle","content","123","email","customer","999",new ArrayList<>(), TicketStatus.OPEN);
        ticketService.updateTicket(updateTicket);

        List<Ticket> allTickets = ticketService.getAllTickets();
        assertEquals(0, allTickets.size());

    }

}