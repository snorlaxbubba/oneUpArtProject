//import { getMessages } from "@oneUpArtProject/core/src/database"
import { createImage } from "@oneUpArtProject/core/src/database"

export async function main (event) {
    const { body } = event;
    const data = Buffer.from(body.split(',')[1], 'base64');

    const post = await createImage(data);

    return {
        statusCode: 200,
        body: JSON.stringify({
            messages: post 
        })
    }
}