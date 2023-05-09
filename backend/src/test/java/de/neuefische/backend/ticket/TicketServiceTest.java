package de.neuefische.backend.ticket;
import de.neuefische.backend.comment.Comment;
import org.junit.jupiter.api.Test;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;



class TicketServiceTest {

    private final TicketRepository ticketRepository  = mock(TicketRepository.class);
    private final TicketService ticketService = new TicketService(ticketRepository);




    @Test
    void getAllTickets() {

        Comment comment = new Comment("1", "comment","");
        Comment comment2 = new Comment("1", "comment","");
        Comment comment3 = new Comment("1", "comment","");
        List <Comment> commentList = new ArrayList<>();
        commentList.add(comment);
        commentList.add(comment2);
        commentList.add(comment3);

        Ticket expected = new Ticket("1","Tom","Title","content","123","email","customer","999",commentList, TicketStatus.OPEN);

       when(ticketRepository.findAll()).thenReturn(List.of(expected));

       List<Ticket> actual = ticketService.getAllTickets();

       verify (ticketRepository).findAll();
       assertEquals(List.of(expected), actual);
        System.out.println(ticketService.getAllTickets());


    }
    @Test
    void createTicket() {
        Comment comment = new Comment("1", "comment","");
        List <Comment> commentList = new ArrayList<>();
        commentList.add(comment);
        Ticket expected = new Ticket("1","Tom","Title","content","123","email","customer","999",commentList,TicketStatus.OPEN);

        when(ticketRepository.save(expected)).thenReturn(expected);

        Ticket actual = ticketService.createTicket(expected);

        verify(ticketRepository).save(expected);
        assertEquals(actual,expected);
        System.out.println(ticketService.getAllTickets());



    }

    @Test
    void updateTicket_updatesExistingTicket() {
        Ticket originalTicket = new Ticket("1","Tom","Title","content","123","email","customer","999",new ArrayList<>(), TicketStatus.OPEN);


        when(ticketRepository.save(originalTicket))
                .thenReturn(originalTicket);
        Ticket actual = ticketService.updateTicket(originalTicket);
        verify(ticketRepository).save(originalTicket);
        assertEquals(actual, originalTicket);



    }

    @Test
    void deleteTicket_deletesExistingTicket() {
        Ticket originalTicket = new Ticket("1","Tom","Title","content","123","email","customer","999",new ArrayList<>(), TicketStatus.OPEN);
        ticketRepository.save(originalTicket);
        ticketService.deleteTicket("1");
        verify(ticketRepository).deleteById("1");

    }

    @Test
    void findById_thenReturnOptionalTicket() {
        // given
        Ticket expected = new Ticket("1","Tom","Title","content","123","email","customer","999",null, TicketStatus.OPEN);
        when(ticketRepository.findById("1")).thenReturn(Optional.of(expected));

        // when
        Optional<Ticket> actual = ticketService.findById("1");

        // then
        assertEquals(expected, actual.get());
    }

    @Test
    void whenFindById_withNonExistingId_thenReturnEmptyOptional() {
        // given
        when(ticketRepository.findById("1")).thenReturn(Optional.empty());

        // when
        Optional<Ticket> actual = ticketService.findById("1");

        // then
        assertEquals(Optional.empty(), actual);
    }

}