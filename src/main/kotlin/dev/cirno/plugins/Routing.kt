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

@Serializable
data class User(
    val name: String,
    val age: Int
)

@Serializable
data class Loginreq(
    val acct: String,
    val pwd: String
)

@Serializable
data class Loginreply(
    val id: String,
    val acct: String
)


fun Application.configureRouting() { 
	
	routing {

        staticResources("/", "mycontent")

        post("/login") {
            val recv = call.receive<Loginreq>()
            val reply =  Loginreply("invalid", "invalid")

            if(recv.acct == "meme" && recv.pwd == "123"){
                call.respond(Loginreply("0", recv.acct))
            }
            call.respond(reply)
        }
        
	    get("/hello") {
            call.respondText("Hello World!")
        }
	
        get("/9") {
            call.respondText("Cirno!")
        }

        get("/meme"){
            call.respond(User("Johne", 32))
        }


    }
}
