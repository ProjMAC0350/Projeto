package dev.cirno.plugins

import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.http.content.*
import kotlinx.coroutines.*
import kotlinx.serialization.*
import kotlinx.serialization.json.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.serialization.kotlinx.json.*

fun Application.configureRouting() { 
	
	routing {

        staticResources("/", "mycontent")

	    get("/hello") {
            call.respondText("Hello World!")
        }
	
        get("/9") {
            call.respondText("Cirno!")
        }

        get("/meme"){
            call.respond(ExposedUser("Johne", "32", "meme@hotmail.com", "123", "/foto.jpeg", "BCC"))
        }


    }
}
