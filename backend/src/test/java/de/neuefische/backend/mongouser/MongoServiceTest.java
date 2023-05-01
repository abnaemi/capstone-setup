package de.neuefische.backend.mongouser;
import de.neuefische.backend.security.MongoUser;
import de.neuefische.backend.security.MongoUserDetailsService;
import de.neuefische.backend.security.MongoUserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class MongoUserDetailsServiceTest {

    @Mock
    private MongoUserRepository mongoUserRepository;

    @InjectMocks
    private MongoUserDetailsService mongoUserDetailsService;

    private MongoUser testMongoUser;

    @BeforeEach
    void setUp() {
        testMongoUser = new MongoUser("testID", "testUser","testPassword");
    }

    @Test
    void loadUserByUsername_shouldReturnUserDetails() {
        // Given
        when(mongoUserRepository.findMongoUserByUsername("testUser")).thenReturn(Optional.of(testMongoUser));

        // When
        UserDetails result = mongoUserDetailsService.loadUserByUsername("testUser");

        // Then
        UserDetails expectedUserDetails = new User("testUser", "testPassword", Collections.emptyList());
        assertEquals(expectedUserDetails, result);
    }

    @Test
    void loadUserByUsername_shouldThrowUsernameNotFoundException() {
        // Given
        when(mongoUserRepository.findMongoUserByUsername("nonexistentUser")).thenReturn(Optional.empty());

        // When & Then
        assertThrows(UsernameNotFoundException.class, () -> mongoUserDetailsService.loadUserByUsername("nonexistentUser"));
    }
}
