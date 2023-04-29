package de.neuefische.backend.ticket;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.server.ResponseStatusException;
import java.util.ArrayList;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@SpringBootTest
@AutoConfigureMockMvc
class TicketIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private  TicketRepository ticketRepository;



        Ticket ticketone = new Ticket("1","Tom","Title","content","123","email","customer","999",new ArrayList<>(), TicketStatus.OPEN);


    @DirtiesContext
    @Test
    void getAll_ReturnEmptyListBcsNoTicketsExist() throws Exception {
        mockMvc.perform(get("/api/tickets"))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                                []
                                """
                ));
    }


    @DirtiesContext
    @Test
    void getAll_shouldReturnAllTickets() throws Exception {
        ticketRepository.save(ticketone);


        mockMvc.perform(get("/api/tickets"))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                                [
                                {
                        "id": "1",
                        "name": "Tom",
                        "title": "Title",
                        "content": "content",
                        "phone": "123",
                        "email": "email",
                        "customer": "customer",
                        "prio": "999",
                        "comment": [],
                        "status": "OPEN"
                    }
                    ]
                    """
                ));
    }

    @Test
    @DirtiesContext
    void addTicket_shouldReturnTicket() throws Exception {
        mockMvc.perform(post("/api/tickets")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                "id": "1",
                        "name": "Tom",
                        "title": "Title",
                        "content": "content",
                        "phone": "123",
                        "email": "johndoe@email.com",
                        "customer": "customer",
                        "prio": "999",
                        "comment": [],
                        "status": "OPEN"
                                }
                                """
                        ))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                                {
                                "id": "1",
                        "name": "Tom",
                        "title": "Title",
                        "content": "content",
                        "phone": "123",
                        "email": "johndoe@email.com",
                        "customer": "customer",
                        "prio": "999",
                        "comment": [],
                        "status": "OPEN"
                                }
                                """
                ));
    }

    @Test
    @DirtiesContext
    void updateTicket_shouldReturnUpdatedTicket() throws Exception {
        // Given
        Ticket ticketone = new Ticket("1","Tom","Title","content","123","email","customer","999",new ArrayList<>(), TicketStatus.OPEN);
        ticketRepository.save(ticketone);

        // When
        Ticket updatedTicket = new Ticket("1","Tom","Updated Title","Updated Content","123","email","customer","999",new ArrayList<>(), TicketStatus.IN_PROGRESS);
        mockMvc.perform(put("/api/tickets/1/update")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                            {
                                "id": "1",
                                "name": "Tom",
                                "title": "Updated Title",
                                "content": "Updated Content",
                                "phone": "123",
                                "email": "email",
                                "customer": "customer",
                                "prio": "999",
                                "comment": [],
                                "status": "IN_PROGRESS"
                            }
                            """
                        ))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                {
                    "id": "1",
                    "name": "Tom",
                    "title": "Updated Title",
                    "content": "Updated Content",
                    "phone": "123",
                    "email": "email",
                    "customer": "customer",
                    "prio": "999",
                    "comment": [],
                    "status": "IN_PROGRESS"
                }
                """));

        // Then
        assertEquals(updatedTicket, ticketRepository.findById("1").get());
    }

    @Test
    @DirtiesContext
    void updateTicket_shouldThrowExceptionIfIdsDoNotMatch() throws Exception {
        // Given
        Ticket ticketone = new Ticket("1","Tom","Title","content","123","email","customer","999",new ArrayList<>(), TicketStatus.OPEN);
        ticketRepository.save(ticketone);

        // When
        mockMvc.perform(put("/api/tickets/1/update")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                        {
                            "id": "2",
                            "name": "Tom",
                            "title": "Updated Title",
                            "content": "Updated Content",
                            "phone": "123",
                            "email": "email",
                            "customer": "customer",
                            "prio": "999",
                            "comment": [],
                            "status": "IN_PROGRESS"
                        }
                        """
                        ))
                .andExpect(status().isBadRequest())
                .andExpect(result -> assertTrue(result.getResolvedException() instanceof ResponseStatusException))
                .andExpect(result -> assertEquals("400 BAD_REQUEST \"The id in the url does not match the request body's id\"", result.getResolvedException().getMessage()));

        // Then
        assertEquals(ticketone, ticketRepository.findById("1").get());
    }


    @Test
    @DirtiesContext
    void deleteTicket_shouldDeleteTicket() throws Exception {
        // Given
        Ticket ticketToDelete = new Ticket("1", "Tom", "Title", "content", "123", "email", "customer", "999", new ArrayList<>(), TicketStatus.OPEN);
        ticketRepository.save(ticketToDelete);

        // When
        mockMvc.perform(delete("/api/tickets/1"))
                .andExpect(status().isOk());

        // Then
        assertTrue(ticketRepository.findById("1").isEmpty());
    }

    @DirtiesContext
    @Test
    void givenTicketId_whenFindById_thenTicketShouldBeReturned() throws Exception {
        // Given
        Ticket ticket = new Ticket("1", "Tom", "Title", "content", "123", "email", "customer", "999", new ArrayList<>(), TicketStatus.OPEN);
        ticketRepository.save(ticket);

        // When/Then
        mockMvc.perform(get("/api/tickets/1"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                {
                    "id": "1",
                    "name": "Tom",
                    "title": "Title",
                    "content": "content",
                    "phone": "123",
                    "email": "email",
                    "customer": "customer",
                    "prio": "999",
                    "comment": [],
                    "status": "OPEN"
                }
            """));

        // Then
        assertTrue(ticketRepository.findById("1").isPresent());
    }


    @Test
    @DirtiesContext
    void findById_shouldReturnNotFoundIfTicketNotFound() throws Exception {
        // Given
        Ticket ticket = new Ticket("1", "Tom", "Title", "content", "123", "email", "customer", "999", new ArrayList<>(), TicketStatus.OPEN);
        ticketRepository.save(ticket);

        // When
        mockMvc.perform(get("/api/tickets/2"))
                // Then
                .andExpect(status().isNotFound());
    }


}