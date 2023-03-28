import { getMessages } from "@oneUpArtProject/core/src/database"

export async function main (event) {
    const id = event.pathParameters.id
    console.log(id);
    const message = await getMessages(id)
    return {
        statusCode: 200,
        body: JSON.stringify({
            messages: message 
        })
    }
}