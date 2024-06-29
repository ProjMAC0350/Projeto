package dev.cirno.plugins

import kotlinx.serialization.Serializable
import kotlinx.coroutines.Dispatchers

@Serializable
data class LoginPair(
    val email: String,
    val password: String
)

@Serializable
data class ExposedUser(
    val name: String,
    val nusp: String,
    val mail: String,
    val pwd: String,
    val photo: String = "/happyface.jpeg",
    val course: String
)

@Serializable
data class InternalUser(
    val id: Int,
    val name: String,
    val nusp: String,
    val mail: String,
    val pwd: String,
    val photo: String,
    val course: String
)

@Serializable
data class ExternalGroup(
    val name: String,
    val description: String,
    val owner: Int
)

@Serializable
data class InternalGroup(
    val id: Int,
    val name: String,
    val description: String,
    val owner: Int
)

