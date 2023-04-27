package de.neuefische.backend.comment;

import org.springframework.data.mongodb.core.mapping.Document;


public record Comment(


        String id,
        String comment
) {
}
