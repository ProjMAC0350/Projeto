package dev.cirno

import dev.cirno.plugins.*
import io.ktor.server.application.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*

data class User(val name: String, val age: Int)


fun main(args: Array<String>) {
    embeddedServer(
        Netty,
        watchPaths = listOf("labpaulo"),
        port = 8080,
        host = "0.0.0.0",
        module = Application::module
    ).start(wait = true)
}

fun Application.module() {
    configureSecurity()
    configureRouting()
    configureDatabases()
    configureSerialization()
}

