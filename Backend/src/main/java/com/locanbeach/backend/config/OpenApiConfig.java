package com.locanbeach.backend.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("The House Resort API")
                        .version("1.0.0")
                        .description("REST API Documentation cho dự án The House Resort Backend.")
                        .contact(new Contact().name("Locan Beach Development Team")))
                .servers(List.of(
                        new Server().url("http://localhost:8080").description("Local Server")
                ));
    }
}
