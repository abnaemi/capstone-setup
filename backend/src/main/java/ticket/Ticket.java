package ticket;
import comment.Comment;
import org.springframework.data.annotation.Id;
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
        List<Comment> comment,
        TicketStatus ticketStatus



) {
}
