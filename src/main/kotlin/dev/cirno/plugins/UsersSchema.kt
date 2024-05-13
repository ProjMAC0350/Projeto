package dev.cirno.plugins

import org.jetbrains.exposed.sql.transactions.transaction
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import kotlinx.serialization.Serializable
import kotlinx.coroutines.Dispatchers
import org.jetbrains.exposed.sql.*

@Serializable
data class ExposedUser(val name: String, val pwd: String)

@Serializable
data class InternalUser(val id: Int,val name: String, val pwd: String)

class UserService(private val database: Database) {
    object Users : Table() {
        val id: Column<Int> = integer("id").autoIncrement().uniqueIndex()
        val name: Column<String> = varchar("name", length = 50)
        val pwd: Column<String> = varchar("pwd", length = 50)

        override val primaryKey = PrimaryKey(id)
    }

    object Groups: Table() {
        val id: Column<Int> = integer("id").autoIncrement().uniqueIndex()
        val name: Column<String> = varchar("name", length = 50)
        val criador_id: Column<Int> = integer("criador")
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
            SchemaUtils.create(Articles)
        }
    }

    suspend fun getTable(): List<ExposedUser>? {
        return transaction(database) { 
            println("Users: ${Users.selectAll()}\n")
            Users.selectAll()
                .map { ExposedUser( it[Users.name], it[Users.pwd]) }
        }
    }

    suspend fun getTableWithID(): List<InternalUser>? {
        return transaction(database) { 
            println("Users: ${Users.selectAll()}\n")
            Users.selectAll()
                .map { InternalUser(it[Users.id], it[Users.name], it[Users.pwd]) }
        }
    }

    suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }

    suspend fun create(user: ExposedUser): Int = dbQuery {
        Users.insert {
            it[name] = user.name
            it[pwd] = user.pwd
        }[Users.id]
    }

    suspend fun read(id: Int): ExposedUser? {
        return transaction(database) {
            Users.select { Users.id eq id }
                .map { ExposedUser(it[Users.name], it[Users.pwd]) }
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

    suspend fun delete(id: Int) {
        dbQuery {
            Users.deleteWhere { Users.id.eq(id) }
        }
    }
}

