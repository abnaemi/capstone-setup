package ticket;

import comment.Comment;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TicketServiceTest {

    private final TicketRepository ticketRepository  = mock(TicketRepository.class);
    private final TicketService ticketService = new TicketService(ticketRepository);



    @Test
    void getAllTickets() {

        Comment comment = new Comment("1","comment");
        Comment comment2 = new Comment("1","comment");
        Comment comment3 = new Comment("1","comment");
        List <Comment> commentList = new ArrayList<>();
        commentList.add(comment);
        commentList.add(comment2);
        commentList.add(comment3);


        Ticket expected = new Ticket("1","Tom","Title","content","123","email","customer","999",commentList,TicketStatus.OPEN);

       when(ticketRepository.findAll()).thenReturn(List.of(expected));

       List<Ticket> actual = ticketService.getAllTickets();

       verify (ticketRepository).findAll();
       assertEquals(List.of(expected), actual);


    }

    @Test
    void createTicket() {
    }
}