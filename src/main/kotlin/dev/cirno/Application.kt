package dev.cirno

import dev.cirno.plugins.*
import org.jetbrains.exposed.sql.*
import io.ktor.server.application.*
import io.ktor.server.plugins.cors.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.http.*
import kotlinx.coroutines.*
import kotlinx.serialization.*
import kotlinx.serialization.json.*

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
    install(CORS){
        allowMethod(HttpMethod.Options)
        allowMethod(HttpMethod.Post)
        allowMethod(HttpMethod.Get)
        allowHeader(HttpHeaders.AccessControlAllowOrigin)
        allowHeader(HttpHeaders.ContentType)
        anyHost()
    }
    install(ContentNegotiation) {
        json(Json {
            namingStrategy = JsonNamingStrategy.SnakeCase
        })
    }

    val database = Database.connect(
            url = "jdbc:h2:file:./build/db;DB_CLOSE_DELAY=-1",
            user = "root",
            driver = "org.h2.Driver",
            password = ""
        )
    val logicService = LogicService(database)
    configureSecurity(logicService)
    configureDatabases(logicService)
}

