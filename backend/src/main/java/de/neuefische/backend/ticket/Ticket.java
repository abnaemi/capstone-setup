package de.neuefische.backend.ticket;
import de.neuefische.backend.comment.Comment;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.List;

public record Ticket(

        @Id
        String id,
        String name,
        String title,
        String content,
        String phone,
        String email,
        String customer,
        String number,
        @DBRef
        List<Comment> comment,
        TicketStatus status



) {
}
