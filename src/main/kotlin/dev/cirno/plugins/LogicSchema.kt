package dev.cirno.plugins


import dev.cirno.plugins.*
import org.jetbrains.exposed.sql.transactions.transaction
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import kotlinx.serialization.Serializable
import kotlinx.coroutines.Dispatchers
import org.jetbrains.exposed.sql.*

class LogicService(private val database: Database) {
    object Users: Table() {
	    val id: Column<Int> = integer("uid").autoIncrement().uniqueIndex()
	    val name: Column<String> = varchar("user", length = 50)
        val nusp: Column<String> = varchar("nusp", length = 15).uniqueIndex()
        val mail: Column<String> = varchar("mail", length = 200).uniqueIndex()
	    val pwd: Column<String> = varchar("password", length = 50)
        val photo: Column<String>  = varchar("photo_path", length = 900).default("happyface.jpeg")
        val course: Column<String> = varchar("course", length = 3)
        override val primaryKey = PrimaryKey(id)
    }    

    object Groups : Table() {
        val id: Column<Int> = integer("id").autoIncrement().uniqueIndex()
        val name: Column<String> = varchar("name", length = 50)
        val description: Column<String> = varchar("description", length = 600)
        val owner:  Column<Int> = integer("owner_id").references(Users.id)
        val closedGroup: Column<Boolean> = bool("closedgrp").default(false)
        override val primaryKey = PrimaryKey(id)
    }

    object isMember : Table() {
        val u_id: Column<Int> = integer("member_id").references(Users.id)
        val g_id: Column<Int> = integer("group_id").references(Users.id)
    }

    object isAdmin : Table() {
        val u_id: Column<Int> = integer("member_id").references(Users.id)
        val g_id: Column<Int> = integer("group_id").references(Users.id)
    }

    object Articles : Table() { 
        val id: Column<Int> = integer("id").autoIncrement().uniqueIndex() // id do post
        val u_id: Column<Int> = integer("user_id") // id do usuario
        val g_id: Column<Int> = integer("group_id") // id do grupo de extensão 
        val title: Column<String> = varchar("titulo", 256)
        val body: Column<String> =  varchar("corpo", 2048)

        override val primaryKey = PrimaryKey(id)
    }

    init {
        transaction(database) {
            SchemaUtils.create(Users)
	        SchemaUtils.create(Groups)
            SchemaUtils.create(isMember)
            SchemaUtils.create(isAdmin)
            SchemaUtils.create(Articles)
        }
    }

    suspend fun getUserTable(): List<ExposedUser>? {
        return transaction(database) { 
            println("Users: ${Users.selectAll()}\n")
            Users.selectAll()
                .map { ExposedUser(it[Users.name], it[Users.nusp], it[Users.mail], it[Users.pwd], it[Users.photo], it[Users.course]) }
        }
    }

    suspend fun getUserTableWithID(): List<InternalUser>? {
        return transaction(database) { 
            println("Users: ${Users.selectAll()}\n")
            Users.selectAll()
                .map { InternalUser(it[Users.id],it[Users.name], it[Users.nusp], it[Users.mail], it[Users.pwd], it[Users.photo], it[Users.course]) }
        }
    }


    suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }


    suspend fun create(user: ExposedUser): Int = dbQuery {
        Users.insert {
            it[name] = user.name
            it[nusp] = user.nusp
            it[mail] = user.mail
            it[pwd] = user.pwd
            it[photo] = user.photo
            it[course] = user.course
        }[Users.id]
    }

    suspend fun readUser(id: Int): InternalUser? {
        return transaction(database) {
            Users.select { Users.id eq id }
                .map { InternalUser(it[Users.id],it[Users.name], it[Users.nusp], it[Users.mail], it[Users.pwd], it[Users.photo], it[Users.course]) }
                .singleOrNull()
        }
    }

    suspend fun update(id: Int, user: ExposedUser) {
        dbQuery {
            Users.update({ Users.id eq id }) {
                it[name] = user.name
                it[pwd] = user.pwd
            }
        }
    }

    suspend fun deleteUser(id: Int) {
        dbQuery {
            Users.deleteWhere { Users.id.eq(id) }
        }
    }

    suspend fun tryUserLogin(usr: LoginPair): Int? {
        return transaction(database) {
                Users.select { (Users.mail eq usr.mail) and (Users.pwd eq usr.password) }
                .map{it[Users.id]}
                .singleOrNull()
        }
    }


    suspend fun getGroupsUserOwns(user: InternalUser): List<InternalGroup>? {
        return transaction(database) {
            Groups.selectAll()
                .where{ Groups.owner eq user.id }
                .map{InternalGroup(it[Groups.id], it[Groups.name], it[Groups.description], it[Groups.owner]) }
        }
    }

    suspend fun getGroupTable(): List<InternalGroup>? {
        return transaction(database) { 
            //println("Groups: ${Groups.selectAll()}\n")
            Groups.selectAll()
                .map { InternalGroup( it[Groups.id], it[Groups.name], it[Groups.description], it[Groups.owner]) }
        }
    }

    suspend fun create(grp: ExternalGroup): Int  = dbQuery {
        Groups.insert {
            it[name] = grp.name
            it[description] = grp.description
            it[owner] = grp.owner
        }[Groups.id]
    }

    suspend fun readGroup(id: Int): InternalGroup? {
        return transaction(database) {
            Groups.select { Groups.id eq id }
                .map { InternalGroup(it[Groups.id], it[Groups.name], it[Groups.description], it[Groups.owner]) }
                .singleOrNull()
        }
    }

    suspend fun update(id: Int, grp: InternalGroup) {
        dbQuery {
            Groups.update({ Groups.id eq id }) {
                it[name] = grp.name
                it[description] = grp.description
            }
        }
    }

    suspend fun deleteGroup(id: Int) {
        dbQuery {
            Groups.deleteWhere { Groups.id.eq(id) }
        }
    }
}

