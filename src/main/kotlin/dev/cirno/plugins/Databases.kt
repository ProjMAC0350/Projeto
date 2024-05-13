package dev.cirno.plugins

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.jetbrains.exposed.sql.*
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlinx.serialization.encodeToString

fun Application.configureDatabases() {
    val database = Database.connect(
            url = "jdbc:h2:file:./build/db;DB_CLOSE_DELAY=-1",
            user = "root",
            driver = "org.h2.Driver",
            password = ""
        )
    val userService = UserService(database)
    val groupService = GroupService(database)
    routing {

        post("/users") {
            val user = call.receive<ExposedUser>()
            val id = userService.create(user)
            call.respond(HttpStatusCode.Created, id)
        }

        get("/users") {
            val users = userService.getTable()
            //print(Json.encodeToString(users))
            if (users != null) {
                call.respond(HttpStatusCode.OK, users)
            } else {
                call.respond(HttpStatusCode.NotFound)
            }
        }

        get("/usersid") {
            val users = userService.getTableWithID()
            if (users != null) {
                call.respond(HttpStatusCode.OK, users)
            } else {
                call.respond(HttpStatusCode.NotFound)
            }
        }
        
        get("/users/{id}") {
            val id = call.parameters["id"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
            val user = userService.read(id)
            if (user != null) {
                call.respond(HttpStatusCode.OK, user)
            } else {
                call.respond(HttpStatusCode.NotFound)
            }
        }
        
        put("/users/{id}") {
            val id = call.parameters["id"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
            val user = call.receive<ExposedUser>()
            userService.update(id, user)
            call.respond(HttpStatusCode.OK)
        }
        
        delete("/users/{id}") {
            val id = call.parameters["id"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
            userService.delete(id)
            call.respond(HttpStatusCode.OK)
        }

        post("/groups"){
            val group = call.receive<ExposedGroup>()
            val id = groupService.create(group)
            call.respond(HttpStatusCode.Created, id)
        }

        get("/groups") {
            val groups = groupService.getTable()
            if (groups != null) {
                call.respond(HttpStatusCode.OK, groups)
            } else {
                call.respond(HttpStatusCode.NotFound)
            }
        }

        get("/groups/{id}") {
            val id = call.parameters["id"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
            val group = groupService.read(id)
            if (group != null) {
                call.respond(HttpStatusCode.OK, group)
            } else {
                call.respond(HttpStatusCode.NotFound)
            }
        }
    }
}
