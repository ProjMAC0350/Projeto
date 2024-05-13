package dev.cirno.plugins


import io.ktor.server.application.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.coroutines.*
import kotlinx.serialization.*
import kotlinx.serialization.json.*


fun Application.configureSerialization() {
    install(ContentNegotiation) {
        json(Json {
            namingStrategy = JsonNamingStrategy.SnakeCase
        })
    }
}

