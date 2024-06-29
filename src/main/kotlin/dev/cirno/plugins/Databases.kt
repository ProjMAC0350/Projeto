package dev.cirno.plugins

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.sessions.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.jetbrains.exposed.sql.*
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlinx.serialization.encodeToString

fun Application.configureDatabases(logicService: LogicService) {
   
    routing {

        post("/users") {
            val user = call.receive<ExposedUser>()
            val id = logicService.create(user)
            call.respond(HttpStatusCode.Created, id)
        }

        get("/users") {
            val users = logicService.getUserTable()
            //print(Json.encodeToString(users))
            if (users != null) {
                call.respond(HttpStatusCode.OK, users)
            } else {
                call.respond(HttpStatusCode.NotFound)
            }
        }

        get("/usersid") {
            val users = logicService.getUserTableWithID()
            if (users != null) {
                call.respond(HttpStatusCode.OK, users)
            } else {
                call.respond(HttpStatusCode.NotFound)
            }
        }
        
        get("/users/{id}") {
            val id = call.parameters["id"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
            val user = logicService.readUser(id)
            if (user != null) {
                call.respond(HttpStatusCode.OK, user)
            } else {
                call.respond(HttpStatusCode.NotFound)
            }
        }

        get("/users/{id}/ownedgroups") {
            val id = call.parameters["id"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
            val user = logicService.readUser(id)
            if (user != null) {
                val ownedgrps = logicService.getGroupsUserOwns(user)
                if(ownedgrps != null){
                    println("owned groups are $ownedgrps")
                    call.respond(HttpStatusCode.OK, ownedgrps)
                }
                call.respond(HttpStatusCode.NotFound) 
            } else {
                call.respond(HttpStatusCode.NotFound)
            }
        }
        
        put("/users/{id}") {
            val id = call.parameters["id"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
            val user = call.receive<ExposedUser>()
            logicService.update(id, user)
            call.respond(HttpStatusCode.OK)
        }
        
        delete("/users/{id}") {
        val id = call.parameters["id"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
        logicService.deleteUser(id)
        /*
            if (userSession != null) {
                val id = call.parameters["id"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
                logicService.deleteUser(id)
                call.respond(HttpStatusCode.OK)
            } else {
                call.respondText("Session doesn't exist or is expired.")
            }
        */ 
        }

        post("/groups"){
            val group = call.receive<ExternalGroup>()
            val id = logicService.create(group)
            call.respond(HttpStatusCode.Created, id)
        }

        get("/groups") {
            val groups = logicService.getGroupTable()
            if (groups != null) {
                call.respond(HttpStatusCode.OK, groups)
            } else {
                call.respond(HttpStatusCode.NotFound)
            }
        }

        get("/groups/{id}") {
            val id = call.parameters["id"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
            val group = logicService.readGroup(id)
            if (group != null) {
                call.respond(HttpStatusCode.OK, group)
            } else {
                call.respond(HttpStatusCode.NotFound)
            }
        }
    }
}
