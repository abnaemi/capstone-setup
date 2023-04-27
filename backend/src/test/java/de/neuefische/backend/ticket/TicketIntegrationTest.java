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
    void updateTicket_shouldThrowBadRequestExceptionWhenIdDoesNotMatch() throws Exception {
        // Given
        Ticket ticketone = new Ticket("1","Tom","Title","content","123","email","customer","999",new ArrayList<>(), TicketStatus.OPEN);
        ticketRepository.save(ticketone);

        // When
        String differentId = "2";
        Ticket ticketWithDifferentId = new Ticket(differentId, "Tom", "Updated Title", "Updated Content", "123", "email", "customer", "999", new ArrayList<>(), TicketStatus.IN_PROGRESS);
        mockMvc.perform(put("/api/tickets/" + ticketone.id() + "/update")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                        {
                            "id": "%s",
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
                        """.formatted(differentId)
                        ))
                // Then
                .andExpect(status().isBadRequest())
                .andExpect(result -> assertTrue(result.getResolvedException() instanceof ResponseStatusException))
                .andExpect(result -> assertEquals("The id in the url does not match the request body's id", result.getResolvedException().getMessage()));
    }


}