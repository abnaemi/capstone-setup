package de.neuefische.backend.ticket;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.server.ResponseStatusException;
import java.util.ArrayList;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;




@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@SpringBootTest
@AutoConfigureMockMvc
class TicketIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private  TicketRepository ticketRepository;



        Ticket ticketone = new Ticket("1","Tom","Title","content","123","email","customer","999",new ArrayList<>(), TicketStatus.OPEN);


    @Test
    @WithMockUser
    void getAll_ReturnEmptyListBcsNoTicketsExist() throws Exception {
        mockMvc.perform(get("/api/tickets").with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                                []
                                """
                ));
    }

    @WithMockUser
    @Test
    void getAll_shouldReturnAllTickets() throws Exception {
        ticketRepository.save(ticketone);


        mockMvc.perform(get("/api/tickets").with(csrf()))
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
    @WithMockUser
    @Test
    void addTicket_shouldReturnTicket() throws Exception {
        mockMvc.perform(post("/api/tickets").with(csrf())
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
                .andExpect(status().isCreated())
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
    @WithMockUser
    @Test
    void updateTicket_shouldReturnUpdatedTicket() throws Exception {
        // Given
        Ticket ticketone = new Ticket("1","Tom","Title","content","123","email","customer","999",new ArrayList<>(), TicketStatus.OPEN);
        ticketRepository.save(ticketone);

        // When
        Ticket updatedTicket = new Ticket("1","Tom","Updated Title","Updated Content","123","email","customer","999",new ArrayList<>(), TicketStatus.IN_PROGRESS);
        mockMvc.perform(put("/api/tickets/1/update").with(csrf())
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
    @WithMockUser
    @Test
    void updateTicket_shouldThrowExceptionIfIdsDoNotMatch() throws Exception {
        // Given
        Ticket ticketone = new Ticket("1","Tom","Title","content","123","email","customer","999",new ArrayList<>(), TicketStatus.OPEN);
        ticketRepository.save(ticketone);

        // When
        mockMvc.perform(put("/api/tickets/1/update").with(csrf())
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

    @WithMockUser
    @Test
    void deleteTicket_shouldDeleteTicket() throws Exception {
        // Given
        Ticket ticketToDelete = new Ticket("1", "Tom", "Title", "content", "123", "email", "customer", "999", new ArrayList<>(), TicketStatus.OPEN);
        ticketRepository.save(ticketToDelete);

        // When
        mockMvc.perform(delete("/api/tickets/1").with(csrf()))
                .andExpect(status().isNoContent());

        // Then
        assertTrue(ticketRepository.findById("1").isEmpty());
    }
    @WithMockUser
    @Test
    void getByID_shouldReturnTicketByID() throws Exception {
        // Given
        Ticket ticket = new Ticket("1", "Tom", "Title", "content", "123", "email", "customer", "999", new ArrayList<>(), TicketStatus.OPEN);
        ticketRepository.save(ticket);

        // When/Then
        mockMvc.perform(get("/api/tickets/1").with(csrf()))
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
    void getAll_ReturnEmptyListBcsNoTicketsExist_Unauthorized() throws Exception {
        mockMvc.perform(get("/api/tickets").with(csrf()))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void getAll_shouldReturnAllTickets_Unauthorized() throws Exception {
        ticketRepository.save(ticketone);

        mockMvc.perform(get("/api/tickets").with(csrf()))
                .andExpect(status().isUnauthorized());
    }


    @Test
    void updateTicket_shouldReturnUpdatedTicket_Unauthorized() throws Exception {
        Ticket ticketone = new Ticket("1","Tom","Title","content","123","email","customer","999",new ArrayList<>(), TicketStatus.OPEN);
        ticketRepository.save(ticketone);

        Ticket updatedTicket = new Ticket("1","Tom","Updated Title","Updated Content","123","email","customer","999",new ArrayList<>(), TicketStatus.IN_PROGRESS);
        mockMvc.perform(put("/api/tickets/1/update").with(csrf())
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
                .andExpect(status().isUnauthorized());
    }

    @Test
    void deleteTicket_shouldDeleteTicket_Unauthorized() throws Exception {
        Ticket ticketToDelete = new Ticket("1", "Tom", "Title", "content", "123", "email", "customer", "999", new ArrayList<>(), TicketStatus.OPEN);
        ticketRepository.save(ticketToDelete);

        mockMvc.perform(delete("/api/tickets/1").with(csrf()))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void getByID_shouldReturnTicketByID_Unauthorized() throws Exception {
        Ticket ticket = new Ticket("1", "Tom", "Title", "content", "123", "email", "customer", "999", new ArrayList<>(), TicketStatus.OPEN);
        ticketRepository.save(ticket);

        mockMvc.perform(get("/api/tickets/1").with(csrf()))
                .andExpect(status().isUnauthorized());
    }

}