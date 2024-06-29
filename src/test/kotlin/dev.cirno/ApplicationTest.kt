import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.server.testing.*
import kotlin.test.assertContains
import org.junit.Assert.assertEquals
import org.junit.Test
import dev.cirno.*
import io.ktor.server.application.*
import io.ktor.server.http.content.*


class ApplicationTest {

    @Test
    fun testHello() = testApplication {
        application {
            module()
        }
        val response = client.get("/hello")

        assertEquals(HttpStatusCode.OK, response.status)
        assertEquals("Hello World!", response.bodyAsText())
    }

    /*
    @Test
    fun testCreateUser() = testApplication {
        application {
            module()
        }
        val response = client.post("/users") {
            setBody(ExposedUser("teste", "123"))
        }
    }
    */
}

