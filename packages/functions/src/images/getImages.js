//import { getMessages } from "@oneUpArtProject/core/src/database"

let test = "test";
export async function main (event) {



    return {
        statusCode: 200,
        body: JSON.stringify({
            messages: test 
        })
    }
}