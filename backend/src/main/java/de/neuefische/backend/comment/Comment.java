package de.neuefische.backend.comment;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "comment")
public record Comment(


        String id,
        String comment
) {
}
