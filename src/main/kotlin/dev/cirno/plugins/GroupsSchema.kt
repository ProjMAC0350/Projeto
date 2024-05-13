package dev.cirno.plugins

import org.jetbrains.exposed.sql.transactions.transaction
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import kotlinx.serialization.Serializable
import kotlinx.coroutines.Dispatchers
import org.jetbrains.exposed.sql.*

@Serializable
data class ExposedGroup(val name: String, val description: String)

@Serializable
data class InternalGroup(val id: Int,val name: String, val description: String)

class GroupService(private val database: Database) {
    object Groups: Table() {
        val id: Column<Int> = integer("id").autoIncrement().uniqueIndex()
        val name: Column<String> = varchar("name", length = 50)
        val description: Column<String> = varchar("description", length = 600)
    }

    init {
        transaction(database) {
            SchemaUtils.create(Groups)
        }
    }

    suspend fun getTable(): List<ExposedGroup>? {
        return transaction(database) { 
            println("Groups: ${Groups.selectAll()}\n")
            Groups.selectAll()
                .map { ExposedGroup( it[Groups.name], it[Groups.description]) }
        }
    }

    suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }

    suspend fun create(user: ExposedGroup): Int = dbQuery {
        Groups.insert {
            it[name] = user.name
            it[description] = user.description
        }[Groups.id]
    }

    suspend fun read(id: Int): ExposedGroup? {
        return transaction(database) {
            Groups.select { Groups.id eq id }
                .map { ExposedGroup(it[Groups.name], it[Groups.description]) }
                .singleOrNull()
        }
    }

    suspend fun update(id: Int, user: ExposedGroup) {
        dbQuery {
            Groups.update({ Groups.id eq id }) {
                it[name] = user.name
                it[description] = user.description
            }
        }
    }

    suspend fun delete(id: Int) {
        dbQuery {
            Groups.deleteWhere { Groups.id.eq(id) }
        }
    }
}

