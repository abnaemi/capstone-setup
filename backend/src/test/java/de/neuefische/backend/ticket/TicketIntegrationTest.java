package de.neuefische.backend.ticket;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import java.util.ArrayList;
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
                        "email": "johndoe@email.com",
                        "customer": "customer",
                        "number": "999",
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
                        "number": "999",
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
                        "number": "999",
                        "comment": [],
                        "status": "OPEN"
                                }
                                """
                ));
    }



}