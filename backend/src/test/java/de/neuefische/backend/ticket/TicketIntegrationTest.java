package de.neuefische.backend.ticket;


import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.backend.comment.Comment;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@SpringBootTest
@AutoConfigureMockMvc
class TicketIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private  TicketRepository ticketRepository;

    @Autowired
    private ObjectMapper mapper;

    private Ticket dummyTicket;

    private String jsonTicket;


    @BeforeEach
    void setUp() throws Exception {
        Comment comment = new Comment("1", "comment");
        Comment comment2 = new Comment("1", "comment");

        List <Comment> commentList = new ArrayList<>();
        commentList.add(comment);
        commentList.add(comment2);


        dummyTicket = new Ticket("1","Tom","Title","content","123","email","customer","999",commentList, TicketStatus.OPEN);
        jsonTicket = mapper.writeValueAsString(dummyTicket);
    }
    @Test
    @DirtiesContext
    void getAllTickets() throws Exception {
        ticketRepository.save(dummyTicket);
        mockMvc.perform(get("/api/tickets"))
                .andExpect(status().isOk())
                .andExpect(content().json("[" + jsonTicket + "]"));
    }


    @Test
    @DirtiesContext
    void postTicket() throws Exception {
        String responseJson =
                mockMvc.perform(
                                post("/api/tickets")
                                        .contentType(MediaType.APPLICATION_JSON)
                                        .content(jsonTicket))
                        .andExpect(status().isCreated())
                        .andExpect(content().json("""
                                {
                                  "id": "1",
                                  "name": "Tom",
                                  "title": "Title",
                                  "content": "content",
                                  "phone": "123",
                                  "email": "email",
                                  "customer": "customer",
                                  "number": "999",
                                  "comment": [
                                    {
                                      "id": "1",
                                      "comment": "comment"
                                    },
                                    {
                                      "id": "1",
                                      "comment": "comment"
                                    }
                                  ],
                                  "ticketStatus": "OPEN"
                                }
                                """))
                        .andExpect(jsonPath("$.id").isNotEmpty())
                        .andReturn()
                        .getResponse()
                        .getContentAsString();


        Ticket expected = new Ticket(
                dummyTicket.id(),
                dummyTicket.name(),
                dummyTicket.title(),
                dummyTicket.content(),
                dummyTicket.phone(),
                dummyTicket.email(),
                dummyTicket.customer(),
                dummyTicket.number(),
                dummyTicket.comment(),
                dummyTicket.ticketStatus());
        assertThat(ticketRepository.findAll()).contains(expected);
    }
}