package de.neuefische.backend.comment;


import org.springframework.data.annotation.Id;

public record Comment(


        @Id
        String id,
        String comment
) {
}
