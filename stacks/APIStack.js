import { Api, Cognito } from "sst/constructs";

export function API({ stack }) {

  const auth = new Cognito(stack, "auth", {
    login: ["email", "username"],
  });
  // Adjust the API 
  const api = new Api(stack, "Api", {
    // authorizers: {
    //   jwt: {
    //     type: "user_pool",
    //     userPool: {
    //       id: auth.userPoolId,
    //       clientIds: [auth.userPoolClientId],
    //     },
    //   },
    // },
    defaults: {
      // authorizer: "jwt",
      function: {
        environment: {
          DATABASE_URL: process.env.DATABASE_URL,
        },
      },
    },
    routes: {
      "GET /": "packages/functions/src/lambda.handler",
      "GET /tags": "packages/functions/src/tags/getTags.main",
      "GET /tags/{id}": "packages/functions/src/tags/getTag.main",
      "PUT /tags/{id}": "packages/functions/src/tags/updateTag.main",
      "DELETE /tags/{id}": "packages/functions/src/tags/deleteTag.main",

      "GET /posts": "packages/functions/src/posts/getPosts.main",
      "GET /posts/{id}": "packages/functions/src/posts/getPost.main",
      "PUT /posts/{id}": "packages/functions/src/posts/updatePost.main",
      "DELETE /posts/{id}": "packages/functions/src/posts/deletePost.main",

      "GET /images": "packages/functions/src/images/getImages.main",
      "POST /images": "packages/functions/src/images/postImage.main",

    //   "GET /chats": { 
    //     function: "packages/functions/src/chats/getChats.main",
    //     authorizer: "none",
    // },
    //   "Post /chats": {
    //     function: "packages/functions/src/chats/createChat.main",
    //     authorizer: "none",
    //   },

    //   "PUT /chats/{id}": "packages/functions/src/chats/updateChat.main",
    //   "DELETE /chats/{id}" : "packages/functions/src/chats/deleteChat.main",

    //   "GET /chats/{id}/messages": "packages/functions/src/messages/getMessage.main",
    //   "POST /chats/{id}/messages": "packages/functions/src/messages/createMessage.main",
    //   "PUT /chats/{id}/messages/{messageId}": "packages/functions/src/messages/updateMessage.main",
    //   "DELETE /chats/{id}/messages/{messageId}": "packages/functions/src/messages/deleteMessage.main",


    },
  });
  // Allow authenticated users invoke API
  auth.attachPermissionsForAuthUsers(stack, [api]);

  stack.addOutputs({
    ApiEndpoint: api.url,
    UserPoolId: auth.userPoolId,
    IdentityPoolId: auth.cognitoIdentityPoolId ?? "",
    UserPoolClientId: auth.userPoolClientId,
  });

  return {
    api,
    auth
  }
}
